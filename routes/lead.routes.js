const express = require("express");
const routes = express.Router();
const leadApi = require("../controllers/lead");

// routes.get("/file-upload/", leadApi.uploadFileLead);
routes.post("/file-upload/", leadApi.uploadFileLead);

module.exports = routes;

