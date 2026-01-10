
import CONFIGS from "../../Configs"

const getAllCategorys = async (token) => {

    try {
        
        const response = await fetch(`${CONFIGS.api.url}/products/get-categorys`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        
        return error;

    };

}

export default getAllCategorys;