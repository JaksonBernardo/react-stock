import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { NumericFormat } from "react-number-format";
import Swal from 'sweetalert2';

import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';

import getAllSuppliers from "../../utils/suppliers/getAllSuppliers";
import getAllCategorys from "../../utils/categories/getAllCategorys";
import saveNewProduct from "../../utils/products/saveNewProduct";

const NewProduct = () => {

    document.title = "Novo Produto";

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [suppliers, setSuppliers] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const [supplierLoading, setSupplierLoading] = useState(true);
    const [categoryLoading, setCategoryLoading] = useState(true);
    const [isDisabled, setDisabled] = useState(false);
    const [saveProduct, setSaveProduct] = useState(false);
    const [newProduct, setNewProduct] = useState({
        "name": null,
        "description": null,
        "price": null,
        "stock": null,
        "supplier": null,
        "validity": null,
        "category": null
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {

        const getSuppliers = async (event) => {

            try {

                const suppliersInfo = await getAllSuppliers(token);

                setSuppliers(suppliersInfo);

            } catch (error) {

                await Swal.fire({
                    title: "Ops...",
                    text: "Ocorreu algum erro ao carregar seus fornecedores.",
                    icon: "error",
                    timer: 2500,
                    showConfirmButton: false
                });

            } finally {

                setSupplierLoading(false);

            }

        };

        const getCategorys = async (event) => {

            try {

                const categorysInfo = await getAllCategorys(token);

                setCategorys(categorysInfo);

            } catch (error) {

                await Swal.fire({
                    title: "Ops...",
                    text: "Ocorreu algum erro ao carregar suas categorias.",
                    icon: "error",
                    timer: 2500,
                    showConfirmButton: false
                });

            } finally {

                setCategoryLoading(false);

            }

        }

        getSuppliers();
        getCategorys();

    }, [])

    const sendProduct = async (event) => {

        try {

            event.preventDefault();

            setDisabled(true);
            setSaveProduct(true);

            const formData = new FormData();

            Object.entries(newProduct).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    formData.append(key, value);
                }
            });

            formData.append("photo", image);
            formData.append("nameProduct", newProduct.name);
            formData.append("description", newProduct.description);
            formData.append("price", newProduct.price);
            formData.append("stock", newProduct.stock);
            formData.append("supplier", newProduct.supplier);
            formData.append("validity", newProduct.validity);
            formData.append("category", newProduct.category);

            await saveNewProduct(token, formData);

            await Swal.fire({
                title: "Ótimo",
                text: "Produto cadastrado com sucesso",
                icon: "success",
                timer: 2500,
                showConfirmButton: false
            });

            navigate("/dashboard/products");

        } catch (error) {

            await Swal.fire({
                title: "Ops...",
                text: error.message || "Ocorreu algum erro ao salvar seu produto.",
                icon: "error",
                timer: 2500,
                showConfirmButton: false
            });

        } finally {

            setDisabled(false);
            setSaveProduct(false);

        };
    };

    return (
        <>
            <header className="dashboard-header">
                <h1>Novo produto</h1>
                <p>Adicione um novo produto</p>
            </header>
            <div className="input-container">
                <div style={{ marginBottom: "2vh" }}>
                    <TextField
                        type="file"
                        label="Imagem do produto"
                        InputLabelProps={{ shrink: true }}
                        slotProps={{
                            accept: "image/png, image/jpeg, image/jpg, image/webp"
                        }}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file) return;

                            setImage(file);
                            setImagePreview(URL.createObjectURL(file));
                        }}
                        fullWidth
                    />
                </div>
                <div>
                    {imagePreview && (
                        <div style={{ marginBottom: "2vh" }}>
                            <img
                                src={imagePreview}
                                alt="Foto do produto"
                                style={{
                                    maxWidth: "200px",
                                    maxHeight: "200px",
                                    objectFit: "cover",
                                    borderRadius: "8px"
                                }}
                            />
                        </div>
                    )}
                </div>
                <div>
                    <TextField
                        sx={{ width: "50%" }}
                        id="product-name"
                        label="Nome do produto"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DriveFileRenameOutlineIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="outlined"
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                    {supplierLoading ? <div className="spinner"></div> : <TextField
                        sx={{ width: "50%" }}
                        select
                        id="supplier"
                        label="Fornecedor"
                        onChange={(e) => setNewProduct({ ...newProduct, supplier: e.target.value })}
                    >
                        {suppliers.map((supp) => (
                            <MenuItem key={supp.id} value={supp.id}>
                                {supp.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    }
                </div>
                <div>
                    <TextField
                        sx={{ width: "100%" }}
                        multiline
                        rows={4}
                        id="description"
                        label="Descrição"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FormatColorTextIcon />
                                    </InputAdornment>
                                )
                            },
                        }}
                        variant="outlined"
                        onInput={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    />
                </div>
                <div>
                    <NumericFormat
                        customInput={TextField}
                        sx={{ width: "50%" }}
                        label="Preço (R$)"
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={2}
                        fixedDecimalScale
                        allowNegative={false}
                        prefix="R$ "
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                </InputAdornment>
                            ),
                        }}
                        value={newProduct.price}
                        onValueChange={(values) => {
                            setNewProduct({
                                ...newProduct,
                                price: values.floatValue,
                            });
                        }}
                    />

                    <TextField
                        sx={{ width: "50%" }}
                        id="stock"
                        type="number"
                        label="Estoque (Qtd)"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <InventoryIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="outlined"
                        onInput={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                    />

                </div>
                <div>
                    <TextField
                        sx={{ width: "50%" }}
                        id="validity"
                        label="Validade"
                        type="date"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">

                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="outlined"
                        onChange={(e) => setNewProduct({ ...newProduct, validity: e.target.value })}
                    />
                    {categoryLoading ? <div className="spinner"></div> : <TextField
                        sx={{ width: "50%" }}
                        select
                        id="category"
                        label="Categoria"
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    >
                        {categorys.map((cat) => (
                            <MenuItem key={cat.id} value={cat.id}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    }
                </div>
            </div>
            <div style={{ marginTop: "3vh" }}>
                <button disabled={isDisabled} type="button" className="btn-add btn-save" style={{ borderRadius: "5px", height: "55px", width: "100%" }} onClick={(e) => sendProduct(e)} >
                    {saveProduct ? <div className="spinner"></div> : <span>Cadastrar novo produto</span>}
                </button>
            </div>
        </>
    )
};

export default NewProduct;
