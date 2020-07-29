let connection = require('../config/db.js');
let sha1 = require('sha1');
let fs = require('fs');

let userController = {};


userController.viewLogin = (req, res) => {
    res.render('login')
}

userController.viewRegister = (req, res) => {
    res.render('register');
}



userController.registerUser = (req, res) => {

    console.log(req.body);
    let name = req.body.name;
    let email = req.body.email;
    let password = sha1(req.body.password);


    let sql = `INSERT INTO user (name,email,password) VALUES ('${name}','${email}','${password}')`;

    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/users/login')
    })
}

userController.loginUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let sql = `SELECT * FROM user WHERE email= '${email}' AND password = '${password}'`;

    connection.query(sql, (err, result) => {


        if (err) throw err;

        if (result.lenght === 0) {
            res.send('ESTA VACIO');
        } else {
            res.redirect('/hotels');
        }

    })
}

userController.listUsers = (req, res) => {

    let sql = `SELECT * FROM user`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.render('listUsers', { results })
    })
}


userController.viewSingleUser = (req, res) => {
    let iduser = req.params.iduser;

    let sql = `SELECT * FROM user WHERE iduser= ${iduser}`;

    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.render('viewSingleUser', { result })
    })
}

userController.updateUser = (req, res) => {

    let iduser = req.params.iduser;
    let name = req.body.name;
    let email = req.body.email;



    if (req.file == undefined) {
        let sql = `UPDATE user SET name= '${name}',email='${email}' WHERE iduser= ${iduser}`;

        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.redirect('/users/listUsers')
        })

    } else {
        let image = req.file.filename;
        let sql = `UPDATE user SET name= '${name}',email='${email}',imageUser='${image}' WHERE iduser= ${iduser}`;
        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.redirect('/users/listUsers')
        })
    }
}

userController.deleteUser = (req, res) => {

    // Recogemos el id dle usuario
    let iduser = req.params.iduser;

    let sqlSelect = `SELECT imageUser FROM user WHERE iduser= ${iduser}`
    let sqlDelete = `DELETE FROM user WHERE iduser= ${iduser}`;

    // Hacemos un select del campo de la imagen del usuario
    // Puede venir null o  no
    connection.query(sqlSelect, (err, result) => {
        if (err) throw err;

        //recogemos ese valor del campo imageUSer y lo metemos en una variable
        let imageUser = result[0].imageUser;

        //Creamos un condicional == una condicion que me diga si es null
        // elimina solo el usuario de la base de datos
        if (imageUser == null || imageUser == 'null' || imageUser == undefined) {

            connection.query(sqlDelete, (err, result2) => {
                res.redirect('/users/listUsers')
            })

            // y si no fuera null (que tiene imagen de usuario)
            //que elimine el usuario de la base de datos Y despues que elimine el archivo
            // de la carpeta en la que lo guardamos cn anterioridad
        } else {


            connection.query(sqlDelete, (err, result3) => {

                res.redirect('/users/listUsers')


            })
            let image = imageUser
            var filePath = `public/usersImages/${image}`;
            fs.unlinkSync(filePath);
        }




    })


}

module.exports = userController;