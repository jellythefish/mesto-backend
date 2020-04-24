# Backend for Mesto web-application.

## This backend implements the following REST API: 

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

