import React from "react";
import { Routes, Route } from "react-router-dom";
import "../css/MainContent.css";
import '../css/Reports.css';

import SideBar from "../components/layouts/SideBar";

import Dashboard from "./Dashboard.js";
import Reports from "./Reports.js";
import MyCategories from "./MyCategories.js";
import NewCategory from "./NewCategory.js"

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
                </Routes>
            </main>
        </div>
    );
};

export default MainContent;
