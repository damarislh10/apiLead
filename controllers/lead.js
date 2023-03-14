// exports.uploadFileLead = (req, res) => {
//     res.sendFile(__dirname + '/index.html')

//   };

// leer json y agregar a BD
// const csv = require("csv-parser");
const fs = require("fs");
const csv = require("fast-csv");
const { resultS, resultE } = require("../messages/lead.messages");

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
              const result = {
                codigo: 0,
                filename: filename,
                respuesta: "Success",
            }
              console.log(
                err ? resultE + err : resultS 
              );
              res.json( err ? resultE + err : resultS);
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
              console.log(
                err ? resultE + err : resultS 
              );
              res.json( err ? resultE + err : resultS);
            }
          );
        });
          // Save customers to MySQL database
          fs.unlinkSync(__dirname + "/uploads/" + filename)
            
      });
    
    })

  }catch(error){
      res.json(resultE);
  }
}


exports.uploadManual = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "INSERT INTO " + req.params.tabla + " set ?",
      [req.body],
      (err, rows) => {
        console.log(
          err ? resultE + err : resultS 
        );
        res.json( err ? resultE + err : resultS);
      }
    );
  });
};


exports.ConsultLeads = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "SELECT * FROM " +
      req.params.tabla ,
      (err, result) => {
        console.log(
          result.length == 0
            ? 
            err
            :
            " results: " +
            result.length
        );

        console.log(
          err ? resultE + err : resultS 
        );
        res.json(result);
      }
    );
  });
};


exports.updateLead = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "UPDATE " + req.params.tabla + " set ? WHERE " + req.params.name + " = ?",
      [req.body, req.params.value],
      (err, result) => {
        console.log(
          err
            ?
            err
            : "Actualizado!"
        );

        console.log(
          err ? resultE + err : resultS 
        );
        res.json( err ? resultE + err : resultS);
      }
    );
  });
};