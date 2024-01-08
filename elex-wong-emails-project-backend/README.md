# Emails.com API backend
## Dev environment setup (front end)

- Clone the repo
- npm i -D
- npx prisma db push (to create the initial mysql database from the prisma schema)
- npm start
## About Prisma

Prisma is used as ORM (higher level database object manipulation) over our mysql database.

INFO: multiple prisma in one app: https://zach.codes/multiple-prisma-clients-one-app/

### How does prisma work?
- The schema is used only during dev, used by the prisma CLI to generate temporary typescript types in node_modules
- Those types are used to provide definitions for our ORM models and then by the typescript compiler

### Useful commands:

- Create typescript types from a scheme: npx prisma generate
- Create mysql tables from the schema: npx prisma db push
- Create a schema from an existing datbase: npx prisma db pull
- Create a migration to reflect schema changes into an existing database: npm prisma migrate dev

### Typical prisma flow:

In development, use npx prisma db push to push temporary schema changes to mysql and make sure everything works.
When everything is ok, run npx prisma migrate dev to create the diff between the previous database format and the new one.

## Development SMTP server

- docker run --rm -it -p 3000:80 -p 2525:25 rnwood/smtp4dev
- Open http://localhost:3000 for the web UI
- Send emails to SMTP on localhost port 2525
## Deployment
### Very first time
- npm i -g pm2
- npx prisma db push --schema prisma/main-schema/schema.prisma   # To create the initial mysql tables

### Regular upgrade
- npm run stop-prod (or: npm run stop-staging)
- git pull
- npm i -D
- cd prisma/main-schema
- npx prisma migrate deploy
- cd ../..
- npm run start-prod (or: npm run start-staging)

### To view logs

- pm2 status
- pm2 logs emails-com-backend-prod

### To stop the server

- npm run stop-prod (or: npm run stop-staging)

