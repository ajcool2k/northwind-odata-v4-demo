# Simple Northwind OData V4 Server

Based on: demo project for odata-v4-server.

- Uses odata-v4 server
- Uses typedServer to generate controls of model entities
- Uses SQLite3 database of Northwind (older version)

## Usage

**Install**

```bash
$ npm install
```

**Production**

```bash
$ npm run build
$ npm start:prod
```

**Development**

To speed-up development, the `nodemon` package is used to automatically rebuild and restart the server when certain files change.

Directories being watched: ./src, ./conf
Extensions being watched: ts, json, config.js

```bash
$ npm install
$ npm start
```
## Data

- upon start, `initial.sqlite` is copied as `current.sqlite` file.
- `initial.sqlite` should not be modified (!)
- `current.sqlite` is used during runtime and can be deleted we want to reset the database
## Links

[OData-Demo-Project](https://github.com/Soontao/odata-v4-server-demo) (fork of [jaystack/odata-v4-server](https://github.com/jaystack/odata-v4-server))

[OData-Server-Implementation](https://github.com/Soontao/odata-v4-server)