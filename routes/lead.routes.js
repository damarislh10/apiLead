const express = require("express");
const uploads = require("../utils/handleStorage");
const routes = express.Router();
const leadApi = require("../controllers/lead");

// routes.get("/file-upload/", leadApi.uploadCsv);
routes.post("/file-upload/", leadApi.uploadFileLead);
routes.post('/file-csv/', uploads, leadApi.uploadFileCSV);
routes.post("/file-manual/:tabla", leadApi.uploadManual);
routes.get("/consultLead/:tabla", leadApi.ConsultLeads);
routes.put("/updateLead/:tabla/:name/:value", leadApi.updateLead);


module.exports = routes;

