# NodeJs-Api-PhotoUploader

This is a Node.js API project that allows users to upload and manage their photos. Users can register, login, upload photos, and view their uploaded photos. The API also supports functionalities like updating photo privacy settings, getting photo details, and tracking photo views.


## API Endpoints and Usage
### POST /users/register
- Description: Register a new user and create their profile.
- profilePicture: users can upload a profile picture as well if they wish
#### Request:

```
POST /users/register
Content-Type: application/json

{
  "username": "example_user",
  "email": "user@example.com",
  "password": "user_password"
}
```
#### Response:

```
Status: 201 Created
Content-Type: application/json

{
  "_id": "user_id",
  "username": "example_user",
  "email": "user@example.com",
  "profilePicture": null
}
```
### POST /users/login
- Description: Authenticate a user and obtain an access token.

#### Request:
```
POST /users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "user_password"
}
```
#### Response:

```
Status: 200 OK
Content-Type: application/json

{
  "uploadToken": "access_token"
}
```

### GET /users/current
- Description: Get the currently logged-in user's information.

#### Request:
```
GET /users/current
Authorization: Bearer access_token
```
#### Response:
```
Status: 200 OK
Content-Type: application/json

{
  "_id": "user_id",
  "username": "example_user",
  "email": "user@example.com",
  "profilePicture": null
}
```
### POST /uploads
- Description: Upload a photo.

#### Request:
```
POST /uploads
Authorization: Bearer access_token
Content-Type: multipart/form-data

{
  "file": file_data,
  "isPublic": true
}
```
#### Response:
```
Status: 201 Created
Content-Type: application/json

{
  "_id": "photo_id",
  "user_id": "user_id",
  "fileOriginalName": "photo.jpg",
  "file": "photo_file_name.jpg",
  "size": "512 KB",
  "public": true,
  "likes": 0,
  "dislikes": 0,
  "viewsCount": 0,
  "type": "image/jpeg",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```
### GET /uploads
- Description: Get all photos uploaded by the currently logged-in user.

#### Request:
```
GET /uploads
Authorization: Bearer access_token
```
#### Response:
```
Status: 200 OK
Content-Type: application/json

[
  {
    "_id": "photo_id",
    "user_id": "user_id",
    "fileOriginalName": "photo.jpg",
    "file": "photo_file_name.jpg",
    "size": "512 KB",
    "public": true,
    "likes": 0,
    "dislikes": 0,
    "viewsCount": 0,
    "type": "image/jpeg",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  },
  // More photos...
]
```
### GET /uploads/:id
- Description: Get details of a specific photo.

#### Request
```
GET /uploads/:id
Authorization: Bearer access_token
```
#### Response:
```
Status: 200 OK
Content-Type: application/json

{
  "_id": "photo_id",
  "user_id": "user_id",
  "fileOriginalName": "photo.jpg",
  "file": "photo_file_name.jpg",
  "size": "512 KB",
  "public": true,
  "likes": 0,
  "dislikes": 0,
  "viewsCount": 0,
  "type": "image/jpeg",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```
### PUT /uploads/:id
- Description: Update the privacy setting of a photo.

#### Request:
```
PUT /uploads/:id
Authorization: Bearer access_token
Content-Type: application/json

{
  "isPublic": false
}
```
#### Response:
```
Status: 200 OK
Content-Type: application/json

{
  "_id": "photo_id",
  "user_id": "user_id",
  "fileOriginalName": "photo.jpg",
  "file": "photo_file_name.jpg",
  "size": "512 KB",
  "public": false,
  "likes": 0,
  "dislikes": 0,
  "viewsCount": 0,
  "type": "image/jpeg",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```
### DELETE /uploads/:id
- Description: Delete a photo.

#### Request:
```
DELETE /uploads/:id
Authorization: Bearer access_token
```
#### Response:
```
Status: 200 OK
Content-Type: application/json

{
  "message": "Photo successfully deleted"
}
```


### License
This project is licensed under the MIT License.

### Contact
For any questions or support, please contact me at bashar.subh@gmail.com 




