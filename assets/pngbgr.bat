@echo off
title PNG Background Remover

set /P args=Arguments: 

call pngbgr.exe %args%

echo.
pause