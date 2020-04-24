# Sign up

Used to create a new user account.

**URL** : `POST api.the-mesto.tk/signup`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "name": "[name length from 2 to 30 symbols]",
    "about": "[valid string]",
    "avatar": "[valid url link]",
    "email": "[valid email address]",
    "password": "[password length not less than 8 symbols]"
}
```

**Data example**

```json
{
    "name": "test",
    "about": "test",
    "avatar": "http://test.com",
    "email": "test@gmail.com",
    "password": "12345678"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```Json
{
    "_id": "5ea34ae933691053ae2e43e2",
    "name": "test",
    "about": "test",
    "avatar": "http://test.com",
    "email": "test@gmail.com"
}
```

## Error Response

**Condition** : If some validations for the fields have not been passed the error message will be displayed in property "message".

**Code** : `500 Internal server error`

**Content** :

```json
{
    "message": "[Error message]"
}
```
