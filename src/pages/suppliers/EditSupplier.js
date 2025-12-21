import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import TextField from "@mui/material/TextField";
import Swal from 'sweetalert2';

import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import BusinessIcon from '@mui/icons-material/Business';
import NumbersIcon from '@mui/icons-material/Numbers';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PlaceIcon from '@mui/icons-material/Place';
import MapIcon from '@mui/icons-material/Map';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';

import "../../css/Suppliers.css";

import getStates from '../../utils/getStates.js';
import getInfosByCep from "../../utils/getInfosByCep.js";
import editInfosSupplier from "../../utils/suppliers/editSupplier.js";
import getSupplierById from "../../utils/suppliers/getSupplierById.js";

const EditSupplierPage = () => {

    document.title = "Editar Fornecedor";

    const params = useParams();
    const supplierId = params.supplierId;

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [loadingSupplier, setLoadingSupplier] = useState(true);
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [infosCep, setInfosCep] = useState(true);
    const [newSupplier, setNewSupplier] = useState({
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

    useEffect(() => {

        const loadInfos = async () => {

            try {
                
                const infosSupplier = await getSupplierById(token, supplierId);

                setNewSupplier(infosSupplier);

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

    const getInfos = async (event) => {

        event.preventDefault();

        if (newSupplier.cep) {

            const dataCep = await getInfosByCep(newSupplier.cep);

            if (!dataCep || dataCep.erro) {

                await Swal.fire({
                    title: "CEP inválido",
                    text: "Não foi possível encontrar um endereço para esse CEP.",
                    icon: "error",
                    timer: 2500,
                    showConfirmButton: false
                });
                return;

            }
            
            setInfosCep(false);

            setNewSupplier({ ...newSupplier, address: `${dataCep.logradouro}, ${dataCep.bairro}`, city: dataCep.localidade, state: dataCep.uf })

        }

        return;

    };

    const editSupplier = async (event) => {

        event.preventDefault();

        const requiredFields = [newSupplier.name, newSupplier.cnpj, newSupplier.email, 
                                newSupplier.phone, newSupplier.whatsapp, newSupplier.cep, 
                                newSupplier.address, newSupplier.city, newSupplier.state]

        if (requiredFields.some(field => !field)) {

            await Swal.fire({
                title: "Ops...",
                text: "Preencha todos os campos para poder cadastrar o novo fornecedor",
                icon: "warning",
                timer: 3000,
                showConfirmButton: false
            });
            return;

        }

        setLoading(true);
        setButtonDisabled(true);

        try {
            
            await editInfosSupplier(token, supplierId, newSupplier);

            await Swal.fire({
                title: "Shoow",
                text: "Fornecedor cadastrado com sucesso!",
                icon: "success",
                timer: 3000,
                showConfirmButton: false
            });
            
            navigate("/dashboard/suppliers");

        } catch (error) {
            
            console.error(error);
            await Swal.fire({
                title: "Ops...",
                text: "Houve algum erro ao cadastrar fornecedor",
                icon: "error",
                timer: 3000,
                showConfirmButton: false
            });

        } finally {

            setLoading(false);
            setButtonDisabled(false);

        }

    }

    if (loadingSupplier) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Carregando fornecedor...</p>
            </div>
        );
    }

    return (
        <>
            <header className="dashboard-header">
                <h1>Editar fornecedor</h1>
                <p>Altere as informações de um fornecedor da sua empresa.</p>
            </header>
            <div className="input-container">
                <div>
                    <TextField
                        sx={{ width: "50%" }}
                        id="company-name"
                        label="Razão Social"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BusinessIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="outlined"
                        value={newSupplier.name}
                        onInput={(e) => setNewSupplier({ ...newSupplier, companyName: e.target.value })}
                    />
                    <TextField
                        sx={{ width: "50%" }}
                        id="cnpj"
                        label="CNPJ"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <NumbersIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="outlined"
                        value={newSupplier.cnpj}
                        onInput={(e) => setNewSupplier({ ...newSupplier, cnpj: e.target.value })}
                    />
                </div>
                <div>
                    <TextField
                        sx={{ width: "100%" }}
                        id="email"
                        label="E-mail"
                        type="email"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AlternateEmailIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="outlined"
                        value={newSupplier.email}
                        onInput={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                    />
                </div>
                <div>
                    <TextField
                        sx={{ width: "60vw" }}
                        id="phone"
                        label="Telefone"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocalPhoneIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="outlined"
                        value={newSupplier.phone}
                        onInput={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                    />
                    <TextField
                        sx={{ width: "60vw" }}
                        id="whatsapp"
                        label="Whatsapp"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <WhatsAppIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="outlined"
                        value={newSupplier.whatsapp}
                        onInput={(e) => setNewSupplier({ ...newSupplier, whatsapp: e.target.value })}
                    />
                </div>
                <div>
                    <TextField
                        sx={{ width: "20%" }}
                        id="cep"
                        label="CEP"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PlaceIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="outlined"
                        onBlur={(e) => getInfos(e)}
                        value={newSupplier.cep}
                        onInput={(e) => setNewSupplier({ ...newSupplier, cep: e.target.value })}
                    />
                    <TextField
                        sx={{ width: "20%" }}
                        id="location"
                        label="Endereço"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MapIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="outlined"
                        value={newSupplier.address}
                        onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
                    />
                    <TextField
                        sx={{ width: "20%" }}
                        id="number"
                        label="Número"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LooksTwoIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="outlined"
                        value={newSupplier.number}
                        onChange={(e) => setNewSupplier({ ...newSupplier, number: e.target.value })}
                    />
                    <TextField
                        sx={{ width: "20%" }}
                        id="city"
                        label="Cidade"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationCityIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="outlined"
                        value={newSupplier.city}
                        onChange={(e) => setNewSupplier({ ...newSupplier, city: e.target.value })}
                    />
                    <TextField
                        sx={{ width: "20%" }}
                        select
                        id="state"
                        label="Estado"
                        value={newSupplier.state || ""}
                        onChange={(e) => setNewSupplier({ ...newSupplier, state: e.target.value })}
                    >
                        {getStates.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </div>
            <div style={{ marginTop: "3vh" }}>
                <button disabled={buttonDisabled} type="button" className="btn-add btn-save" style={{ borderRadius: "5px", height: "55px", width: "100%" }} onClick={(event) => editSupplier(event)}>
                    {loading ? <div className="spinner"></div> : <span>Salvar alterações</span>}
                </button>
            </div>
        </>
    )
};

export default EditSupplierPage;
