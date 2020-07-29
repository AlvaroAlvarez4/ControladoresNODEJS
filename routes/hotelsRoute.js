var express = require('express');
var router = express.Router();

//libreria para subir imagenes
let multer = require('multer');

const hotelController = require('../controllers/hotelController');


const storage = multer.diskStorage({
    //destino de la imagen ( donde voy a guardar la imagen )
    destination: "public/images",
    //edición del nombre del archivo
    filename: (_req, file, cb) => {
        const extension = file.originalname.slice(
            file.originalname.lastIndexOf(".")
        );
        //cambio del nombre de la imagen
        cb(null, new Date().valueOf() + extension);
    }
});

//la configuracion de const storage la utilizamos y la concatenamos con el metodo single de multer que es
// para guardar una imagen (individual)

// ---single: 1 sola imagen
// ----multi: varias imagenes
const upload = multer({ storage }).single("avatar");


// -----------------GET-----------------
router.get('/', hotelController.listHotel);

//view form hotel
router.get('/hotelForm', hotelController.listFormHotel);


//delete
router.get('/deleteHotel/:idhotel/:image', hotelController.deleteHotel);

//View single hotel
router.get('/singleHotel/:idhotel', hotelController.viewSingleHotel)

// -----------------POST-----------------
//create hotel
// utilizamos el upload para que saveHotel pueda acceder a esta configuracion de multer
router.post('/saveHotel', upload, hotelController.saveHotel);

//Update
router.post('/updateHotel/:idhotel', upload, hotelController.updateHotel);



module.exports = router;