
import CONFIGS from "../../Configs.js";

const getSupplierById = async (token, supplierId) => {

    try {
        
        const response = await fetch(`${CONFIGS.api.url}/suppliers/${supplierId}`, {
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

export default getSupplierById;