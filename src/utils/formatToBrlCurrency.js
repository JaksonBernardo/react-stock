
const formatToBrlCurrency = (value) => {

    if (typeof value !== "number") {
        throw new TypeError("O valor deve ser um número");
    }

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);

};

export default formatToBrlCurrency;