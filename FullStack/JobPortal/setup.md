# 🚀 CAREER-CODE Quick Setup Guide

## Port Configuration Fixed ✅

The server has been updated to use **port 3001** instead of 5000 to avoid conflicts.

## Quick Start Instructions

### 1. Backend Setup (Terminal 1)
```bash
cd job-portal-server
npm install
cp .env.example .env
# Edit .env file with your configuration
npm run dev
```
**Server will run on:** http://localhost:3001

### 2. Frontend Setup (Terminal 2)
```bash
cd job-portal-client
npm install
cp .env.example .env
# Edit .env file with your Firebase configuration
npm run dev
```
**Frontend will run on:** http://localhost:5173

## 🔧 Configuration Files Updated

### Backend (.env)
- PORT changed from 5000 to **3001**
- All endpoints now use port 3001

### Frontend (.env)
- VITE_API_BASE_URL updated to **http://localhost:3001/api**
- API service fallback URL updated

## 📋 Next Steps

1. **Setup Firebase Project:**
   - Go to https://console.firebase.google.com
   - Create a new project
   - Enable Authentication > Sign-in method > Email/Password and Google
   - Get your config keys and add them to `job-portal-client/.env`

2. **Setup MongoDB:**
   - Install MongoDB locally or use MongoDB Atlas
   - Update MONGODB_URI in `job-portal-server/.env`

3. **Test the Application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001/api
   - Health Check: http://localhost:3001/health

## 🛠️ Troubleshooting

### Port 3001 Still in Use?
```bash
# Kill process on port 3001
npx kill-port 3001
# Or use a different port in .env
PORT=3002
```

### Firebase Configuration Issues?
- Ensure all Firebase keys are correctly copied
- Check Firebase project settings
- Verify domain is added to authorized domains

### API Connection Issues?
- Check if backend server is running on port 3001
- Verify CORS settings allow localhost:5173
- Check network connectivity

## ✅ Success Indicators

- ✅ Backend server starts on port 3001
- ✅ Frontend loads without CSS errors
- ✅ API health check responds at /health
- ✅ No console errors in browser
- ✅ Firebase authentication initializes

**Happy Coding! 🎉**
