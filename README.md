# sing-me-a-song

This project is a full stack application that allows a user to anonymously create and interact with music recommendations within the application.

<div align='center'>
  <img style='ustify-content: center' src='/sing-me-a-song.gif' />
</div>

## About

The main features of this application are:

- Create a music recommendation
- Upvote and downvote a music recommendation
- See the last 10 recommendations
- See the top 10 recommendations
- See a random recommendation

## Why?

This application was created to develop my new knowledge about automated tests, therefore the application is fully covered by e2e tests, integration tests and unit tests.

## Technologies

The following tools and frameworks were used in the construction of the project:<br>

  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
  ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
  ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
  ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
  ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
  ![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
  ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

## How to run

1. Clone this repository

2. Install dependencies
```bash
npm i
```
3. Add environment variables for server and database like in dotenv example

4. Create the database with
```bash
npx prisma init
npx prisma migrate dev
```

5. Run the application with
```bash
npm run dev (backend)
npm start (frontend)
```
6. Finally, access http://localhost:3000 on your favorite browser
