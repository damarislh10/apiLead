// exports.uploadFileLead = (req, res) => {
//     res.sendFile(__dirname + '/index.html')

//   };

// leer json y agregar a BD
// const csv = require("csv-parser");
const fs = require("fs");
const csv = require("fast-csv");

exports.uploadFileLead = (req, res) => {
  if (req.files) {
    let file = req.files.file;
    let filename = file.name;
    let data = req.files.file.data.toString();

    file.mv(__dirname + "/uploads/" + filename, (err) => {
      if (err) throw err;
      else {
        let dataJson = JSON.parse(data);
        req.getConnection((err, conn) => {
          if (err) return res.send(err);
          conn.query(
            "INSERT INTO api (nombres ,apellidos ,cedula ,ciudad ,email ,tipo_tel ,telefono) VALUES ?",
            [
              dataJson.map((item) => [
                item.nombres,
                item.apellidos,
                item.cedula,
                item.ciudad,
                item.email,
                item.tipo_tel,
                item.telefono,
              ]),
            ],
            (err, rows) => {
              console.log(
                err ? "Err INSERT INTO api " + err : "Api" + " Added!"
              );
              res.send(dataJson);
            }
          );
          fs.unlinkSync(__dirname + "/uploads/" + filename)
        });
      }
    });
  }
};



exports.uploadFileCSV = (req, res) => {
  let file = req.files.file;
  let filename = file.name;
  try{
      const customers = [];
    file.mv(__dirname + "/uploads/" + filename, (err) => {
      fs.createReadStream(__dirname + "/uploads/" + filename)
      .pipe(csv.parse({ headers: true, delimiter: ';', encoding: 'binary', }))
      .on('error', error => {
          console.error(error);
          throw error.message;
      })
      .on('data', row => {
          customers.push(row);

      })
      .on('end', () => {
        req.getConnection((err, conn) => {
          console.log(customers)
          if (err) return res.send(err);
          conn.query(
            "INSERT INTO api (nombres ,apellidos ,cedula ,ciudad ,email ,tipo_tel ,telefono) VALUES ?",
            [
              customers.map((item) => [
                item.nombres,
                item.apellidos,
                item.cedula,
                item.ciudad,
                item.email,
                item.tipo_tel,
                item.telefono,
              ]),
            ],
            (err, rows) => {

              const result = {
                status: "ok",
                filename: filename,
                message: "Upload Successfully!",
            }
              console.log(
                err ? "Err INSERT INTO api " + err : "Api" + " Added! "
              );
           
            res.json(result);
            }
          );
        });
          // Save customers to MySQL database
          fs.unlinkSync(__dirname + "/uploads/" + filename)
            
      });
    
    })

  }catch(error){
      const result = {
          status: "fail",
          filename: filename,
          message: "Upload Error! message = " + error.message
      }
      res.json(result);
  }
}