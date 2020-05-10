# Welcome to rapidpass-dashboard 👋

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)

> The RapidPass Approver Dashboard allows authorized government agency personnel to upload pre-approved applicants and approve or deny RapidPass applicants who registered via the RapidPass.ph website.

### 🏠 [Homepage](https://rapidpass-approver.azurewebsites.net)

## Install

```sh
npm install
```

## Development

Load environment variables

```sh
$ cp .env.example .env
```

### __* Initialize Keycloak server__
Start up a new Keycloak local instance with Rapidpass defaults.
```bash
$ npm run setup:dev
```
Will be available at http://localhost:8082/ with a default Rapidpass Realm pre-loaded.
No users are included by default.

### __* Create users__
- Go to http://localhost:8082/auth/admin/
- Login with default credentials: **admin** / **admin**
- Select __"Rapidpass"__ realm. Go to Users > Add User > and setup users for each group.
- Remember to seta password by selecting the new user, going to __Credentials__ tab and setting a password.
- Assign privileges by assigning a group in the __Groups__ tab.

### __* Initialize the mock server__
For the **account** Client, an initial secret is auto-imported in rapidpass-realm.dev.json: `aa777510-7116-4e8e-a5e8-200fe2374a08`.

TROUBLESHOOTING: If you need to replace it:

- from Keycloak, go to the Rapidpass realm, select **Clients > `account`**
- go to the credentials tab, click on `Regenerate secret`
- Copy the new secret.
- Edit /mock-server/keycloak-dev.json > crendetials > secret with your new value.

### __* Start the application__
Note: your Keycloack instance should already be up before doing this.

```bash
$ npm run start:dev
```

- **API**: http://localhost:3001/api
- **Dashboard**: http://localhost:3000

Login with your created user. Start developing as normal!



_____

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://gitlab.com/dctx/rapidpass/rapidpass-dashboard/-/issues).
