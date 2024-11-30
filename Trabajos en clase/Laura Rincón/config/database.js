import {connect} from "mongoose";

async function conectarBaseDeDatos(){
    try{
        await connect("mongo")
    }
    catch(error){}
}