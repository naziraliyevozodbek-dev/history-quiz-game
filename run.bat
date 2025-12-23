@echo off
echo Tarix Fanidan Test O'yinini Ishga Tushirish...
echo --------------------------------------------

:: Check for Node.js
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo XATOLIK: Node.js o'rnatilmagan!
    echo Iltimos, https://nodejs.org saytidan Node.js ni yuklab oling va o'rnating.
    echo Keyin ushbu faylni qayta ishga tushiring.
    pause
    exit /b
)

if not exist node_modules (
    echo Birinchi marta ishga tushirmoqdasiz. Kerakli fayllar yuklanmoqda...
    call npm install
    if %errorlevel% neq 0 (
        echo Xatolik yuz berdi: npm install muvaffaqiyatsiz bo'ldi.
        pause
        exit /b
    )
)

echo.
echo O'yin ishga tushmoqda...
echo Brauzerda ochilmoqda...
start http://localhost:5173
call npm run dev
pause
