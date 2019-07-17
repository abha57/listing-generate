
const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();


const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const AWS_CONFIG = require('./rootkey');

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: AWS_CONFIG.AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_CONFIG.AWS_SECRET_ACCESS_KEY
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// auth0 constant
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-0hv1j59o.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'jiPMgU2SF4U00TDa1WGfJKkMqC0msnz3',
  issuer: `dev-0hv1j59o.auth0.com`,
  algorithms: ['RS256']
});

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: AWS_CONFIG.BUCKET_NAME,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

// this is our MongoDB database
// const dbRoute = 'mongodb+srv://apaar_bhatnagar:%40apaar256%40@cluster0-krijc.mongodb.net/test?retryWrites=true&w=majority';

// connects our back end code with the database
// mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

 // db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  return res.json({ success: true, data: 'found the data' });
  // Data.find((err, data) => {
  //   if (err) return res.json({ success: false, error: err });
  //   return res.json({ success: true, data: data });
  // });
});

// this is our update method
// this method overwrites existing data in our database
// router.post('/uploadFiles', (req, res) => {
//   console.log('requ', req.body);
//   const { files } = req.body;
//   return res.json({ success: true });
//   // Data.findByIdAndUpdate(id, update, (err) => {
//   //   if (err) return res.json({ success: false, error: err });
//   //   return res.json({ success: true });
//   // });
// });

router.post('/uploadFiles', checkJwt, (request, response) => {
  console.log('in uppload', files);
  const form = new multiparty.Form();
    // form.parse(request, async (error, fields, files) => {
    //   console.log('files----->>>', files);
    //   console.log('fields----->>>', fields);
    //   if (error) throw new Error(error);
    //   try {
    //     const path = files.file[0].path;
    //     const buffer = fs.readFileSync(path);
    //     const type = fileType(buffer);
    //     const timestamp = Date.now().toString();
    //     const fileName = `bucketFolder/${timestamp}-lg`;
    //     const data = await uploadFile(buffer, fileName, type);
    //     console.log('data====>>', data);
    //     return response.status(200).send(data);
    //   } catch (error) {
    //     console.log('errro====>>', error);
    //     return response.status(400).send(error);
    //   }
    // });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.message = message;
  data.id = id;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));