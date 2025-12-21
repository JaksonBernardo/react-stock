import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2';

import "../../css/Suppliers.css";

import getSupplierById from "../../utils/suppliers/getSupplierById";
import deleteSupplierById from "../../utils/suppliers/deleteSupplierById";

const DeleteSupplier = () => {

    document.title = "Deletar Fornecedor";
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const params = useParams();

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingSupplier, setLoadingSupplier] = useState(true);
    const [supplier, setSupplier] = useState({
        "name": null,
        "cnpj": null,
        "email": null,
        "phone": null,
        "whatsapp": null,
        "cep": null,
        "address": null,
        "number": null,
        "city": null,
        "state": null
    })

    const deleteSupplier = async (event) => {

        try {
            
            await deleteSupplierById(token, params.supplierId);

            await Swal.fire({
                title: "Shooow",
                text: "Fornecedor excluído com sucesso!",
                icon: "success",
                timer: 3000,
                showConfirmButton: false
            });
            
            navigate("/dashboard/suppliers");

        } catch (error) {
            
            await Swal.fire({
                title: "Ops...",
                text: "Não foi possível excluir esse fornecedor",
                icon: "error",
                timer: 2500,
                showConfirmButton: false
            });
            
        }

    }

    useEffect(() => {

        const loadInfos = async () => {

            try {
                
                const infosSupplier = await getSupplierById(token, params.supplierId);

                setSupplier(infosSupplier);

            } catch (error) {
                
                console.error(error);

                await Swal.fire({
                    title: "Ops...",
                    text: "Não foi possível carregar as informações desse fornecedor",
                    icon: "error",
                    timer: 2500,
                    showConfirmButton: false
                });

            } finally {

                setLoadingSupplier(false);

            }

        }

        loadInfos();

    }, [])

    return (
        <>
            <header className="dashboard-header">
                <h1>Deletar fornecedor</h1>
                <p>Exclua um fornecedor da sua empresa.</p>
            </header>
            <div>
                <p>Tem certeza que quer excluir {supplier.name} - {supplier.cnpj}?</p>
            </div>
            <div style={{ marginTop: "3vh" }}>
                <button disabled={buttonDisabled} type="button" className="btn-add btn-save" style={{ borderRadius: "5px", height: "55px", width: "100%" }} onClick={(event) => deleteSupplier(event)}>
                    {loading ? <div className="spinner"></div> : <span>Deletar fornecedor</span>}
                </button>
            </div>
        </>
    )
};

export default DeleteSupplier;
