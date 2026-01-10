import { Link } from "react-router-dom";

import { MdAdd } from "react-icons/md";

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
            <div>
                <Link to='/dashboard/products/new' className="btn-add float-action-button shadow">
                    <MdAdd size={20} />
                </Link>
            </div>
        </>
    )


}

export default Products;