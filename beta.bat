@echo off
call heroku ps:scale web=0
npm test