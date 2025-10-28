Write-Host "🚀 Starting VIVA Website Application..." -ForegroundColor Green
Write-Host "📦 Installing all dependencies..." -ForegroundColor Yellow
npm run install-all
Write-Host "🌐 Starting both servers..." -ForegroundColor Yellow
Write-Host "📱 Backend API: http://localhost:5000" -ForegroundColor Cyan
Write-Host "🌐 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
npm run start-with-links
