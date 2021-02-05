FORMAT: 1A

# Web Speed Hackathon 2021 API

## Group Users

### Get Current User [GET /api/v1/me]

- Response 200 (application/json)

  ```json
  {
    "id": "76ae97e2-6eb4-45df-a205-bee8d425c954",
    "username": "knuisedspur",
    "name": "Nakanishi Tatsuo",
    "description": "プログラマーだけど、サイクリングはじめました！",
    "createdAt": "2021-02-02T23:38:33.875Z",
    "updatedAt": "2021-02-02T23:38:33.875Z",
    "profileImage": {
      "id": "538dbca6-85d6-434e-a1f4-b370d03dbb85",
      "alt": "",
      "createdAt": "2021-02-02T23:38:33.133Z",
      "updatedAt": "2021-02-02T23:38:33.133Z"
    }
  }
  ```

### Get User [GET /api/v1/users/{username}]

- Parameters

  - username (string, required)

- Response 200 (application/json)

  ```json
  {
    "id": "76ae97e2-6eb4-45df-a205-bee8d425c954",
    "username": "knuisedspur",
    "name": "Nakanishi Tatsuo",
    "description": "プログラマーだけど、サイクリングはじめました！",
    "createdAt": "2021-02-02T23:38:33.875Z",
    "updatedAt": "2021-02-02T23:38:33.875Z",
    "profileImage": {
      "id": "538dbca6-85d6-434e-a1f4-b370d03dbb85",
      "alt": "",
      "createdAt": "2021-02-02T23:38:33.133Z",
      "updatedAt": "2021-02-02T23:38:33.133Z"
    }
  }
  ```

### Get User's Posts [GET /api/v1/users/{username}/posts{?limit,offset}]

- Parameters

  - username (string, required)
  - limit: 10 (number, optional)
    指定した数だけアイテムが返却されます
  - offset: 30 (number, optional)
    指定した数より先のアイテムが返却されます

- Response 200 (application/json)

  ```json
  [
    {
      "id": "01EXJN6PP3Y6X5ACTJ569KRKFD",
      "text": "写真に残すと記憶にも残りやすいよね、自分の人生で印象強い写真はこれ",
      "createdAt": "2021-02-03T00:38:17.539Z",
      "updatedAt": "2021-02-02T23:38:34.731Z",
      "user": {
        "id": "76ae97e2-6eb4-45df-a205-bee8d425c954",
        "username": "knuisedspur",
        "name": "Nakanishi Tatsuo",
        "description": "プログラマーだけど、サイクリングはじめました！",
        "createdAt": "2021-02-02T23:38:33.875Z",
        "updatedAt": "2021-02-02T23:38:33.875Z",
        "profileImage": {
          "id": "538dbca6-85d6-434e-a1f4-b370d03dbb85",
          "alt": "",
          "createdAt": "2021-02-02T23:38:33.133Z",
          "updatedAt": "2021-02-02T23:38:33.133Z"
        }
      },
      "movie": {
        "id": "3cb50e48-535b-4e5f-bbde-455c01def021",
        "createdAt": "2021-02-02T23:38:33.575Z",
        "updatedAt": "2021-02-02T23:38:33.575Z"
      },
      "sound": {
        "id": "5a93be41-caab-4eec-9ac1-8b57c24ccbe2",
        "title": "Coy Koi",
        "artist": "Minnie Sweeny",
        "createdAt": "2021-02-02T23:38:33.720Z",
        "updatedAt": "2021-02-02T23:38:33.720Z"
      },
      "images": [
        {
          "id": "a21c9b2c-9fc7-4d3c-8488-a465150f7b1c",
          "alt": "",
          "createdAt": "2021-02-02T23:38:33.407Z",
          "updatedAt": "2021-02-02T23:38:33.407Z"
        }
      ]
    }
  ]
  ```

## Group Posts

### Get Posts [GET /api/v1/posts{?limit,offset}]

- Parameters

  - limit: 10 (number, optional)
    指定した数だけアイテムが返却されます
  - offset: 30 (number, optional)
    指定した数より先のアイテムが返却されます

