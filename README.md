

# UriGames

## [See the App!](https://urigames.netlify.app)

![App Logo](./src/assets/images/logo-page.png)

## Descripción

**NOTA -** UriGames es una base de datos de juegos de mesa donde puedes almacenar tus propios juegos, vrearlos y añadirlos a tu colecció de favoritos.
#### [Repositorio del Clientee](https://github.com/RoigOriol/Urigames-client.git)
#### [Repositorio del Servidor](https://github.com/RoigOriol/Urigames-server.git)

## Backlog Functionalities

**Tecnologías**
- HTML
- CSS
- Javascript
- React
- React-router-dom
- Node

**Librerías**
- React Bootstrap


# Server Structure

## Models

User model


  {
    username: {
      type: String,
      required: [true, "Username is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },

    gameCollection: {
      type: [Schema.Types.ObjectId],
      ref: "Game",
    },

    favorites: {
      type: Schema.Types.ObjectId,
      ref: "Game",
    },

    friends: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    userImg: {
      type: String,
    },
```

Game model

 {
    title: {
      type: String,
      required: true,
    },
    designer: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: [
        "Abstract Strategy",
        "Card Game",
        "Children's Game",
        "Dice",
        "Fantasy",
        "Party Game",
        "Puzzle",
        "Science Fiction",
        "Strategy",
        "Tile Placement",
      ],
      required: true,
    },
    minPlayers: {
      type: Number,
      required: true,
    },
    maxPlayers: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    playTime: {
      type: Number,
      required: false,
    },
```

## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                    |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | -------------------------------------------------------------- |
| POST        | `/auth/signup`              | {name, email, password}      | 201            | 400          | Registers the user in the Database                             |
| POST        | `/auth/login`               | {username, password}         | 200            | 400          | Validates credentials, creates and sends Token                 |
| GET         | `/auth/verify`              |                              | 200            | 401          | Verifies the user Token                                        |
| GET         | `/game`                     |                              | 200            | 400          | Show games in the DB, only titles and images                   |
| POST        | `/game`                     | {apiId}                      | 201            | 400          | Creates a new Game Document                                    |
| GET         | `/game/:gameId`             |                              | 200            | 400, 401     | Sends all game Details                                         |
| PUT         | `/game/:gameId`             |                              | 200            | 400, 401     | Edits game document                                            |
| DELETE      | `/game/:gameId`             |                              | 200            | 401          | Deletes game document                                          |
| GET         | `/profile`                  |                              | 200            | 401          | Sends user profile details                                     |
| PUT         | `/profile`                  |                              | 200            | 400, 401     | Edits the user profile                                         |
| PATCH       | `/profile/:gameId`          |                              | 200            | 401          | Adds game to favourite                                         |
| GET         | `/gameApi`                  |                              | 200            | 401          | Gets game data from API (Search)                               |
| GET         | `/gameApi/:apiId`           |                              | 200            | 401          | Gets game details from API                                     |
  
## Links

### Creador

[Oriol Roig](https://github.com/RoigOriol)

### Project

[Repository Link Client](https://github.com/RoigOriol/Urigames-client.git)

[Repository Link Server](https://github.com/RoigOriol/Urigames-server.git)

[Deploy Link](https://urigames.netlify.app)


### Slides

[Slides Link]()