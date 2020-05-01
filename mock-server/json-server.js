const jsonServer = require('json-server');
const { Router } = require('express');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// server configurations
const RP_API_KEY = 'XXXX';
const BASEPATH = '/api/v1';
const PORT = 3001;
const privateRoutes = ['/api/v1/registry/access-passes'];

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
  const authString = req.get('authorization');
  const rpApiKey = req.get('rp-api-key');

  // remove all private routes that don't match
  // or are properly authenticated
  const remaining = privateRoutes.filter((privateRoute) => {
    if (req.path.startsWith(privateRoute)) {
      console.log(`running auth for ${req.path}`);

      if (!authString || !rpApiKey) {
        return false;
      }

      return !(validateSession(authString) && validateRpApikey(rpApiKey));
    }

    // remove this from our list
    return false;
  });

  if (remaining.length > 0) {
    return res.send(401).end();
  }

  return next();
}

const customRouter = new Router();

// override authentication
customRouter.post(`${BASEPATH}/users/auth`, (req, res) => {
  currentSession = generateSession();

  res.json({
    accessCode: currentSession,
  });
});

// customRouter.get(`${BASEPATH}/registry/access-passes`, (req, res, next) => {
//   const request = req;
//   const auth = request.get('authorization');

//   if (validateSession(auth) === false) {

//     return res.end();
//   }

//   return next();
// });

// modify the default response
router.render = (req, res) => {
  res.jsonp({
    currentPage: 0,
    currentPageRows: 15,
    totalPages: 1,
    totalRows: 15,
    hasNext: true,
    hasPrevious: false,
    rapidPassList: res.locals.data,
    firstPage: true,
    lastPage: false,
  });
};

// use a different Id
router.db._.id = 'referenceId';

// console.log("id", router.db._.id);

server.use(
  jsonServer.rewriter({
    // '/access-passes/:id': '/access-passes?',
  })
);

server.use(cors());
server.use(authenticateRequest);
server.use(customRouter);
server.use(`${BASEPATH}/registry`, router);
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(router);

server.listen(PORT, () => {
  console.log(`SON Server is running on port ${PORT}`);
});

