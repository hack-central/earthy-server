# Getting it up

Make sure you've got yarn and install the project's dependencies

```bash
yarn
```

## Development
```bash
yarn start:dev
```

## Production
```bash
yarn start
```

Now just go to http://localhost:8080/ and you'll be good to go.

# schemas

## user
- id
- first_name
- last_name
- phoneNo
- email
- password
- events
- points
- trophies
- createdAt

## event
- id
- name
- shortDescription
- description
- location
- startDate
- endDate
- createdBy
- createdAt
- users

## post
- id
- title
- content
- likes
- userId
- createdAt

## comment
- id
- content
- likes
- postId
- userId
- createdAt


# How to use

- To add a user

```javascript
var axios = require('axios');
var data = JSON.stringify({
    "id": 110,
    "firstName": "Rajesh",
    "lastName": "Kooo",
    "email": "newRajesh@gmail.com",
    "phoneNo": 1234567890,
    "password": "rajeshAwesome",
    "events": [1, 3],
    "points": 540,
    "trophies": ["Mr. Green"],
    "createdAt": 399299988
});

var config = {
    method: 'post',
    url: 'http://localhost:3000/users',
    headers: {
        'Content-Type': 'application/json'
    },
    data: data
};

axios(config)
    .then(function(response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function(error) {
        console.log(error);
    });
```

- To add a post

```javascript
var axios = require('axios');
var data = JSON.stringify({
    "id": 9999,
    "title": "Wow, this posts!",
    "content": "Omg, this should be a winner project! Give them prize already omg!",
    "likes": 69,
    "userId": 7,
    "createdAt": 488702310
});

var config = {
    method: 'post',
    url: 'http://localhost:3000/posts',
    headers: {
        'Content-Type': 'application/json'
    },
    data: data
};

axios(config)
    .then(function(response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function(error) {
        console.log(error);
    });
```

- To add a comment

```javascript
var axios = require('axios');
var data = JSON.stringify({
    "id": 777,
    "content": "I know! I 100% agree with you",
    "likes": 4,
    "postId": 1,
    "userId": 3,
    "createdAt": 825081721
});

var config = {
    method: 'post',
    url: 'http://localhost:3000/comments',
    headers: {
        'Content-Type': 'application/json'
    },
    data: data
};

axios(config)
    .then(function(response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function(error) {
        console.log(error);
    });
```
