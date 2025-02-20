import shop from "../model/shop.model.js";

export const getshop=async(req,res)=>{
    try{
        const sn=await shop.find()
        res.status(200).json(sn)

    }catch (error){
        console.log("Error",error)
        res.status(500).json(error);

    }
}