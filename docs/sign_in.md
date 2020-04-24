# Sign in

Used to collect a Token for a registered User.

**URL** : `POST api.the-mesto.tk/signin`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "email": "[valid email address]",
    "password": "[password in plain text]"
}
```

**Data example**

```json
{
    "email": "test@example.com",
    "password": "12345678"
}
```

## Success Response

**Code** : `200 OK`

**Headers**  
Sends the token in response header:  
`Set-Cookie: jwt=ey2bGciOfas1UzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWvcxwrOTMzNjkxMDUzYWUyZTQzZTIiLCJpYXQiOjE1ODc3NTk4ODAsImV4cCI6MTU4ODM2NDY4MH0.1MUnSEuc0TlBD_Ovcxre2VRrWREC_-5J2xWBvNXjKU9Y_A; Max-Age=604800; Path=/; Expires=Fri, 01 May 2020 20:24:40 GMT; HttpOnly; SameSite=Strict  
`

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `401 Unathorized`

**Content** :

```json
{
    "message": "Неправильные почта или пароль"
}
```
