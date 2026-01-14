# Render Deployment Guide

This guide covers deploying the PCPartPicker application to Render.

## Prerequisites

- GitHub account with this repository pushed
- Render account (https://render.com)
- MongoDB Atlas connection string

## Deployment Steps

### 1. Create Backend Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `pcpartpicker-api`
   - **Runtime**: `Node`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. Add Environment Variables:
   ```
   MONGO_URI=<your-mongodb-connection-string>
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.onrender.com
   ```

6. Click **"Create Web Service"**

### 2. Create Frontend Static Site

1. Click **"New +"** → **"Static Site"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `pcpartpicker-web`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. Add Environment Variables:
   ```
   VITE_API_URL=https://pcpartpicker-api.onrender.com
   ```

5. Click **"Create Static Site"**

## Environment Variables

### Backend (.env or Render Dashboard)

```
MONGO_URI=<MongoDB connection string>
NODE_ENV=production
PORT=10000
FRONTEND_URL=<Your frontend Render URL>
```

### Frontend (Render Dashboard)

```
VITE_API_URL=https://pcpartpicker-api.onrender.com
```

## MongoDB Setup

1. Create a MongoDB Atlas cluster (https://www.mongodb.com/cloud/atlas)
2. Create a database named `pcpartpicker`
3. Copy your connection string: `mongodb+srv://username:password@cluster.mongodb.net/pcpartpicker?retryWrites=true&w=majority`
4. Add this to your backend environment variables as `MONGO_URI`

## Post-Deployment

After deployment completes:

1. Copy your frontend URL from Render dashboard
2. Update the backend `FRONTEND_URL` environment variable with this URL
3. Both services will automatically redeploy

## Troubleshooting

### Backend won't start
- Check MongoDB connection string is correct
- Verify environment variables are set
- Check logs in Render dashboard

### Frontend can't reach API
- Verify `VITE_API_URL` points to correct backend URL
- Check CORS is properly configured in backend
- Ensure backend service is running

### Build failures
- Check Node version compatibility (Node 16+)
- Review build logs in Render dashboard
- Verify all dependencies are in package.json

## Auto-Deployment

Both services are configured to redeploy automatically when you push to your GitHub repository.

## Notes

- Free tier services spin down after 15 minutes of inactivity
- First request after spin-down may take 30+ seconds
- For production, consider upgrading to paid plans
