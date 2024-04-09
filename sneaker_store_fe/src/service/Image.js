import axios from "axios";

export const getAllImageByProduct =async(idProduct) =>{
    try{
    const result = await axios.get("http://localhost:8080/api/public/product/image/"+idProduct);
    return result.data;
    }catch(e){
        console.log(e)
    }
}