- Response 200 (application/json)

  ```json
  [
    {
      "id": "01EXJN6PP3Y6X5ACTJ569KRKFD",
      "text": "今日の朝ごはん、いい感じに焼けたぞ",
      "createdAt": "2021-02-03T00:38:17.539Z",
      "updatedAt": "2021-02-02T23:38:34.731Z",
      "user": {
        "id": "76ae97e2-6eb4-45df-a205-bee8d425c954",
        "username": "knuisedspur",
        "name": "Nakanishi Tatsuo",
        "description": "プログラマーだけど、サイクリングはじめました！",
        "createdAt": "2021-02-02T23:38:33.875Z",
        "updatedAt": "2021-02-02T23:38:33.875Z",
        "profileImage": {
          "id": "538dbca6-85d6-434e-a1f4-b370d03dbb85",
          "alt": "",
          "createdAt": "2021-02-02T23:38:33.133Z",
          "updatedAt": "2021-02-02T23:38:33.133Z"
        }
      },
      "movie": {
        "id": "3cb50e48-535b-4e5f-bbde-455c01def021",
        "createdAt": "2021-02-02T23:38:33.575Z",
        "updatedAt": "2021-02-02T23:38:33.575Z"
      },
      "sound": {
        "id": "5a93be41-caab-4eec-9ac1-8b57c24ccbe2",
        "title": "Coy Koi",
        "artist": "Minnie Sweeny",
        "createdAt": "2021-02-02T23:38:33.720Z",
        "updatedAt": "2021-02-02T23:38:33.720Z"
      },
      "images": [
        {
          "id": "a21c9b2c-9fc7-4d3c-8488-a465150f7b1c",
          "alt": "",
          "createdAt": "2021-02-02T23:38:33.407Z",
          "updatedAt": "2021-02-02T23:38:33.407Z"
        }
      ]
    }
  ]
  ```

### Get Post [GET /api/v1/posts/{id}]

- Parameters

  - id (string, optional)

- Response 200 (application/json)

  ```json
  {
    "id": "01EXJN6PP3Y6X5ACTJ569KRKFD",
    "text": "今日の朝ごはん、いい感じに焼けたぞ",
    "createdAt": "2021-02-03T00:38:17.539Z",
    "updatedAt": "2021-02-02T23:38:34.731Z",
    "user": {
      "id": "76ae97e2-6eb4-45df-a205-bee8d425c954",
      "username": "knuisedspur",
      "name": "Nakanishi Tatsuo",
      "description": "プログラマーだけど、サイクリングはじめました！",
      "createdAt": "2021-02-02T23:38:33.875Z",
      "updatedAt": "2021-02-02T23:38:33.875Z",
      "profileImage": {
        "id": "538dbca6-85d6-434e-a1f4-b370d03dbb85",
        "alt": "",
        "createdAt": "2021-02-02T23:38:33.133Z",
        "updatedAt": "2021-02-02T23:38:33.133Z"
      }
    },
    "movie": {
      "id": "3cb50e48-535b-4e5f-bbde-455c01def021",
      "createdAt": "2021-02-02T23:38:33.575Z",
      "updatedAt": "2021-02-02T23:38:33.575Z"
    },
    "sound": {
      "id": "5a93be41-caab-4eec-9ac1-8b57c24ccbe2",
      "title": "Coy Koi",
      "artist": "Minnie Sweeny",
      "createdAt": "2021-02-02T23:38:33.720Z",
      "updatedAt": "2021-02-02T23:38:33.720Z"
    },
    "images": [
      {
        "id": "a21c9b2c-9fc7-4d3c-8488-a465150f7b1c",
        "alt": "",
        "createdAt": "2021-02-02T23:38:33.407Z",
        "updatedAt": "2021-02-02T23:38:33.407Z"
      }
    ]
  }
  ```

### Create Post [POST /api/v1/posts]

- Request (application/json)

  ```json
  {
    "text": "今日の朝ごはん、いい感じに焼けたぞ",
    "movie": {
      "id": "3cb50e48-535b-4e5f-bbde-455c01def021"
    },
    "sound": {
      "id": "5a93be41-caab-4eec-9ac1-8b57c24ccbe2"
    },
    "images": [
      {
        "id": "a21c9b2c-9fc7-4d3c-8488-a465150f7b1c"
      }
    ]
  }
  ```

