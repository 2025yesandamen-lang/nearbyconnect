# Quick Reference Guide

## Common Commands

### Development
```bash
# Start dev server (http://localhost:3000)
npm run dev

# View database
npx prisma studio

# Format code
npx prettier --write .

# Type check
npx tsc --noEmit
```

### Database
```bash
# Create new migration
npx prisma migrate dev --name add_feature

# Reset database (dev only!)
npx prisma migrate reset

# Check migration status
npx prisma migrate status

# Pull latest schema
npx prisma db pull
```

### Testing API Endpoints

#### Signup
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'
```

#### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'
```

#### Get Nearby Users
```bash
curl "http://localhost:3000/api/users/nearby?lat=40.7128&lng=-74.0060&radius=2"
```

#### Send Message
```bash
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"chatId":"chat_123","userId":"user_123","content":"Hello!"}'
```

#### Check Health
```bash
curl http://localhost:3000/api/health
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
git add .
git commit -m "feat: describe your change"

# Push to GitHub
git push origin feature/new-feature

# Create Pull Request on GitHub
# Merge after review
git checkout main
git pull
```

## File Structure Reference

| Path | Purpose |
|------|---------|
| `app/api/*/route.ts` | API endpoints |
| `app/page.tsx` | Home page |
| `app/layout.tsx` | Root layout |
| `lib/prisma.ts` | Database client |
| `lib/socket.ts` | WebSocket setup |
| `services/*.ts` | Business logic |
| `prisma/schema.prisma` | Database schema |
| `types/*.ts` | TypeScript types |
| `public/` | Static files |

## Database Schema Quick Reference

```sql
-- Users
SELECT * FROM "User" WHERE email = 'user@example.com';

-- Likes
SELECT * FROM "Like" WHERE "fromId" = 'user_id';

-- Matches
SELECT * FROM "Match" WHERE "userAId" = 'user_id' OR "userBId" = 'user_id';

-- Messages
SELECT * FROM "Message" WHERE "chatId" = 'chat_id' ORDER BY "createdAt" DESC;

-- Subscriptions
SELECT * FROM "Subscription" WHERE "userId" = 'user_id';

-- Online Status
SELECT * FROM "Presence" WHERE status = 'online';
```

## Environment Variables Cheat Sheet

```env
# Required for development
DATABASE_URL=postgresql://user:pass@localhost:5432/nearbyconnect

# Required for payments
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Optional
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
JWT_SECRET=your_secret
```

## Debugging Tips

### Check Logs
```bash
# Vercel
vercel logs

# Local dev
npm run dev  # See terminal output
```

### Database Debugging
```bash
# Connect directly
psql $DATABASE_URL

# Run query
SELECT COUNT(*) FROM "User";
```

### API Debugging
```bash
# Use Postman or Insomnia for HTTP testing
# Or use curl with verbose flag
curl -v http://localhost:3000/api/health
```

### Performance Profiling
```bash
# Build analysis
npm run build -- --analyze
```

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| "DATABASE_URL not set" | Add to `.env.local` |
| "Port 3000 in use" | `lsof -i :3000` then `kill PID` |
| "Prisma errors" | `npx prisma generate` |
| "Module not found" | `npm install` |
| "TypeScript errors" | `npx tsc --noEmit` |

## Performance Optimization

```bash
# Check bundle size
npm run build
# Look at Next.js output

# Analyze slow builds
time npm run build

# Profile at runtime
# Use Chrome DevTools → Performance tab
```

## Security Checklist

- [ ] Never commit `.env.local`
- [ ] Use HTTPS in production
- [ ] Validate all API inputs
- [ ] Use Prisma to prevent SQL injection
- [ ] Set up CORS properly
- [ ] Rate limit endpoints
- [ ] Sanitize user data
- [ ] Use strong password hashing (bcrypt)

## Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)

---

**Tip**: Keep this file open while developing!
