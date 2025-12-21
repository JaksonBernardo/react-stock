

import "../../css/Products.css";

const Products = () => {

    document.title = "Produtos";
    const token = localStorage.getItem("token");

    return (
        <>
            <header className="dashboard-header">
                <h1>Produtos</h1>
                <p>Gerencie seus produtos em estoque e em falta.</p>
            </header>
            
        </>
    )


}

export default Products;