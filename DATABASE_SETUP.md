# Database Setup Options

The application requires a database to store user data, posts, content ideas, etc.

## Quick Setup Options

### Option 1: SQLite (Recommended for Development) ⭐

**Fastest and easiest** - No database server needed, file-based database

**Pros:**
- Zero configuration
- No installation required
- Perfect for development and testing
- Works immediately

**Cons:**
- Not suitable for production deployment
- Single connection at a time

**Setup Time:** ~1 minute

---

### Option 2: Local PostgreSQL

**Best for production-like environment**

**Pros:**
- Production-ready database
- Better performance for multiple users
- Matches deployment environment

**Cons:**
- Requires PostgreSQL installation
- Need to start database service
- More configuration

**Setup Time:** ~5-10 minutes (if not installed)

**Steps:**
1. Install PostgreSQL: `brew install postgresql@15`
2. Start service: `brew services start postgresql@15`
3. Create database: `createdb influencer_manager`
4. Run migrations

---

### Option 3: Cloud PostgreSQL (Neon/Supabase)

**Pros:**
- Free tier available
- No local installation
- Works from anywhere
- Production-ready

**Cons:**
- Requires internet connection
- Need to sign up for service

**Setup Time:** ~3-5 minutes

---

## Recommendation

For **quick testing and development**, I recommend **Option 1 (SQLite)**.

You can always switch to PostgreSQL later when deploying to production.
