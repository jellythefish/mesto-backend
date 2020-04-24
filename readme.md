# Backend for Mesto web-application.

URL: https://the-mesto.tk

## Open Endpoints

Open endpoints require no Authentication.

* [Sign up](docs/sign_up.md) : `POST api.the-mesto.tk/signup`
* [Sign in](docs/sign_in.md) : `POST api.the-mesto.tk/signin`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the Login view above.

### Current User related

Each endpoint manipulates or displays information related to the User whose
Token is provided with the request:

* [Find user by id](docs/user/get_user.md) : `GET api.the-mesto.tk/users/:id`
* [Updating profile info](docs/user/update_info.md) : `PATCH api.the-mesto.tk/users/me`
* [Update profile pic](docs/user/update_pic.md) : `PATCH api.the-mesto.tk/users/me/avatar`


### Card related

Endpoints for viewing and manipulating cards that the Authenticated User
has permissions to access.

* [Get all cards](cards/get_cards.md) : `GET api.the-mesto.tk/cards`
* [Add card](cards/add_card.md) : `POST api.the-mesto.tk/cards`
* [Delete cards](cards/pk/delete_card.md) : `DELETE api.the-mesto.tk/cards/:cardId`
* [Add like to card](cards/pk/put_like.md) : `PUT api.the-mesto.tk/cards/:cardId/likes`
* [Delete like from card](cards/pk/remove_like.md) : `DELETE api.the-mesto.tk/cards/:cardId/likes`

## Installation guide

#### 1. Download the source code:

   ```bash
git clone https://github.com/jellythefish/backend-mesto.git
   ```

#### 2. Install Node.js and MongoDB Community Server:

  1. Node.js: https://nodejs.org/en/download/
  2. MongoDB: https://www.mongodb.com/download-center/community
  
   
#### 3. Create folder for the database (for Windows users):

```bash
cd /C
mkdir -p data/db
```

#### 4.  Run mongod service to serve the database with the command in console:

   ```bash
C:\Program Files\MongoDB\Server\4.2\bin\mongod # (for Windows users)
mongod # (for Mac users)
   ```

#### 5. In console change your current folder to backend-mesto and install node requirements:

   ```bash
cd backend-mesto
npm i
   ```
   
#### 6. Launch the web-server with the command in console: 

```bash
npm run start
```
The localhost server will be launched on localhost:3000. You can successfully send requests to this address.

## TO-DO
- \[ ] дописать документацию для эндпоинтов
