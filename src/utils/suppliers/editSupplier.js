
import CONFIGS from "../../Configs.js";

const editSupplier = async (token, supplierId, infosSupplier) => {

    try {
        
        const response = await fetch(`${CONFIGS.api.url}/suppliers/update/${supplierId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: infosSupplier.name,
                cnpj: infosSupplier.cnpj,
                email: infosSupplier.email,
                phone: infosSupplier.phone,
                whatsapp: infosSupplier.whatsapp,
                cep: infosSupplier.cep,
                address: infosSupplier.address,
                number: infosSupplier.number,
                city: infosSupplier.city,
                state: infosSupplier.state
            })
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

export default editSupplier;

