import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import { MdLocalShipping } from "react-icons/md";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';

import "../../css/Suppliers.css";

import getAllSuppliers from "../../utils/suppliers/getAllSuppliers";
import getSupplierByName from "../../utils/suppliers/getSupplierByName";

import SupplierItem from "../../components/pages/SupplierItem";
import MainCard from "../../components/main/MainCard";

const Suppliers = () => {

    document.title = "Fornecedores";
    const token = localStorage.getItem("token");

    const [isLoading, setIsLoading] = useState(true);
    const [suppliers, setSuppliers] = useState([]);
    const [supplierQuantity, setSupplierQuantity] = useState(0);
    const [mainState, setMainState] = useState("");
    const [countSupplier, setCountSupplier] = useState(0);
    const [supplierName, setSupplierName] = useState("");

    useEffect(() => {

        const loadData = async () => {

            try {

                const infos = await getAllSuppliers(token);

                setSuppliers(infos);
                setSupplierQuantity(infos.length);

                const stateCount = infos.reduce((acc, supplier) => {
                    acc[supplier.state] = (acc[supplier.state] || 0) + 1;
                    return acc;
                }, {});

                if (Object.keys(stateCount).length > 0) {
                    const [mostFrequentState, count] = Object.entries(stateCount).reduce(
                        (max, entry) => (entry[1] > max[1] ? entry : max)
                    );

                    setMainState(mostFrequentState);
                    setCountSupplier(count);
                } else {
                    setMainState("-");
                    setCountSupplier(0);
                }


            } catch (error) {

                await Swal.fire({
                    title: "Ops...",
                    text: "Ocorreu algum erro ao carregar seus fornecedores.",
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
            <section className="stats-cards" style={{ "marginTop": "5vh" }}>
                <MainCard
                    icon={<MdLocalShipping size={24} />}
                    title="Total de Fornecedores"
                    value={supplierQuantity}
                />
                <MainCard
                    icon={<LocationOnIcon size={24} />}
                    title="Estado principal"
                    value={mainState}
                    subtitle={
                        <>
                            <span style={{
                                background: "#d6ffd6",
                                padding: "3px 8px",
                                borderRadius: "6px",
                                color: "#2e7d32",
                                fontWeight: "600",
                                fontSize: "13px"
                            }}>
                                {countSupplier}
                            </span>
                            Fornecedor(es)
                        </>
                    }
                />
            </section>
            <div className="table-list">
                <table>
                    <thead>
                        <tr>
                            <td>Razão social</td>
                            <td>CNPJ</td>
                            <td>E-mail</td>
                            <td>Endereço</td>
                            <td>Whatsapp</td>
                            <td>Ações</td>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? <tr><td colSpan={6}>Carregando...</td></tr> : suppliers.map((supp) => (
                            <SupplierItem key={supp.id} id={supp.id} name={supp.name} email={supp.email} cnpj={supp.cnpj} address={supp.address} whatsapp={supp.whatsapp} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )


}

export default Suppliers;
