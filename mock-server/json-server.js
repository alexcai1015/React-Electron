const fs = require('fs');

const express = require('express');
const cors = require('cors');
const Keycloak = require('keycloak-connect');
const dotenv = require('dotenv');

const keycloakConfig = require('./keycloak-dev.json');

const server = express();
dotenv.config();
const keycloak = new Keycloak({}, keycloakConfig);

// server configurations
const RP_API_KEY = process.env.REACT_APP_API_KEY || 'XXX';
const BASEPATH = '/api/v1';
const PORT = process.env.REACT_APP_MOCK_SERVER_PORT || 3001;
const ENABLE_AUTH_CHECK = true;
const CORS_ORIGIN = process.env.REACT_APP_BASE_URL;

function validateSession(authString) {
  const auth = authString.replace(/bearer /i, '');
  return keycloak.grantManager.validateAccessToken(auth);
}

function validateRpApikey(authString) {
  return RP_API_KEY === authString;
}

function authenticateRequest(req, res, next) {
  if (ENABLE_AUTH_CHECK === false) {
    return next();
  }

  const authString = req.get('authorization');
  const rpApiKey = req.get('rp-api-key');

  if (validateRpApikey(rpApiKey) === false) {
    return res.send(401).end();
  }

  return validateSession(authString)
    .then(() => {
      return next();
    })
    .catch(() => {
      return res.send(401).end();
    });
}

const customRouter = express.Router();

customRouter.get(`${BASEPATH}/users/:erwinatuli/apor-types`, (req, res) => {
  res.json(['AB', 'CD']);
});

customRouter.get(`${BASEPATH}/users//apor-types`, (req, res) => {
  res.json(['AB', 'CD']);
});

// modify the default response
customRouter.get(`${BASEPATH}/registry/access-passes`, (req, res) => {
  const accessPasses = JSON.parse(fs.readFileSync(`${__dirname}/db.json`).toString());
  console.log(accessPasses);

  res.send({
    currentPage: 0,
    currentPageRows: 15,
    totalPages: 1,
    totalRows: 15,
    hasNext: true,
    hasPrevious: false,
    rapidPassList: accessPasses['access-passes'],
    firstPage: true,
    lastPage: false,
  });
});

server.use(
  cors({
    credentials: true,
    origin: CORS_ORIGIN,
  })
);

server.use(authenticateRequest);
server.use(customRouter);

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
