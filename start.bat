@echo off
echo ==========================================
echo  KacaFilm Dev Server - Auto Restart
echo ==========================================

:restart
echo.
echo [1/3] Killing existing node processes...
taskkill /F /IM node.exe >nul 2>&1

echo [2/3] Starting dev server on port 3000...
cd /d "C:\project jasa\kaca-film"
npx next dev -p 3000

echo.
echo Server stopped. Restarting in 3 seconds...
timeout /t 3 /nobreak >nul
goto restart
