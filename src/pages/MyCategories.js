import React, { useEffect, useEffectEvent, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import { MdAdd, MdDelete, MdEdit, MdCategory } from "react-icons/md";
import { Link } from 'react-router-dom';

import "../css/CategoryPage.css";

import CategorieItem from "../components/main/CategorieItem";

const CategoryPage = () => {

    const token = localStorage.getItem("token");
    const userInfos = jwtDecode(token);

    const [loading, setLoading] = useState(true);
    const [infosCategories, setInfosCategories] = useState([]);

    document.title = "Categorias";

    useEffect(() => {

        const myCategories = async () => {

            try {
                const response = await fetch("http://localhost:4000/products/get-categorys", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })

                if (!response.ok) {
                    throw new Error("Erro ao buscar categorias");
                }

                const infos = await response.json();
                setInfosCategories(infos);

            } catch (error) {

                alert(error);

            } finally {

                setLoading(false);

            }
        }

        myCategories();

    }, [])


    return (
        <>
            <header className="dashboard-header">
                <h1>Categorias</h1>
                <p>Gerencie todas as suas categorias de produtos.</p>
            </header>
            <div className="div-btn-categorie">
                <Link to='/dashboard/categories/new' className="btn-add">
                    <MdAdd size={20} /> Adicionar categoria
                </Link>
            </div>
            <div className="categorie-list">
                {loading ? <div className="spinner"></div> : infosCategories.map((categ) => (
                    <CategorieItem key={categ.id} categoryName={categ.name} productRelationship={12} />
                ))}
            </div>

        </>
    )


}

export default CategoryPage;
