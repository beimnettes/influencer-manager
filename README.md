# Influencer Manager - Be Your Own Manager

A professional full-stack web application that helps social media influencers and content creators manage their work in one place. Generate content ideas, write captions, schedule posts, and track performance metrics.

##  Tech Stack

**Backend:**
- NestJS (REST API)
- PostgreSQL (Database)
- Prisma ORM
- JWT Authentication
- bcrypt (Password hashing)

**Frontend:**
- React 18
- Vite (Build tool)
- React Router v6
- Axios (HTTP client)
- date-fns (Date formatting)
- Modern CSS with CSS Variables

## 📋 Features

✅ **User Authentication** - Secure signup/login with JWT  
✅ **Content Ideas** - Create and manage content ideas  
✅ **Caption Management** - Write captions with platform & tone selection  
✅ **Post Scheduling** - Schedule posts with calendar view  
✅ **Analytics Tracking** - Manual performance metrics input  
✅ **Dashboard** - Manager-style overview of upcoming posts and stats  

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database running locally or remote connection
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure database:**
   - Make sure PostgreSQL is running
   - Update the database connection in `prisma.config.ts` if needed
   - Default connection: `postgresql://postgres:postgres@localhost:5432/influencer_manager`

4. **Run database migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

6. **Start the backend server:**
   ```bash
   npm run start:dev
   ```

   The backend API will be running at `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will be running at `http://localhost:5173`

## 🔧 Configuration

### Environment Variables

The backend uses the following environment variables (defined in `.env.example`):

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/influencer_manager?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"
PORT=3000
```

**Note:** Copy `.env.example` to `.env` and update values as needed.

## 📁 Project Structure

```
influencer-manager/
├── backend/                 # NestJS API
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── content-ideas/  # Content ideas CRUD
│   │   ├── captions/       # Captions CRUD
│   │   ├── posts/          # Posts scheduling
│   │   ├── analytics/      # Performance tracking
│   │   ├── dashboard/      # Dashboard aggregation
│   │   └── common/         # Shared utilities
│   └── package.json
│
└── frontend/               # React application
    ├── src/
    │   ├── pages/          # Page components
    │   ├── components/     # Reusable components
    │   ├── contexts/       # React contexts
    │   ├── services/       # API client
    │   └── styles/         # CSS files
    └── package.json
```

## 🔐 API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user (protected)

### Content Ideas
- `POST /content-ideas` - Create idea
- `GET /content-ideas` - List all ideas
- `GET /content-ideas/:id` - Get single idea
- `PATCH /content-ideas/:id` - Update idea
- `DELETE /content-ideas/:id` - Delete idea

### Captions
- `POST /captions` - Create caption
- `GET /captions` - List all captions
- `GET /captions/:id` - Get single caption
- `PATCH /captions/:id` - Update caption
- `DELETE /captions/:id` - Delete caption

### Posts
- `POST /posts` - Create post
- `GET /posts` - List all posts
- `GET /posts/:id` - Get single post
- `GET /posts/calendar` - Calendar grouped view
- `PATCH /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

### Analytics
- `POST /analytics/post/:postId` - Add analytics
- `GET /analytics/post/:postId` - Get post analytics
- `PATCH /analytics/:id` - Update analytics
- `GET /analytics/summary` - Get summary stats

### Dashboard
- `GET /dashboard/overview` - Get dashboard data

## 🎨 Design System

The frontend uses a modern, professional design system with:

- **Dark Theme** - Easy on the eyes for long work sessions
- **Gradient Accents** - Premium look and feel
- **Smooth Animations** - Polished micro-interactions
- **Responsive Grid** - Works on all screen sizes
- **CSS Variables** - Consistent theming throughout

## 🧪 Testing the Application

1. **Start both servers** (backend on :3000, frontend on :5173)
2. **Sign up** for a new account
3. **Explore the dashboard** showing stats and upcoming posts
4. **Test API endpoints** using the provided endpoints

## 🛠️ Development Workflow

**Backend:**
```bash
npm run start:dev   # Development mode with hot reload
npm run build       # Production build
npm run start       # Production mode
```

**Frontend:**
```bash
npm run dev         # Development server
npm run build       # Production build
npm run preview     # Preview production build
```

## 📚 Database Schema

The application uses the following main models:

- **User** - User accounts and authentication
- **ContentIdea** - Brainstormed content ideas
- **Caption** - Written captions with platform/tone
- **Post** - Scheduled posts (DRAFT, SCHEDULED, POSTED)
- **Analytics** - Performance metrics per post

See `backend/prisma/schema.prisma` for full schema details.

## 🔄 Next Steps / Future Enhancements

The following features are planned or can be added:

- [ ] Complete CRUD pages for Ideas, Captions, Posts
- [ ] Calendar view for post scheduling
- [ ] Analytics charts and visualizations
- [ ] Content idea templates  
- [ ] AI-powered caption generation
- [ ] Social media API integrations (auto-posting)
- [ ] Team collaboration features
- [ ] Mobile app (React Native)

## 📝 Notes

- This is a **manual posting** workflow - the app reminds you when to post but does not automatically post to social media
- All passwords are hashed using bcrypt
- JWT tokens are stored in localStorage
- API includes CORS configuration for local development

## 👨‍💻 Development

Built with clean architecture, best practices, and portfolio-quality code.  
Ready for deployment and further feature development.

---
## Development Notes
Testing pull request template.

**Happy Managing! 🚀**
