import React, { useState, useEffect } from "react";
// import { jwtDecode } from 'jwt-decode';
import TextField from '@mui/material/TextField';

import "../css/CategoryPage.css";

const CategoryPage = () => {

    const token = localStorage.getItem("token");
    // const userInfos = jwtDecode(token);

    const [loading, setLoading] = useState(false);
    const [infosCategories, setInfosCategories] = useState([]);
    const [category, setCategory] = useState("");

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

    const saveNewCategorie = async (event) => {

        event.preventDefault();

        if (!category) {
            alert("Digite um nome para a categoria");
            return;
        }

        const hasCategory = infosCategories.some(cat => cat.name === category);

        if (hasCategory) {

            alert("Essa categoria já existe");
            return;

        }

        setLoading(true);

        try {
            
            const response = await fetch('http://localhost:4000/products/create-category', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    categoryName: category
                })
            })

            const infos = await response.json();

            if (!response.ok) {

                alert(`Erro: ${infos.message}`);

            } else {

                alert("Categoria criada com sucesso!");

            }

        } catch (error) {

            console.error(error);
            alert("Erro na conexão com o servidor. Tente novamente.");
            
        } finally {

            setCategory("");
            setLoading(false);

        };
  
    };

    return (
        <>
            <header className="dashboard-header">
                <h1>Nova categoria</h1>
                <p>Adicione uma nova categoria para seus produtos</p>
            </header>
            <div className="div-new-categorie">
                <TextField style={{ width: "50vw" }} autoComplete="off" id="categorie-name" label="Nome da categoria" variant="outlined" onInput={(event) => setCategory(event.target.value)} />
                <button type="button" className="btn-add btn-save" style={{ borderRadius: "5px", height: "55px" }} onClick={(event) => saveNewCategorie(event)}>
                    {loading ? <div className="spinner"></div> : <span>Salvar categoria</span>}
                </button>
            </div>

        </>
    )


}

export default CategoryPage;
