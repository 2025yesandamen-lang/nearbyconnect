# Deployment Guide - NearbyConnect

## Quick Start Deployment (5 minutes)

### Step 1: Prepare Database on Vercel PostgreSQL

1. Go to [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
2. Create a new database
3. Copy the connection string

### Step 2: Configure Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your NearbyConnect project
3. Go to Settings → Environment Variables
4. Add these variables:

```
DATABASE_URL=postgresql://... (from Vercel Postgres)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...
```

### Step 3: Deploy

**Option A: Automatic (Recommended)**
- Push to `main` branch
- Vercel auto-deploys

**Option B: Manual**
```bash
npm run build
npm run start
```

### Step 4: Run Database Migrations

After first deployment, run:

```bash
npx prisma migrate deploy
```

Or through Vercel CLI:

```bash
vercel env pull  # Download env vars
npx prisma migrate deploy
```

## Stripe Setup (Payment Processing)

### 1. Create Stripe Account
- Go to [stripe.com](https://stripe.com)
- Sign up and verify email

### 2. Get API Keys
- Dashboard → Developers → API Keys
- Copy "Publishable key" and "Secret key"

### 3. Set Webhook
- Developers → Webhooks → Add Endpoint
- Endpoint URL: `https://your-app.vercel.app/api/webhooks/stripe`
- Events: `charge.succeeded`, `customer.subscription.deleted`
- Copy webhook secret

### 4. Add to Environment Variables
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Post-Deployment Checklist

- [ ] Environment variables set in Vercel
- [ ] Database migrations applied
- [ ] Health check passes: `/api/health`
- [ ] Test signup at `/api/auth/signup`
- [ ] Test location queries at `/api/users/nearby?lat=0&lng=0`
- [ ] Verify analytics tracking works
- [ ] Test Stripe subscription flow

## Monitoring & Logs

### View Deployment Logs
```bash
vercel logs <app-name>
```

### Monitor in Real-Time
1. Vercel Dashboard → Deployments
2. Click latest deployment
3. View build and runtime logs

### Check Application Health
```bash
curl https://your-app.vercel.app/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-05-02T...",
  "database": "connected"
}
```

## Scaling Tips

### For High Traffic
1. Enable Vercel Edge Functions
2. Set up Redis caching
3. Optimize database indexes:
   ```sql
   CREATE INDEX idx_users_location ON users(latitude, longitude);
   CREATE INDEX idx_messages_chat ON messages(chatId);
   CREATE INDEX idx_analytics_user ON analytics(userId);
   ```

### Database Optimization
```bash
# Analyze query performance
npx prisma studio

# Check indexes
SELECT * FROM pg_stat_user_indexes;
```

## Rollback

If something goes wrong:

```bash
# Revert to previous deployment
vercel rollback

# Or manually redeploy specific commit
git checkout <commit-hash>
git push
```

## Troubleshooting

### App won't start
```bash
# Check logs
vercel logs <app-name>

# Rebuild cache
vercel rebuild
```

### Database connection error
```bash
# Verify connection string
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

### Prisma migration fails
```bash
# Check status
npx prisma migrate status

# Resolve conflicts
npx prisma migrate resolve --rolled-back migration_name
```

## Production Best Practices

1. **Environment Variables**: Never commit `.env.local`
2. **Database**: Use separate prod/dev databases
3. **Backups**: Enable automated database backups
4. **Monitoring**: Set up error tracking (Sentry)
5. **Rate Limiting**: Implement API rate limiting
6. **HTTPS**: Vercel provides free SSL
7. **CDN**: Enable Vercel Edge Caching

## Analytics & Monitoring Services (Optional)

### Sentry (Error Tracking)
```bash
npm install @sentry/nextjs
```

### LogRocket (Session Replay)
```bash
npm install logrocket
```

### Datadog (APM)
```bash
npm install @datadog/browser-rum
```

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- Stripe Docs: https://stripe.com/docs

---

**Last Updated**: May 2, 2026
**Maintenance**: Check logs daily, monitor performance weekly
