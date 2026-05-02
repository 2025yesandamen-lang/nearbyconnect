# NearbyConnect - Real-Time Nearby Chat & Matching App

A modern location-based matching and messaging platform built with Next.js, PostgreSQL, and WebSocket technology.

## 🚀 Features

### Core Features
- **Location-Based Matching**: Find nearby users within configurable radius
- **Real-Time Chat**: Instant messaging between matched users
- **Swipe Matching**: Like/match system with mutual notification
- **User Presence**: Real-time online/offline status tracking
- **Analytics**: Event tracking and user behavior analytics

### Premium Features
- Unlimited likes and matches
- Advanced location filtering
- Priority messaging
- See who liked you
- 1km radius expansion
- Video profiles (future)
- Ghost mode (future)

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn
- Stripe account (for payments)
- GitHub account (for deployment)

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/2025yesandamen-lang/nearbyconnect.git
cd nearbyconnect
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Update with your credentials:

```env
# Database (PostgreSQL)
DATABASE_URL=postgresql://user:password@host:port/nearbyconnect

# Stripe Keys (get from https://dashboard.stripe.com)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...

# Optional: Vercel Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
```

### 4. Set Up Database

Run Prisma migrations:

```bash
npx prisma migrate deploy
```

Generate Prisma Client:

```bash
npx prisma generate
```

Optionally, open Prisma Studio to view/manage data:

```bash
npx prisma studio
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📚 API Routes

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Matching
- `GET /api/users/nearby` - Get nearby users
- `POST /api/match/like` - Like a user
- `GET /api/match` - Get matches

### Messaging
- `GET /api/messages` - Get chat messages
- `POST /api/messages` - Send a message
- `GET /api/chat` - Get chat history

### Presence
- `GET /api/presence` - Get user presence status
- `POST /api/presence` - Update presence status

### Subscriptions
- `GET /api/pricing` - Get pricing plans
- `POST /api/subscription` - Create subscription
- `GET /api/premium` - Check premium status

### Analytics
- `GET /api/analytics` - Get analytics data
- `GET /api/health` - Health check endpoint

## 🗄️ Database Schema

### Models
- **User**: User profiles with location data
- **Like**: User preferences and matches
- **Match**: Matched user pairs with room IDs
- **Chat**: Chat conversations
- **Message**: Individual messages
- **Subscription**: Premium subscriptions
- **Presence**: Online/offline status
- **Analytics**: Event tracking
- **Waitlist**: Early access signups

## 🔧 Project Structure

```
nearbyconnect/
├── app/
│   ├── api/                  # API routes
│   ├── components/           # React components
│   ├── dashboard/            # Dashboard page
│   ├── chat/                 # Chat page
│   ├── swipe/                # Swipe page
│   └── layout.tsx            # Root layout
├── lib/
│   ├── prisma.ts             # Prisma client
│   ├── socket.ts             # Socket configuration
│   └── socketClient.ts       # Client socket setup
├── services/
│   ├── matchService.ts       # Matching logic
│   ├── geoService.ts         # Location services
│   ├── analytics/
│   │   └── tracker.ts        # Event tracking
│   ├── ai/
│   │   └── matchScore.ts     # ML scoring
│   └── billing/
│       └── stripe.ts         # Payment integration
├── hooks/
│   ├── useLocation.ts        # Location hook
│   ├── useSocket.ts          # WebSocket hook
│   └── useSwipeUsers.ts      # Swipe state
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── migrations/           # Database migrations
├── public/                   # Static assets
└── types/                    # TypeScript types
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

**Environment Variables in Vercel:**
- `DATABASE_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Manual Deployment

```bash
npm run build
npm run start
```

## 📊 Monitoring

### Health Check
```bash
curl https://your-app.vercel.app/api/health
```

### View Logs
- Vercel: Dashboard → Deployments → Logs
- Local: `npm run dev` output

## 🐛 Troubleshooting

### Database Connection Error
- Check `DATABASE_URL` in `.env.local`
- Verify PostgreSQL is running
- Run `npx prisma migrate status`

### Prisma Generation Error
- Run `npx prisma generate`
- Check for schema syntax errors
- Delete `node_modules/.prisma` and reinstall

### Build Fails
- Clear cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npx tsc --noEmit`

## 🔐 Security

- All API routes validate input
- Database queries use Prisma ORM (SQL injection protection)
- Environment variables never exposed to client
- Stripe webhook signature verification
- JWT tokens for future auth

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is private. All rights reserved.

## 📧 Support

For support, email: support@nearbyconnect.app

---

**Last Updated**: May 2, 2026  
**Build Version**: 1.0.0  
**Status**: Production Ready ✅
