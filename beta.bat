@echo off
heroku ps:scale web=0
npm test