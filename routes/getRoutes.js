const express = require("express");
const get_route = express();


const product_controller = require("../controllers/productController");


get_route.set('view engine', 'ejs');
get_route.set('views', "./views/users");
//get_route.set('views', __dirname + '/views/users');

const bodyParser = require("body-parser");
get_route.use(bodyParser.json());
get_route.use(bodyParser.urlencoded({ extended: true }));
const auth = require("../middleware/auth");

const multer = require("multer");
const path = require("path");


get_route.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/productImages'), function (err, success) {

            if (err) {
                throw err
            }

        });
    },

    filename: function (req, file, cb) {

        const name = Date.now() + '-' + file.originalname;
        cb(null, name, function (error, success) {

            if (error) {
                throw error
            }

        });

    }
});

const upload = multer({ storage: storage });

get_route.get('/getAllData', product_controller.getdetail);
get_route.get('/getData/:id', product_controller.getdetailbyid);
get_route.post('/insertData', product_controller.insertproduct);
get_route.post('/increaseStatus/:id', product_controller.hitAPI);// for params
get_route.post('/increaseStatus', product_controller.hitAPI);// for body

/*
get_route.post('/updateData', product_controller.updateproduct);
get_route.post('/deleteData/:id', product_controller.deleteproduct);
get_route.get('/getImages/:image', product_controller.getimage);
*/

module.exports = get_route;

