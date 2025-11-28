
const getAllSuppliers = async (token) => {

    try {
        
        const response = await fetch("http://localhost:4000/suppliers/search", {
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

export default getAllSuppliers;