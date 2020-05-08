# Welcome to rapidpass-dashboard 👋

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)

> The RapidPass Approver Dashboard allows authorized government agency personnel to upload pre-approved applicants and approve or deny RapidPass applicants who registered via the RapidPass.ph website.

### 🏠 [Homepage](https://rapidpass-approver.azurewebsites.net)

## Install

```sh
npm install
```

## Usage

Load environment variables

```sh
cp .env.example .env
```

Initialize keycloak server

```
docker-compose up
```

- go to http://localhost:8082/
- add realm, import file `mock-server/rapidpass-realm.json`

Initialize the mock server

- from keycloak, go to the rapidpass realm, select clients, select `account`
- go to the credentials tab, click on `Regenerate secret`
- go to installation tab, select OIDC JSON
- create file `mock-server/keycloak.json` with contents from the OIDC JSON

Start the application

```sh
npm run start:mock-serrver
npm run start
```

## Run tests

```sh
npm run test
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://gitlab.com/dctx/rapidpass/rapidpass-dashboard/-/issues).
