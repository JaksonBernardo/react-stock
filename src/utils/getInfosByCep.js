
const getInfosByCep = async (cep) => {
    
    try {

        const formatedCep = cep.replace(/\D/g, "");

        if (formatedCep.length !== 8) {

            throw new Error("CEP inválido. Deve conter 8 dígitos numéricos.");

        }

        const response = await fetch(`https://viacep.com.br/ws/${formatedCep}/json/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if (data.erro) {
            throw new Error("CEP não encontrado.");
        }

        return data;

    } catch (error) {

        console.error("Erro ao buscar informações do CEP:", error.message);
        return null;

    }

};

export default getInfosByCep;
