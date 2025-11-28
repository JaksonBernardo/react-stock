import { MdDashboard, MdInventory, MdAssessment, MdSettings, MdLogout } from "react-icons/md";
import { MdSupervisedUserCircle } from "react-icons/md";
import { BsArrowDownUp } from "react-icons/bs";
import { FaTruck, FaTag } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const SideBar = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const logoutUser = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        navigate("/login");
    };

    // Função para checar qual rota está ativa
    const isActive = (path) => location.pathname === path;

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>SmartStock</h2>
            </div>
            <nav className="sidebar-menu">
                <a
                    className={isActive("/dashboard") ? "active" : ""}
                    onClick={() => navigate("/dashboard")}
                >
                    <MdDashboard /> Dashboard
                </a>

                <a
                    className={isActive("/dashboard/movements") ? "active" : ""}
                    onClick={() => navigate("/dashboard/movements")}
                >
                    <BsArrowDownUp /> Movimentações
                </a>

                <a
                    className={isActive("/dashboard/products") ? "active" : ""}
                    onClick={() => navigate("/dashboard/products")}
                >
                    <MdInventory /> Produtos
                </a>

                <a
                    className={isActive("/dashboard/clients") ? "active" : ""}
                    onClick={() => navigate("/dashboard/clients")}
                >
                    <MdSupervisedUserCircle /> Clientes
                </a>

                <a
                    className={isActive("/dashboard/suppliers") || isActive("/dashboard/suppliers/new") ? "active" : ""}
                    onClick={() => navigate("/dashboard/suppliers")}
                >
                    <FaTruck /> Fornecedores
                </a>

                <a
                    className={isActive("/dashboard/reports") ? "active" : ""}
                    onClick={() => navigate("/dashboard/reports")}
                >
                    <MdAssessment /> Relatórios
                </a>

                <a
                    className={isActive("/dashboard/categories") || isActive("/dashboard/categories/new") ? "active" : ""}
                    onClick={() => navigate("/dashboard/categories")}
                >
                    <FaTag /> Categorias
                </a>

                <a
                    className={isActive("/dashboard/configs") ? "active" : ""}
                    onClick={() => navigate("/dashboard/configs")}
                >
                    <MdSettings /> Configurações
                </a>
            </nav>

            <div className="sidebar-footer">
                <a className="btn-logout" onClick={logoutUser}>
                    <MdLogout /> Sair
                </a>
            </div>
        </aside>
    );
};

export default SideBar;
