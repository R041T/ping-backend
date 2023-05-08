<div align="center">
  <h1>Ping - Chat App</h1>
  <a href="https://github.com/R041T/ping-client"><img src="https://img.shields.io/static/v1?label=Repo&message=Client Side&color=blue" /></a>
  <br />
  <h3>Built using</h3>
  <a href="https://nodejs.org/en"><img src="https://img.shields.io/static/v1?label=&message=Node.js&color=green" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/static/v1?label=&message=Typescript&color=blue" /></a>
  <a href="https://www.postgresql.org/"><img src="https://img.shields.io/static/v1?label=&message=PostgreSQL&color=lightblue" /></a>
  <a href="https://aws.amazon.com/"><img src="https://img.shields.io/static/v1?label=&message=Amazon Web Services&color=orange" /></a>
  <a href="https://socket.io/"><img src="https://img.shields.io/static/v1?label=&message=Socket.io&color=gray" /></a>
</div>

## What is Ping?

Ping is a Chat application that has these basic features:

- [**Google Authentication**]: Easy sign in using your Google Account. This is done using firebase authentication.
- [**Search for friends**]: You can search for all your friends and family who have signed up with Ping.
- [**Live messaging**]: Chat in realtime with those online.

## How does Ping work

- Real time communiction is acheived using websockets. This is managed using Socket.io, a library that enables bi-directional communication.
- The data is persisted using PostgreSQL, an open source Relational database.

## Getting started

**Install the required packages**
```ts
npm install
```

</br>

**Setup Database**

**<h4>Option 1 - Create your own database locally </h4>**

**<h4>Option 2 - Use PostgreSQL docker image with a volume to persist data </h4>**

</br>

**Migrate Database Tables**

```ts
npx prisma generate
npx prisma migrate dev --name init
```

## Hosting

**<h4>Option 1 - Build and Host code directly on preferred cloud service</h4>**

**<h4>Option 2 - Dockerize and host container</h4>**

</br>

**<h4>Environment Variable template</h4>**

```ts

#Client Information

CLIENT_HOST=

#Prisma Connection URL

DATABASE_URL=


#DATABASE Connection

DB_USER=
DB_PORT=
DB_PASS=

#PORTS

PORT=
SOCKET_PORT=

```


## Setup CI/CD on AWS
**<h4>Using buildspec.yml file</h4>**

**<h4>Use AWS Code build, Code pipeline & Code Deploy to setup CI/CD</h4>**


## Todo

- **Read Receipts**
- **Online Status**
- **File sending**
- **Message Encryption**
