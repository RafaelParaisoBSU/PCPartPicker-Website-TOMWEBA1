@echo off
echo 🚀 Starting VIVA Website Application...
echo.

echo 📦 Installing dependencies...
call npm run install-all

echo.
echo 🌐 Starting both servers...
echo 📱 Backend API: http://localhost:5000
echo 🌐 Frontend: http://localhost:5173
echo.
call npm run start-with-links

echo.
echo ✅ Both servers are running!
echo 📱 Backend API: http://localhost:5000
echo 🌐 Frontend: http://localhost:5173
echo.
pause
