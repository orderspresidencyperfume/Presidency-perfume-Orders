@echo off
setlocal
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Install Node.js LTS first from https://nodejs.org/
  pause
  exit /b 1
)
cd /d "%~dp0"
echo Installing dependencies...
npm install
if errorlevel 1 exit /b 1
echo.
echo Presidency Perfumes starter is ready.
echo Run: npm run dev
pause
