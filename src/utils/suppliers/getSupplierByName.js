
import CONFIGS from "../../Configs";

const getSupplierByName = async (token, name) => {

    try {
        
        const response = await fetch(`${CONFIGS.api.url}/suppliers/search?name=${name}`, {
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
        
    }

}

export default getSupplierByName;