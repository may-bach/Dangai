@echo off
setlocal enabledelayedexpansion

:: #############################################
:: ##  Advanced Chapter Creator for Dangai    ##
:: #############################################
cls
echo.
echo Welcome to the Advanced Chapter Creator!
echo This script will create new chapter files in the correct arc folder.
echo It automatically finds the last chapter and adds new ones after it.
echo -------------------------------------------------------------
echo.

:: --- 1. Get User Input ---
set /p arcNum="Enter the Arc number (e.g., 1, 2, 3): "
set /p chaptersToAdd="How many NEW chapters do you want to create?: "
echo.

:: --- 2. Convert Arc Number to English Word and Folder Name ---
set "arcWord=%arcNum%th"
set "arcName=%arcNum%th_arc"

if %arcNum%==1 (set arcWord=first & set arcName=first_arc)
if %arcNum%==2 (set arcWord=second & set arcName=second_arc)
if %arcNum%==3 (set arcWord=third & set arcName=third_arc)
if %arcNum%==4 (set arcWord=fourth & set arcName=fourth_arc)
if %arcNum%==5 (set arcWord=fifth & set arcName=fifth_arc)
if %arcNum%==6 (set arcWord=sixth & set arcName=sixth_arc)
if %arcNum%==7 (set arcWord=seventh & set arcName=seventh_arc)
if %arcNum%==8 (set arcWord=eighth & set arcName=eighth_arc)
if %arcNum%==9 (set arcWord=ninth & set arcName=ninth_arc)
if %arcNum%==10 (set arcWord=tenth & set arcName=tenth_arc)

:: --- 3. Set Target Directory and Create It If Needed ---
set "targetDir=public\chapters\%arcName%"
echo Target directory: %targetDir%
mkdir "%targetDir%" 2>nul

:: --- 4. Find the Last Existing Chapter Number (Corrected Logic) ---
set lastChapter=0
:: We loop through all files and compare them numerically to find the true highest number.
for /f "tokens=2 delims=_." %%f in ('dir /b "%targetDir%\chapter_*.md" 2^>nul') do (
    if %%f GTR !lastChapter! set lastChapter=%%f
)

if %lastChapter%==0 (
    echo No existing chapters found. Starting from chapter 1.
) else (
    echo Last chapter found is %lastChapter%.
)
echo.

:: --- 5. Calculate Loop Range and Create New Files ---
set /a startNum = %lastChapter% + 1
set /a endNum = %lastChapter% + %chaptersToAdd%

echo Creating %chaptersToAdd% new chapter(s), from %startNum% to %endNum%...
for /l %%i in (%startNum%, 1, %endNum%) do (
    set "filePath=%targetDir%\chapter_%%i.md"
    echo %arcWord% arc chapter %%i > "!filePath!"
    echo   - Created chapter_%%i.md
)

echo.
echo -------------------------------------------------------------
echo All done!
pause
endlocal
