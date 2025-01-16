import { connect } from "mongoose";



export const conectToMongo = async ()=>{
    try {
        await connect(process.env.DB_URI as string)
        console.log("conected to mongo");


    } catch (error) {
        console.log("cen't conected to mongo",error);
    }
}
