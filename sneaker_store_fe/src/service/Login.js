import axios from "axios";

export const loginAcc = async (signInForm) => {
    try {
        const result = await axios.post(`http://localhost:8080/api/public/signin`, {...signInForm})
        return result.data
    } catch (e) {
        console.log(e)
    }
}