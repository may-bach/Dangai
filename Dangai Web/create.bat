@echo off
mkdir chapters 2>nul
for /l %%i in (1,1,100) do (
    echo # Chapter %%i: [Title Here] > chapters\chapter_%%i.md
    echo. >> chapters\chapter_%%i.md
    echo [Chapter content goes here] >> chapters\chapter_%%i.md
)
echo Created 100 chapter files in the chapters folder
pause