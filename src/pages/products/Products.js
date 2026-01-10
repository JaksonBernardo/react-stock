import CONFIGS from "../../Configs.js";
import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { useState, useEffect } from "react"
import Swal from 'sweetalert2';

import "../../css/Products.css";

import CardProduct from "../../components/main/CardProduct.js";

import getAllProducts from "../../utils/products/getAllProducts.js";



const Products = () => {

    document.title = "Produtos";
    const token = localStorage.getItem("token");

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const findProducts = async (event) => {

            try {
                
                const allProducts = await getAllProducts(token);

                setProducts(allProducts);

            } catch (error) {

                await Swal.fire({
                    title: "Ops...",
                    text: "Ocorreu algum erro ao carregar seus produtos.",
                    icon: "error",
                    timer: 2500,
                    showConfirmButton: false
                });
                return;
                
            } finally {

                setIsLoading(false);

            }

        }

        findProducts();

    }, [])

    return (
        <>
            <header className="dashboard-header">
                <h1>Produtos</h1>
                <p>Gerencie seus produtos em estoque.</p>
            </header>
            <div>
                <Link to='/dashboard/products/new' className="btn-add float-action-button shadow">
                    <MdAdd size={20} />
                </Link>
            </div>
            <div className="cards">
                {isLoading ? <div className="spinner"></div> : products.map((prod) => (
                    <CardProduct key={prod.id} id={prod.id} productName={prod.name} productValue={prod.price} image={`${CONFIGS.api.url}/uploads/products/${prod.photo}`} />
                ))}
            </div>
        </>
    )


}

export default Products;