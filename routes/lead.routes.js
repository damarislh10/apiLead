const express = require("express");
const upload = require("../utils/handleStorage");
const uploads = require("../utils/handleStorage");
const routes = express.Router();
const leadApi = require("../controllers/lead");

// routes.get("/file-upload/", leadApi.uploadCsv);
routes.post("/file-upload/", leadApi.uploadFileLead);
routes.post('/file-csv/', uploads, leadApi.uploadFileCSV);


module.exports = routes;