- Response 200 (application/json)

  ```json
  {
    "id": "01EXJN6PP3Y6X5ACTJ569KRKFD",
    "text": "今日の朝ごはん、いい感じに焼けたぞ",
    "createdAt": "2021-02-03T00:38:17.539Z",
    "updatedAt": "2021-02-02T23:38:34.731Z",
    "user": {
      "id": "76ae97e2-6eb4-45df-a205-bee8d425c954",
      "username": "knuisedspur",
      "name": "Nakanishi Tatsuo",
      "description": "プログラマーだけど、サイクリングはじめました！",
      "createdAt": "2021-02-02T23:38:33.875Z",
      "updatedAt": "2021-02-02T23:38:33.875Z",
      "profileImage": {
        "id": "538dbca6-85d6-434e-a1f4-b370d03dbb85",
        "alt": "",
        "createdAt": "2021-02-02T23:38:33.133Z",
        "updatedAt": "2021-02-02T23:38:33.133Z"
      }
    },
    "movie": {
      "id": "3cb50e48-535b-4e5f-bbde-455c01def021",
      "createdAt": "2021-02-02T23:38:33.575Z",
      "updatedAt": "2021-02-02T23:38:33.575Z"
    },
    "sound": {
      "id": "5a93be41-caab-4eec-9ac1-8b57c24ccbe2",
      "title": "Coy Koi",
      "artist": "Minnie Sweeny",
      "createdAt": "2021-02-02T23:38:33.720Z",
      "updatedAt": "2021-02-02T23:38:33.720Z"
    },
    "images": [
      {
        "id": "a21c9b2c-9fc7-4d3c-8488-a465150f7b1c",
        "alt": "",
        "createdAt": "2021-02-02T23:38:33.407Z",
        "updatedAt": "2021-02-02T23:38:33.407Z"
      }
    ]
  }
  ```

## Group Assets

### Image [POST /api/v1/images]

- バイナリデータを直接送信します
- アップロード上限は 10 MB です

- Request (application/octet-stream)

- Response 200 (application/json)

  ```json
  {
    "id": "538dbca6-85d6-434e-a1f4-b370d03dbb85"
  }
  ```

### Movie [POST /api/v1/movies]

- バイナリデータを直接送信します
- アップロード上限は 10 MB です

- Request (application/octet-stream)

- Response 200 (application/json)

  ```json
  {
    "id": "538dbca6-85d6-434e-a1f4-b370d03dbb85"
  }
  ```

### Sound [POST /api/v1/sounds]

- バイナリデータを直接送信します
- アップロード上限は 10 MB です

- Request (application/octet-stream)

- Response 200 (application/json)

  ```json
  {
    "id": "538dbca6-85d6-434e-a1f4-b370d03dbb85"
  }
  ```

## Group Auth

### Signup [POST /api/v1/signup]

- Request (application/json)

  ```json
  {
    "username": "knuisedspur",
    "name": "Nakanishi Tatsuo",
    "description": "プログラマーだけど、サイクリングはじめました！",
    "password": "pa5sW0rd!"
  }
  ```

- Response 200 (application/json)

  ```json
  {
    "id": "76ae97e2-6eb4-45df-a205-bee8d425c954",
    "username": "knuisedspur",
    "name": "Nakanishi Tatsuo",
    "description": "プログラマーだけど、サイクリングはじめました！",
    "createdAt": "2021-02-02T23:38:33.875Z",
    "updatedAt": "2021-02-02T23:38:33.875Z",
    "profileImage": {
      "id": "538dbca6-85d6-434e-a1f4-b370d03dbb85",
      "alt": "",
      "createdAt": "2021-02-02T23:38:33.133Z",
      "updatedAt": "2021-02-02T23:38:33.133Z"
    }
  }
  ```

### Signin [POST /api/v1/signin]

- Request (application/json)

  ```json
  {
    "username": "knuisedspur",
    "password": "pa5sW0rd!"
  }
  ```

- Response 200 (application/json)

  ```json
  {
    "id": "76ae97e2-6eb4-45df-a205-bee8d425c954",
    "username": "knuisedspur",
    "name": "Nakanishi Tatsuo",
    "description": "プログラマーだけど、サイクリングはじめました！",
    "createdAt": "2021-02-02T23:38:33.875Z",
    "updatedAt": "2021-02-02T23:38:33.875Z",
    "profileImage": {
      "id": "538dbca6-85d6-434e-a1f4-b370d03dbb85",
      "alt": "",
      "createdAt": "2021-02-02T23:38:33.133Z",
      "updatedAt": "2021-02-02T23:38:33.133Z"
    }
  }
  ```

### Signout [POST /api/v1/signout]

- Response 200 (application/json)

  ```json
  {}
  ```

## Group Initialize

### Initialze [POST /api/v1/initialize]

- Response 200 (application/json)

  ```json
  {}
  ```
