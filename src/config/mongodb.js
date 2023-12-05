import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const connection  = mongoose.connect(uri).then(()=>{
    console.log("conexion satisfactoria con la base de datos");
}).catch((e)=>{
    console.log("error al conectarse")
    console.log(e);
})


export default connection;