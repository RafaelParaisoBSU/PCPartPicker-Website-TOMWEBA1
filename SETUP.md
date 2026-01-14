# PCPartPicker Website - Setup & Deployment Guide

## Quick Start - Local Development

### Backend Setup
```bash
cd backend
npm install
npm run dev
```
Backend runs on `http://localhost:5000`

### Frontend Setup
```bash
cd client
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

### Or Run Both Together
```bash
npm install
npm start
```

## Environment Configuration

The project uses environment variables for API configuration.

### Local Development
- Backend automatically uses `http://localhost:5000`
- Frontend automatically uses `http://localhost:5000`

### Production Deployment
Create `.env` files:

**Backend** (`backend/.env`):
```
MONGO_URI=<your-mongodb-uri>
NODE_ENV=production
FRONTEND_URL=<your-frontend-url>
PORT=10000
```

**Frontend** (`client/.env`):
```
VITE_API_URL=<your-backend-api-url>
```

## Deployment to Render

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete Render deployment instructions.

### Quick Deploy Checklist
1. ✅ Push code to GitHub
2. ✅ Create Render Web Service for backend (root dir: `backend`)
3. ✅ Create Render Static Site for frontend (root dir: `client`)
4. ✅ Set environment variables in Render dashboard
5. ✅ Services deploy automatically on git push

## Project Structure

```
.
├── backend/               # Express.js API server
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── utils/            # Helper functions
│   ├── server.js         # Entry point
│   └── package.json
│
├── client/               # React + Vite frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── styles/       # SCSS stylesheets
│   │   ├── config/       # Configuration files
│   │   └── assets/       # Images and media
│   ├── vite.config.js
│   └── package.json
│
├── render.yaml           # Render deployment config
└── DEPLOYMENT.md         # Deployment instructions
```

## Available Routes

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login
- `POST /api/auth/google` - Google OAuth

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Fetch orders

### Contacts
- `POST /api/contacts` - Submit contact form

### Builds
- `GET /api/builds` - Fetch user's PC build
- `POST /api/builds` - Save/update PC build

## Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB with Mongoose
- JWT authentication
- CORS enabled

**Frontend:**
- React 19
- React Router v7
- Vite (build tool)
- Tailwind CSS + SCSS
- Responsive design

## Important Notes

⚠️ **Before Deployment:**
1. Remove hardcoded MongoDB URI if present
2. Update CORS configuration for production URLs
3. Set all required environment variables
4. Test API calls with environment variables

## Support

For deployment issues, check:
- [Render Documentation](https://render.com/docs)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
- Backend logs in Render dashboard
