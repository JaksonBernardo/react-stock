import React from "react";
import { Routes, Route } from "react-router-dom";
import "../css/MainContent.css";
import '../css/Reports.css';

import SideBar from "../components/layouts/SideBar";

import Dashboard from "./Dashboard.js";
import Reports from "./Reports.js";

// PÁGINA DE CATEGORIAS
import MyCategories from "./MyCategories.js";
import NewCategory from "./NewCategory.js"

// PÁGINA DE FORNECEDORES
import Suppliers from "./suppliers/Suppliers.js";
import NewSupplier from "./suppliers/NewSupplier.js";
import EditSupplier from "./suppliers/EditSupplier.js";
import DeleteSupplier from "./suppliers/DeleteSupplier.js";

// PÁGINA DE PRODUTOS
import Products from "./products/Products.js";

const MainContent = () => {
    return (
        <div className="dashboard-container">
            <SideBar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/categories" element={<MyCategories />} />
                    <Route path="/categories/new" element={<NewCategory />} />
                    <Route path="/suppliers" element={<Suppliers />} />
                    <Route path="/suppliers/new" element={<NewSupplier />} />
                    <Route path="/suppliers/edit/:supplierId" element={<EditSupplier />} />
                    <Route path="/suppliers/delete/:supplierId" element={<DeleteSupplier />} />
                    <Route path="/products" element={<Products />} />
                </Routes>
            </main>
        </div>
    );
};

export default MainContent;
