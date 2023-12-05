import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_HOST = process.env.MONGO_HOST;
const DB_PORT = process.env.MONGO_PORT;
const DB_NAME = process.env.MONGO_DATABASE;

const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const connection  = mongoose.connect(uri).then(()=>{
    console.log("conexion satisfactoria con la base de datos");
}).catch((e)=>{
    console.log("error al conectarse")
    console.log(e);
})


export default connection;