# sing-me-a-song

Este projeto é um aplicativo full stack que permite ao usuário criar e interagir anonimamente com recomendações de música dentro do aplicativo.

<div align='center'>
  <img style='ustify-content: center' src='/sing-me-a-song.gif' />
</div>

## Sobre

As principais funcionalidades deste aplicativo são:

- Crie uma recomendação de música
- Dê um upvote e um downvote em uma recomendação de música
- Veja as últimas 10 recomendações
- Veja as 10 principais recomendações
- Veja uma recomendação aleatória

## Por quê?

Este aplicativo foi criado para desenvolver meus novos conhecimentos sobre testes automatizados, portanto o aplicativo é totalmente coberto por testes e2e, testes de integração e testes unitários.

## Tecnologias

As seguintes ferramentas e frameworks foram usados na construção do projeto:<br>

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

1. Clone esse repositório

2. Instale as dependências
```bash
npm i
```
3. Adicione variáveis de ambiente para servidor e banco de dados como no .env.example

4. Crie o banco de dados com:
```bash
npx prisma init
npx prisma migrate dev
```

5. Rode a aplicação com:
```bash
npm run dev (backend)
npm start (frontend)
```
6. Por fim, acesse http://localhost:3000 em seu navegador favorito
