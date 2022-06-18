# College Event Management App

A simple application for management of the events hosted by the it. Built with node.js, Express and MongoDB.

## Run Locally

Clone the project

```bash
  git clone https://github.com/rohithrohith/college-event-management-app
```

Go to the project directory

```bash
  cd "Alive-College Event Management App"
```

Install dependencies

```bash
  npm install
  cd frontend
  npm install
```

Start the server

```bash
  npm run server
```

Start frontend

```bash
  npm run client
```

## Run app

```bash
  npm run start
```

## Running Tests

To run tests scripts, run the following command

```bash
  npm run test
```

To run web automation test case, run the following command

```bash
  node automateTest
```

or

```bash

node automateTest.js
```

## API Reference

All the endpoints need Access key except

```http
POST /api/users/
```

```http
POST /api/users/login
```

```http
POST /api/students/
```

```http
POST /api/students/login
```

## Endpoints

### /api/events/ (Events routes)

#### Create event (ADMIN access required)

```http
  POST /api/events/
```

User with ADMIN access can access this route

##### Sample response

```
{
            "thumbnail": {
                "data": {
                    "type": "Buffer",
                    "data": [
                        255,
                        216,
                        255,...]
                }
            }
            "contentType": "image/jpeg",
                "name": "1655408970810.jpg"
            },
            "_id": "62ab894ae9c709df45f7e73c",
            "title": "First event title",
            "description": "Lorem ipsum dolor sit amet....",
            "participants": {
                "total": 1,
                "CSE": 1,
                "ISE": 0,
                "ECE": 0,
                "ME": 0,
                "AE": 0,
                "MT": 0,
                "EEE": 0,
                "AI/ML": 0,
                "CIV": 0
            },
            "lastDate": "2022-06-17T00:00:00.000Z",
            "eventOn": "2022-06-30T00:00:00.000Z",
            "createdAt": "2022-06-16T19:49:30.915Z",
            "updatedAt": "2022-06-16T20:26:11.798Z",
            "__v": 0
        }
```

#### Get all events

```http
  GET /api/events
```

##### Sample response

```
{
    "events": [
        {
            "thumbnail": {
                "data": {
                    "type": "Buffer",
                    "data": [
                        255,
                        216,
                        255,...]
                }
            }
            "contentType": "image/jpeg",
                "name": "1655408970810.jpg"
            },
            "_id": "62ab894ae9c709df45f7e73c",
            "title": "First event title",
            "description": "Lorem ipsum dolor sit amet....",
            "participants": {
                "total": 1,
                "CSE": 1,
                "ISE": 0,
                "ECE": 0,
                "ME": 0,
                "AE": 0,
                "MT": 0,
                "EEE": 0,
                "AI/ML": 0,
                "CIV": 0
            },
            "lastDate": "2022-06-17T00:00:00.000Z",
            "eventOn": "2022-06-30T00:00:00.000Z",
            "createdAt": "2022-06-16T19:49:30.915Z",
            "updatedAt": "2022-06-16T20:26:11.798Z",
            "__v": 0
        }
    ]
}
```

#### Get a single event

```http
  GET /api/events/${id}
```

| Params | Type     | Description                        |
| :----- | :------- | :--------------------------------- |
| `id`   | `string` | **Required**. Id of event to fetch |

##### Sample response

```
{
            "thumbnail": {
                "data": {
                    "type": "Buffer",
                    "data": [
                        255,
                        216,
                        255,...]
                }
            }
            "contentType": "image/jpeg",
                "name": "1655408970810.jpg"
            },
            "_id": "62ab894ae9c709df45f7e73c",
            "title": "First event title",
            "description": "Lorem ipsum dolor sit amet....",
            "participants": {
                "total": 1,
                "CSE": 1,
                "ISE": 0,
                "ECE": 0,
                "ME": 0,
                "AE": 0,
                "MT": 0,
                "EEE": 0,
                "AI/ML": 0,
                "CIV": 0
            },
            "lastDate": "2022-06-17T00:00:00.000Z",
            "eventOn": "2022-06-30T00:00:00.000Z",
            "createdAt": "2022-06-16T19:49:30.915Z",
            "updatedAt": "2022-06-16T20:26:11.798Z",
            "__v": 0
        }
```

#### Update a event (ADMIN access required)

```http
  PUT /api/events/${id}
```

| Params | Type     | Description                         |
| :----- | :------- | :---------------------------------- |
| `id`   | `string` | **Required**. Id of event to update |

##### Sample response (Updated event)

```
{
            "thumbnail": {
                "data": {
                    "type": "Buffer",
                    "data": [
                        255,
                        216,
                        255,...]
                }
            }
            "contentType": "image/jpeg",
                "name": "1655408970810.jpg"
            },
            "_id": "62ab894ae9c709df45f7e73c",
            "title": "First event title",
            "description": "Lorem ipsum dolor sit amet....",
            "participants": {
                "total": 1,
                "CSE": 1,
                "ISE": 0,
                "ECE": 0,
                "ME": 0,
                "AE": 0,
                "MT": 0,
                "EEE": 0,
                "AI/ML": 0,
                "CIV": 0
            },
            "lastDate": "2022-06-17T00:00:00.000Z",
            "eventOn": "2022-06-30T00:00:00.000Z",
            "createdAt": "2022-06-16T19:49:30.915Z",
            "updatedAt": "2022-06-16T20:26:11.798Z",
            "__v": 0
        }
```

#### Participate (Only for students)

```http
  POST /api/events/participate
```

##### Sample response

```
{
    _id: new ObjectId("62ab91e360a0e447c37b8f10"),
    eventId: new ObjectId("62ab894ae9c709df45f7e73c"),
    userId: new ObjectId("62ab788b1d17a943dfaa9042"),
    eventOn: 2022-06-30T00:00:00.000Z,
    __v: 0
  }
```

## /api/students/ (Student routes)

#### For student registration

```http
  POST /api/students/

    Request body has Name,E-mail,Password and Branch,
```

#### For student login

```http
  POST /api/students/login

     Request body has Name,E-mail, returns Access token.
```

#### Participate (MODERATOR access required)

```http
  GET /api/students/branch/${id}

    To get the all the students in a particular branch
```

#### Verify E-mail

```http
  GET /api/students/branch/${email}

    Verify the student E-mail
```

| Params  | Type     | Description                       |
| :------ | :------- | :-------------------------------- |
| `email` | `string` | **Required**. E-mail ID to update |

#### Send OTP

```http
  POST /api/students/otp

    Send otp, and stores it in the database
```

#### Approve or reject student (MODERATOR access needed)

```http
  PUT /api/students/approve/${id}
  DELETE /api/students/reject/${id}

  Approve or reject a student registered.
```

| Params | Type     | Description                                   |
| :----- | :------- | :-------------------------------------------- |
| `id`   | `string` | **Required**. Student ID to approve or reject |

## /api/users/ (Users or Moderators routes)

#### Create user (ADMIN access required)

```http
  POST /api/users/

  To create moderator for each branch.
```

#### Create user (ADMIN access required)

```http
  POST /api/users/login

  For moderator login
```

## Genaral route

```http
  GET /api/users/profile

  To get profile of either MODERATOR or ADMIN or Student
```

## Dependencies

```
express
bcryptjs
nodemailer
multer
mongoose
jsonwebtoken
express-async-handler
dotenv
```

## Dev dependencies

```
nodemon
concurrently
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV`
`PORT`
`MONGODB_URI`
`JWT_SECRET`
`EMAIL_PASS`
`FROM_EMAIL`

## License

[MIT](https://choosealicense.com/licenses/mit/)
