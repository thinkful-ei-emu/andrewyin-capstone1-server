# 5e Stuff

## Summary
5e Stuff is meant to be a lightweight application that helps Dungeons and Dragons 5e players keep track of their characters. The app will not autofill any information from the books, so the user is responsible to filling in any information of their character on their own. This functionality may be added at a later date. At the moment, the app only keeps track of crucial details such as character name, class, race and ability scores. A future update will add class feature and ability, equipment, and spell sections.

## API Documentation

`/api/auth/login`
* POST -> receives a jwt and verifies the validity of the token

`/api/characters`
* GET -> responds with an array containing all characters belonging to the requesting user

`/api/characters/:character_id`
* GET -> responds with the character object of the matching character_id

`/api/character/create`
* POST -> receives a character object and adds it to the database

## Technology Used
* HTML
* CSS3
* React
* Express
* Node
* Netlify
* Heroku
* Github
* VS Code