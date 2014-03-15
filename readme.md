# Image storage

Image hosting on node.js

To run server write this in console:
```
npm install
mongod
node dataGen.js
node app.js
```

httpie requests for auth:

```
http POST http://localhost:1337/api/users username=egor password=123456
http POST http://localhost:1337/oauth/token grant_type=password client_id=webV1 client_secret=abc123456 username=egor password=123456
http http://localhost:1337/api/*some blocked resource* Authorization:'Bearer TOKEN'
```