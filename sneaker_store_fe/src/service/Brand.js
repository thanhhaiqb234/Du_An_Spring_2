import axios from "axios";

export const getAllBrand =async() =>{
    try{
    const result = await axios.get("http://localhost:8080/api/public/brand");
    return result.data;
    }catch(e){
        console.log(e)
    }
}