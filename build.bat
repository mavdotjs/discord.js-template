@echo off
git add .
git commit -am %1
git push
heroku ps:scale web=1