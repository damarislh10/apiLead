const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, (path.join(__dirname + "/uploads/")))    
    },
    filename: (req, file, callBack) => {
        console.log(file)
        callBack(null,  path.extname(file.originalname))
    }
})


const upload = multer({storage: storage});
const uploads = upload.single("file");

module.exports = uploads;

