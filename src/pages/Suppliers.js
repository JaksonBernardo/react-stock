import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';

import SearchIcon from '@mui/icons-material/Search';

import "../css/Suppliers.css";

import getAllSuppliers from "../utils/suppliers/getAllSuppliers";
import getSupplierByName from "../utils/suppliers/getSupplierByName";

import SupplierItem from "../components/pages/SupplierItem";

const Suppliers = () => {

    document.title = "Fornecedores";
    const token = localStorage.getItem("token");

    const [isLoading, setIsLoading] = useState(true);
    const [suppliers, setSuppliers] = useState([]);
    const [supplierName, setSupplierName] = useState("");

    useEffect(() => {

        const loadData = async () => {

            try {
                
                const infos = await getAllSuppliers(token);

                setSuppliers(infos);

            } catch (error) {

                await Swal.fire({
                    title: "Ops...",
                    text: "Não foi possível carregar seus fornecedores.",
                    icon: "error",
                    timer: 2500,
                    showConfirmButton: false
                });
                return;

            } finally {

                setIsLoading(false);

            }     

        }

        loadData();
        
    }, [])

    const searchSupplier = async (event) => {

        event.preventDefault();

        setIsLoading(true);

        try {
            
            const suppliersSearched = await getSupplierByName(token, supplierName);

            setSuppliers(suppliersSearched);

        } catch (error) {

            await Swal.fire({
                title: "Ops...",
                text: "Parece que ocorreu um erro ao pesquisar os fornecedores. Tente novamente mais tarde",
                icon: "error",
                timer: 2500,
                showConfirmButton: false
            });
            
        } finally {

            setIsLoading(false);

        }

    };

    return (
        <>
            <header className="dashboard-header">
                <h1>Fornecedores</h1>
                <p>Gerencie seus fornecedores de forma inteligente.</p>
            </header>
            <div className="div-btn-supplier">
                <TextField onInput={(e) => setSupplierName(e.target.value)} style={{ width: "75vw" }} autoComplete="off" id="supplier-name" label="Fornecedor" type="search" variant="outlined" />
                <button className="btn-add" onClick={(e) => searchSupplier(e)}>
                    <SearchIcon />
                </button>
                <Link to='/dashboard/suppliers/new' className="btn-add float-action-button shadow">
                    <MdAdd size={20} />
                </Link>
            </div>
            <div className="suppliers">
                {isLoading ? <div className="spinner"></div> : suppliers.map((supp) => (
                    <SupplierItem key = {supp.id} id = {supp.id} name = {supp.name} email = {supp.email} cnpj = {supp.cnpj} />
                ))}
            </div>
        </>
    )


}

export default Suppliers;
