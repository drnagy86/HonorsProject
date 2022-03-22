ECHO off

mongosh --port 27017 --file RubricTestData2.js

ECHO .
ECHO if no errors appear DB was created
PAUSE