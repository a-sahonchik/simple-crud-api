# CRUD API

---

## How to install

```bash
# clone repository, checkout to development branch
git clone git@github.com:a-sahonchik/simple-crud-api.git

git checkout development

# install dependencies
npm install
```

**!!! Copy `.env.example` to `.env` !!!**

```bash
cp .env.example .env
```

---

## How to run

By default, app will run on `4000` port, and if you need, you can change port value by updating `APP_PORT` in `.env` file.

App is available on http://localhost:4000/api

* ### In development mode

   ```bash
   npm run start:dev
   ```

* ### In production mode

   ```bash
   npm run start:prod
   ```

* ### In multi mode with Load Balancer

   ```bash
   npm run start:multi
   ```

---

## How to test

   ```bash
   npm run test
   ```

---

## How to lint

* ### To analyze code without fixing

   ```bash
   npm run lint
   ```

* ### To analyze code and fix all possible errors

   ```bash
   npm run lint:fix
   ```
  
---

## Postman collection

You can find Postman collection with all needed endpoints and cases in `./postman_collection.json` file. Feel free to use it for testing the application.
