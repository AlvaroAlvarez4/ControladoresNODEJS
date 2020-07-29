var express = require('express');
var router = express.Router();
let multer = require('multer');

const userController = require('../controllers/userController');

const storage = multer.diskStorage({
    //destino de la imagen ( donde voy a guardar la imagen )
    destination: "public/usersImages",
    //edición del nombre del archivo
    filename: (_req, file, cb) => {
        const extension = file.originalname.slice(
            file.originalname.lastIndexOf(".")
        );
        //cambio del nombre de la imagen
        cb(null, new Date().valueOf() + extension);
    }
});
const upload = multer({ storage }).single("avatar");

// ---------------------- GET -------------------------------
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//Renderize la vista Login.ejs
router.get('/login', userController.viewLogin);

router.get('/register', userController.viewRegister);

router.get('/listUsers', userController.listUsers);

router.get('/viewUser/:iduser', userController.viewSingleUser);

router.get('/deleteUser/:iduser', userController.deleteUser);

//--------------------------- POST ---------------------

router.post('/registerUser', userController.registerUser);

router.post('/SendLogin', userController.loginUser);

router.post('/updateUser/:iduser', upload, userController.updateUser);

module.exports = router;