// const {v2: cloudinary} = require("cloudinary");
// const { CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET } = require("../config/index")
// const fs = require("fs");


//   // Configuration
//     cloudinary.config({ 
//         cloud_name: CLOUDINARY_CLOUD_NAME, 
//         api_key: CLOUDINARY_API_KEY, 
//         api_secret: CLOUDINARY_API_SECRET 
//     });

//     const uploadOnCloudinary = async(localFilePath) =>{
//         try {
//             if(!localFilePath){
//                 throw new Error("Path of local file is not found")
//             }
//             const respose = await cloudinary.uploader.upload(localFilePath,{
//                 resource_type:'auto'
//             })
//             console.log("file is uploaded on cloudinary",respose.url);
//             return respose;

//         } catch (error) {
//             console.log("Error in Uploading to cloudinary :",error);
//             fs.unlinkSync(localFilePath)
//             return null;
            
//         }
//     }

// module.exports={
//     uploadOnCloudinary
// }