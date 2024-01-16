# <p style="text-align: center;font-weight: bold;font-size: 24px">Express Local Auth w/ PassportJS</p>

### Welcome to my repo! This repo was made in order for me to learn how to build secure API with the limitation that i will mention [later](#solved-limitations).

## Package Used

- Express 4
- Prisma (ORM)
- ioredis
- Zod
- Passport
- Passport-local
- Csurf
- Helmet
- Jest

## Folder Structure

- `__tests__` contains tests file that could be run using the command `npm test`.
- `@types` contains type declaration for express, or other data.
- `configs` contains configurations required by database or other services.
- `controllers` contains controllers used in routes to handle request and send response to the client.
- `middlewares` contains middlewares responsible for handling specific job such as csrf token checking or validating request body against certain zod schema.
- `routes` contains routes that the express app can use to expose available endpoints that the API has.
- `services` contains reusable functions that can be used by other components.
- `utils` contains reusable variables or functions that can be used by other components, but might not be justifiable to make as a standalone service on its own.

## Getting Started

- ### Clone Repository

```bash
$ git clone https://github.com/dimmmslots/express-passportlocal-boilerplate
```

- ### Go inside the folder

```bash
$ cd express-passportlocal-boilerplate
```

- ### Install packages

```bash
$ npm i
```

- ### Run migrations

```bash
$ npx prisma migrate dev
```

Before running migrations, i suggest you take a brief look at this [section](#solved-limitations).

## Solved Limitations

The very limitations that always existed when developing an API that would be deployed for the public to use is database hosting. Yes there are plenty "free-tier" that i used in the past such as RDS provided by Amazon, but the free tier is supposedly only available for you if you sign up and complete the billing options, which meant you need a credit card in order to use the free-tier.

So i am on the lookout for alternatives ever since (that does not need any credit card to use). And i have found the very thing i wanted in this service(s) that i wanted you guys to know.

### Neon for Postgres & Upstash for Redis

> _Neon is a fully managed serverless Postgres with generous free tier._
>
> -- NeonDB

I have used [NeonDB](https://neon.tech) to solve the limitation with providing my API with postgres database that i could manage. It is as easy as signing up and create your own database, get the connection url and use it on the `.env` file. No billing options required _**(unless you deliberately choose other than free-tier plan)**_. You can try it yourself [here](https://neon.tech).

I also have used [Upstash](https://upstash.com/) to host my redis server. Upstash also provide Kafka service that you might be interested to use on your personal project. I use the redis server in this project to store the session. After signing up and creating your redis server, copy the connection url and slap it into the `.env` file. You can try it [here](https://upstash.com/).

## Testing

To run a test, the command is as follows :

```bash
$ npm test
```
