
import CONFIGS from "../../Configs.js";


const getAllProducts = async (token) => {

    try {
        
        const response = await fetch(`${CONFIGS.api.url}/products/get-products`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message);

        }

        return data;

    } catch (error) {

        throw error;
        
    }

};

export default getAllProducts;
