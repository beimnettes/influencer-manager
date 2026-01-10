# Environment Setup Guide

This guide explains how to configure environment variables for the Influencer Manager application (both backend and frontend).

## 📋 Quick Start

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env` and configure your values:**
   ```bash
   # Use your preferred text editor
   nano .env
   # or
   code .env
   ```

4. **Required changes for production:**
   - Generate a strong `JWT_SECRET` (see instructions below)
   - Update `DATABASE_URL` with your production database
   - Set `NODE_ENV=production`
   - Configure `CORS_ORIGIN` with your frontend URL

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env` and set your API URL:**
   ```bash
   # For development (default)
   VITE_API_URL=http://localhost:3000
   
   # For production (example)
   VITE_API_URL=https://api.yourdomain.com
   ```

---

## 🔐 Backend Environment Variables

### Required Variables

#### `DATABASE_URL`
**Description:** Database connection string for Prisma ORM

**Local Development (SQLite):**
```env
DATABASE_URL="file:./dev.db"
```

**Production (PostgreSQL):**
```env
DATABASE_URL="postgresql://username:password@hostname:5432/database_name?schema=public"
```

**Supported databases:** PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, CockroachDB
**Documentation:** https://pris.ly/d/connection-strings

---

#### `JWT_SECRET`
**Description:** Secret key for signing JSON Web Tokens (authentication)

**⚠️ CRITICAL SECURITY REQUIREMENT:**
- **NEVER** use default/example values in production
- Generate a cryptographically secure random string
- Keep this secret safe and never commit it to version control

**Generate a secure secret:**
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32

# Using online tool (use with caution)
# https://randomkeygen.com/
```

**Example:**
```env
JWT_SECRET="a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6"
```

---

### Optional Variables

#### `JWT_EXPIRES_IN`
**Description:** JWT token expiration time

**Default:** `7d` (7 days)

**Format examples:**
- `60s` - 60 seconds
- `30m` - 30 minutes  
- `1h` - 1 hour
- `24h` - 24 hours
- `7d` - 7 days
- `30d` - 30 days

```env
JWT_EXPIRES_IN="7d"
```

---

#### `PORT`
**Description:** Port number the backend server will listen on

**Default:** `3000`

```env
PORT=3000
```

---

#### `NODE_ENV`
**Description:** Application environment mode

**Options:** `development`, `production`, `test`

**Default:** `development`

```env
NODE_ENV="production"
```

---

#### `CORS_ORIGIN`
**Description:** Allowed frontend origins for CORS (Cross-Origin Resource Sharing)

**Format:** Comma-separated list of URLs

**Development example:**
```env
CORS_ORIGIN="http://localhost:5173"
```

**Production example:**
```env
CORS_ORIGIN="https://yourdomain.com,https://www.yourdomain.com"
```

---

## 🎨 Frontend Environment Variables

### Required Variables

#### `VITE_API_URL`
**Description:** Backend API base URL

**⚠️ IMPORTANT:** All frontend environment variables MUST have the `VITE_` prefix to be accessible in the application.

**Local Development:**
```env
VITE_API_URL=http://localhost:3000
```

**Production:**
```env
VITE_API_URL=https://api.yourdomain.com
```

---

## 🚀 Running the Application

### Development Mode

1. **Start the backend:**
   ```bash
   cd backend
   npm run start:dev
   ```

2. **Start the frontend (in a new terminal):**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

### Production Build

1. **Backend:**
   ```bash
   cd backend
   npm run build
   npm run start:prod
   ```

2. **Frontend:**
   ```bash
   cd frontend
   npm run build
   # Serve the dist/ directory with your web server
   ```

---

## 🛡️ Security Best Practices

### ✅ DO:
- ✅ Copy `.env.example` to `.env` and customize values
- ✅ Use strong, random secrets (32+ characters)
- ✅ Set different secrets for each environment
- ✅ Keep `.env` files in `.gitignore`
- ✅ Use environment-specific configuration
- ✅ Regularly rotate secrets in production
- ✅ Use environment variable management tools in production (AWS Secrets Manager, etc.)

### ❌ DON'T:
- ❌ Commit `.env` files to version control
- ❌ Use default/example secrets in production
- ❌ Share `.env` files via insecure channels
- ❌ Hardcode secrets in source code
- ❌ Use the same secrets across environments
- ❌ Expose secrets in logs or error messages

---

## 🧪 Test Credentials (Development Only)

The seed file (`backend/prisma/seed.ts`) creates test accounts for development:

**Admin Account:**
- Email: `admin@influencer.com`
- Password: `password123`
- Role: ADMIN

**User Account:**
- Email: `user@influencer.com`
- Password: `password123`
- Role: USER

⚠️ **WARNING:** These are publicly known test credentials. Change all passwords for production use!

---

## 📝 Example Configuration Files

### Backend `.env` (Development)
```env
NODE_ENV="development"
DATABASE_URL="file:./dev.db"
JWT_SECRET="dev-secret-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=3000
CORS_ORIGIN="http://localhost:5173"
```

### Backend `.env` (Production)
```env
NODE_ENV="production"
DATABASE_URL="postgresql://user:pass@db.example.com:5432/influencer_prod?schema=public"
JWT_SECRET="a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6"
JWT_EXPIRES_IN="7d"
PORT=3000  
CORS_ORIGIN="https://app.yourdomain.com"
```

### Frontend `.env` (Development)
```env
VITE_API_URL=http://localhost:3000
```

### Frontend `.env` (Production)
```env
VITE_API_URL=https://api.yourdomain.com
```

---

## ❓ Troubleshooting

### "JWT_SECRET not set" error
**Problem:** Backend fails to start with JWT_SECRET error

**Solution:** 
1. Ensure `.env` file exists in `backend/` directory
2. Verify `JWT_SECRET=your_secret_here` is set
3. Restart the backend server

### Frontend can't connect to backend
**Problem:** API calls fail with network errors

**Solution:**
1. Check `VITE_API_URL` in `frontend/.env`
2. Ensure backend is running on the specified URL
3. Verify CORS settings in backend
4. Check browser console for specific error messages

### Database connection errors
**Problem:** Backend can't connect to database

**Solution:**
1. Verify `DATABASE_URL` format is correct
2. For PostgreSQL: ensure database exists and credentials are valid
3. For SQLite: check file permissions in backend directory
4. Run migrations: `npm run migrate`

---

## 📚 Additional Resources

- [Prisma Connection Strings](https://pris.ly/d/connection-strings)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [NestJS Configuration](https://docs.nestjs.com/techniques/configuration)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

## 🆘 Need Help?

If you encounter issues not covered here:
1. Check the main README.md
2. Review application logs
3. Verify all environment variables are set correctly
4. Ensure all dependencies are installed (`npm install`)
