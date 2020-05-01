const fs = require('fs');

const express = require('express');
const cors = require('cors');

const server = express();

// server configurations
const RP_API_KEY = 'XXXX';
const BASEPATH = '/api/v1';
const PORT = 3001;
const ENABLE_AUTH_CHECK = false;
const CORS_ORIGIN = 'http://localhost:3000';

let currentSession = '';

function generateSession() {
  return new Date().getTime();
}

function validateSession(authString) {
  return authString && `bearer ${currentSession}` === authString.toLowerCase();
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

  if (validateSession(authString) && validateRpApikey(rpApiKey)) {
    return next();
  }

  return res.send(401).end();
}

const customRouter = express.Router();

customRouter.get(`${BASEPATH}/users/:erwinatuli/apor-types`, (req, res) => {
  currentSession = generateSession();

  res.json(['AB', 'CD']);
});

customRouter.get(`${BASEPATH}/users//apor-types`, (req, res) => {
  currentSession = generateSession();

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

