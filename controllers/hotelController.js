//Este archivo se va a encargar de toda la logica de la aplicacion ( BACKEND )


//--------------- LOGICA --------------------- FUNCIONALIDAD ------------------------


let connection = require('../config/db.js');
//File System
let fs = require('fs');

let hotelController = {};


//Creo un controlador
// este controlador => se encarga de renderizar una vista

//Creo una funcion la cual hace un select de la tabla hotel y el resultado (result)
// lo envia a la vista hotels.ejs

//LIST
hotelController.listHotel = (req, res) => {

    let sql = `SELECT * FROM hotel`;

    connection.query(sql, (err, result) => {
        res.render('hotels', { result });
    })

};

//RENDER FORM NEW HOTEL
hotelController.listFormHotel = (req, res) => {
    res.render('saveHotel')
};


// CREATE HOTEL
hotelController.saveHotel = (req, res) => {
    //recoger los parametros con el req.body
    //crear variable con el insert
    //connection.query para guardar
    console.log(req.body)

    console.log(req.file.filename)

    let name = req.body.name;
    let phone = req.body.phone;
    let adress = req.body.adress;
    let image = req.file.filename;
    let sql = `INSERT INTO hotel (name,adress,phone,image) VALUES ('${name}', '${adress}', ${phone}, '${image}')`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/hotels')

    })
};

//DELETE HOTEL
hotelController.deleteHotel = (req, res) => {
    // Recogemos en los parametros el id y la imagen( nombre de la imagen )
    let idhotel = req.params.idhotel;
    console.log(req.params);
    //elimino  los datos del hotel de la base de datos
    let sql = `DELETE FROM hotel WHERE idhotel = ${idhotel}`;
    connection.query(sql, (err, result) => {
            res.redirect('/hotels')
        })
        //con el metodo unlickSync de la libreria fs (file system) elimino el archivo
    if (req.params.image != undefined) {
        let image = req.params.image;
        // indico la ruta hacia donde esta esa imagen (la imagen X )

        var filePath = `public/images/${image}`;
        fs.unlinkSync(filePath);
    }


};



// hotelController.deleteHotel = (req, res) => {

//     let idhotel = req.params.idhotel;

//     let sql = `SELECT * FROM hotel WHERE idhotel=${idhotel}`;

//     let sql2 = `DELETE FROM hotel WHERE idhotel = ${idhotel}`;

//     connection.query(sql, (err, result) => {

//         let nameImage = result[0].image
//         var filePath = `public/images/${nameImage}`;

//         connection.query(sql2, (err, result) => {
//             res.redirect('/hotels');

//         });

//         fs.unlinkSync(filePath);

//     });

// };
// LIST SINGLE HOTEL
hotelController.viewSingleHotel = (req, res) => {

    let idhotel = req.params.idhotel;

    let sql = `SELECT * FROM hotel WHERE idhotel= ${idhotel}`;

    connection.query(sql, (err, result) => {
        console.log(result);
        console.log(result[0]);

        if (err) throw err;
        res.render('viewHotel', { result: result[0] });
    });
};

//UPDATE HOTEL
hotelController.updateHotel = (req, res) => {

    let idhotel = req.params.idhotel;
    console.log(req.body)
    let name = req.body.name;
    let adress = req.body.adress;
    let phone = req.body.phone;
    console.log(req.file)

    if (req.file == undefined) {

        let sql = `UPDATE hotel SET name= '${name}',adress='${adress}',phone=${phone} WHERE idhotel= ${idhotel}`;
        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.redirect('/hotels')
        })

    } else {
        let image = req.file.filename;

        let sql = `UPDATE hotel SET name= '${name}',adress='${adress}',phone=${phone},image='${image}' WHERE idhotel= ${idhotel}`;
        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.redirect('/hotels')
        })
    }

}


module.exports = hotelController;