
## Modules

| Auth                        | Last.fm                                                   | Ratings               |
|-----------------------------|-----------------------------------------------------------|-----------------------|
| Registration, login, logout | Fetch song, album, and artist information from Last.fm    | Rating system         |
| JWT access                  | Handle rate limiting, API key, and response normalization | Calculation of rating |


## Entity & Data Flow

### Database (local)


| User     |
|----------|
| id       |
| username |
| email    |
| password |

| Rating                             |
|------------------------------------|
| id                                 |
| userId                             |
| entityType (song / album / artist) |
| entityId (Last.fm ID or name)      |
| score                              |



### External data (Last.fm)

Fetched on-demand from the Last.fm REST API:

#### Artists

#### Albums

#### Tracks

## Endpoints


#### Auth
| Method | Endpoint         | Description              |
| ------ | ---------------- | ------------------------ |
| POST   | `/auth/register` | Register new user        |
| POST   | `/auth/login`    | Login user and get token |
| GET    | `/auth/profile`  | Get logged-in user info  |


#### Last.fm
| Method | Endpoint                       | Description                          |
| ------ | ------------------------------ | ------------------------------------ |
| GET    | `/lastfm/search?query=xxxxx`   | Search for artists, songs, or albums |
| GET    | `/lastfm/artist/:name`         | Get detailed artist info             |
| GET    | `/lastfm/album/:artist/:album` | Get album details and tracklist      |
| GET    | `/lastfm/track/:artist/:track` | Get track info                       |


#### Ratings
| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| POST   | `/ratings/song/:id`  | Rate a song                |
| POST   | `/ratings/album/:id` | Rate an album              |
| GET    | `/ratings/song/:id`  | Get song rating & average  |
| GET    | `/ratings/album/:id` | Get album rating & average |
| GET    | `/ratings/user/:id`  | Get all ratings of user    |


