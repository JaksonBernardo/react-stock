
import CONFIGS from "../../Configs.js";

const createNewSupplier = async (token, newSupplier) => {

    try {
        
        const response = await fetch(`${CONFIGS.api.url}/suppliers/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: newSupplier.companyName,
                cnpj: newSupplier.cnpj,
                email: newSupplier.email,
                phone: newSupplier.phone,
                whatsapp: newSupplier.whatsapp,
                cep: newSupplier.cep,
                address: newSupplier.address,
                numberHouse: newSupplier.numberHouse,
                city: newSupplier.city,
                state: newSupplier.state,
            })
        })

        const data = await response.json();

        return data.message;

    } catch (error) {
        
        return error;

    }

}

export default createNewSupplier;
