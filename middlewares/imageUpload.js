// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//     destination(req, file, cb){
//         console.log("file", file)
//         cb(null, "./uploads/images/");
//     },

//     filename(req, file, cb){
//         cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//     },
// });


// function checkFileType(file, cb){
//     const fileTypes = /jpg|jpeg|png/;
//     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase()); //This returns true or false
//     const mimetype = fileTypes.test(file.mimetype); //This returns true or false 
 
//     if(extname && mimetype){
//         cb(null, true)
//     } else {
//         cb("Images Only!!")
//     }
// }

// const upload = multer({
//     storage,
//     fileFilter: function(req, file, cb){
//         checkFileType(file, cb)
//     }
// })


// module.exports = upload;