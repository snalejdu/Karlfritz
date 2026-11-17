@echo off
robocopy "C:\Portfolio\site\dist" "C:\laragon\www\portfolio" /E /NFL /NDL /NJH > laragon-build.log 2>&1
echo exit %ERRORLEVEL%>> laragon-build.log
echo done>> laragon-build.log
