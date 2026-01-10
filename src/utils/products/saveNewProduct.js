
import CONFIGS from "../../Configs";

const saveNewProduct = async (token, formData) => {

    try {
        
        const response = await fetch(`${CONFIGS.api.url}/products/create-product`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        return true;

    } catch (error) {
        throw error;
    }

}


export default saveNewProduct;
