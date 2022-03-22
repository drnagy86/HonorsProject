ECHO off

mongosh --port 27017 --file RubricTestData.js

ECHO .
ECHO if no errors appear DB was created
PAUSE