@echo off
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 goto nonode

if exist "node_modules\.bin\vite.cmd" goto run
echo Installing dependencies, please wait (1-2 min)...
call npm install
if errorlevel 1 goto fail

:run
echo Starting the site at http://localhost:5173 ...
call npm run dev
pause
exit /b

:nonode
echo Node.js is not installed. Install the LTS version from https://nodejs.org and run this file again.
start https://nodejs.org
pause
exit /b

:fail
echo npm install failed. Check your internet connection and run this file again.
pause
