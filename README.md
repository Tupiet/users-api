# Users API
This is a small project aiming to create a fully and basic API for managing users. 
The principal objective is to learn new abilities, as well to provide a custom API for doing some hobby projects.

## Usage
In order to use this API, you have to clone this repository locally, install all dependencies and start the project. Because this is written in TypeScript, you'll also need to compile the code.

The first time, you'll have to execute this:

```bash
git clone https://github.com/Tupiet/users-api.git
cd users-api
cp .env.example .env
npm i
npx prisma db push
npm run watch
npm run dev
```

If you just want to start the project, you'll need to run this:

```bash
npm run watch
npm run dev
```
