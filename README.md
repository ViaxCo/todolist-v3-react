# todolist-v3-react

This app lets you create various todo lists with their individual items, built using React and Node.js.

The `main` branch contains the exact project, but it uses [Redux](https://redux.js.org/) instead of the [Context API](https://reactjs.org/docs/context.html) for state management.

## How to use

Clone the project:

```bash
git clone https://github.com/ViaxCo/todolist-v3-react.git
```

Install dependencies:

```bash
npm install && cd client && npm install
```

Create a `.env` file for these environment variables:

```
NODE_ENV=development
DB_USERNAME=
DB_PASSWORD=
DB_HOST=
```

Run the dev server and client concurrently:

```bash
npm i -D concurrently
npm run dev
```

Build out the project for production:

```bash
npm run build && cd client && npm run build
```

The frontend production files would be contained in: "client/build", while the backend files would be in "dist"

## Demo

A live demo of the code can be found here: [Todo List](https://viaxco-todolist-v3-react.herokuapp.com/)
