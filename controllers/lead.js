

// exports.uploadFileLead = (req, res) => {
//     res.sendFile(__dirname + '/index.html')

//   };

  exports.uploadFileLead = (req, res) => {
    if(req.files){
        let file = req.files.file;
        let filename = file.name;
        let data = req.files.file.data.toString()
        file.mv(__dirname + '/uploads/'+ filename, (err) => {
            if(err) throw err;
            else {
            let dataJson = JSON.parse(data);
            req.getConnection((err, conn) => {
                if (err) return res.send(err);
                conn.query(
                  "INSERT INTO api (nombreColor, valorHexadec) VALUES ?",
                  [dataJson.map(item => [item.nombreColor, item.valorHexadec])],
                  (err, rows) => {  
                    console.log(
                      err
                        ? "Err INSERT INTO " + err
                        : "api"+ " Added!"
                    );
                    res.send(dataJson);
                  }
                );
              });
           
            }
        }) 
    }
  };    

