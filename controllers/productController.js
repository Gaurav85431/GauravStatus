const userproduct = require("../models/productModel");

const path = require("path");
const fs = require("fs");
const bcryptjs = require('bcryptjs');

const config = require("../config/config");

const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");

const randomstring = require("randomstring");




// get all data
const getdetail = async (req, res) => {

    try {

        const data = await userproduct.find();
        const formattedData = data.map(item => ({

            // id: item._id,
            title: item.title,
            description: item.description,
            mystatus: item.mystatus
            // price: item.price,
            // image: item.images,
            //   imagePath: path.join(__dirname, '..', 'public/productImages', item.images) // Construct complete local image path

        }));

        // Send the formatted data as the response
        res.status(200).json(formattedData);


        //  res.status(200).send({success: true, msg: "All details :", data: data});

    } catch (error) {
        res.status(400).send(error.message);
    }

}


// get data by id
const getdetailbyid = async (req, res) => {
    try {

        //const id= req.body.id;
        const id = req.params.id;

        const data = await userproduct.findOne({ _id: id });

        if (data) {


            //     const imageName = data.images;
            //     const imagePath = path.join(__dirname, '..', 'public/productImages', imageName);
            res.status(200).send({ success: true, msg: "product details :", data: { data } });

        } else {
            res.status(200).send({ success: false, msg: "id not found!" });
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}


// insert data
const insertproduct = async (req, res) => {

    try {

        const getdata = new userproduct({
            title: req.body.title,
            description: req.body.description,

        });
        const product_data = await getdata.save();

        res.status(200).send({ success: true, msg: "product Details", data: product_data })

    }

    catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}


// API hit per status count increase

const hitAPI = async (req, res) => {

    // const id =  req.params.id;
    // const id = req.body.id;


    const id = req.params.id || req.body.id;

    const validID = await userproduct.findOne({ _id: id });

    const mystatus = parseInt(validID.mystatus);

    if (validID) {
        const userData = await userproduct.findByIdAndUpdate({ _id: id }, {
            $set: {
                mystatus: mystatus + 1
            }
        });

        res.status(200).send({ success: true, msg: "your profile is verified" });



    }
    else {
        res.status(200).send({ success: false, msg: "can't found ID" });
    }

}


/**-------------------------------------------------------------------------- */
/*
// update data
const updateproduct = async (req, res) => {
    try {

        const id = req.body.id;
        const title = req.body.title;
        const description = req.body.description;
     //   const price = req.body.price;
        const images = req.file.filename;

        const data = await userproduct.findOne({ _id: id });

        if (data) {

            const userData = await userproduct.findByIdAndUpdate({ _id: id }, {
                $set: {
                    title: title, description: description, images: images
                }
            });

            res.status(200).send({ success: true, msg: "your data has been updated" });

        } else {
            res.status(200).send({ success: false, msg: "id not found!" });
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}


// delete data
const deleteproduct = async (req, res) => {
    try {

        // const id= req.body.id;
        const id = req.params.id;


        const data = await userproduct.findOne({ _id: id });

        if (data) {

            const userData = await userproduct.deleteOne({ _id: id });

            res.status(200).send({ success: true, msg: "your data has been deleted" });

        } else {
            res.status(200).send({ success: false, msg: "id not found!" });
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}


// get image by imagename

const getimage = async (req, res) => {
    try {

        const image = req.params.image;


        const getImagePath = (imageName) => {
            // Construct the path to the image in the 'public/images' directory
            const imagePath = path.join(__dirname, '..', 'public', 'productImages', imageName);
            return imagePath;
        };

        const imageName = image;
        const imagePath = getImagePath(imageName);
        res.sendFile(imagePath);


    } catch (error) {
        res.status(400).send(error.message);
    }
}

/*
// get image by id
const getimagebyid = async (req, res) => {
    try {

        const id = req.params.id;
        const data = await userproduct.findOne({ _id: id });
        if (data) {
            const image = data.images;

            const getImagePath = (imageName) => {
                // Construct the path to the image in the 'public/images' directory
                const imagePath = path.join(__dirname, '..', 'public', 'productImages', imageName);
                return imagePath;
            };


            const imageName = image;
            const imagePath = getImagePath(imageName);
            res.sendFile(imagePath);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
*//*
*/

module.exports = {
    getdetail,
    getdetailbyid,
    insertproduct,
    // updateproduct,
    // deleteproduct,
    // getimage,
    // getimagebyid,
    hitAPI


}