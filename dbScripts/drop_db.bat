ECHO off

mongosh --port 27017 --file drop_db.js

ECHO .
ECHO if no errors appear DB was created
PAUSE