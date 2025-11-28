
import CONFIGS from "../../Configs.js";


const deleteSupplierById = async (token, supplierId) => {

    try {
        
        const response = await fetch(`${CONFIGS.api.url}/suppliers/delete/${supplierId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        return data.message;

    } catch (error) {

        return error;
        
    }

}

export default deleteSupplierById;
