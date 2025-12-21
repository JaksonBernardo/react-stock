import { jwtDecode } from 'jwt-decode';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import InventoryIcon from '@mui/icons-material/Inventory';

import MainCard from '../components/main/MainCard';

const Dashboard = () => {

    const userInfos = jwtDecode(localStorage.getItem("token"));
    
    document.title = `Bem vindo, ${userInfos.name} !`;

    return (
        <>
            <header className="dashboard-header">
                <h1>Bem-vindo, {userInfos.name}</h1>
                <p>Gerencie seu estoque e acompanhe seus relatórios em tempo real.</p>
            </header>

            {/* Cards de resumo */}
            <section className="stats-cards">
                <MainCard icon={<TrendingUpIcon size={24} />} title={"Entradas"} value={"R$ 15.235,77"}/>
                <MainCard icon={<TrendingDownIcon size={24} />} title={"Saídas"} value={"R$ 12.009,32"}/>
                <MainCard icon={<CurrencyExchangeIcon size={24} />} title={"Vendas"} value={"R$ 19.207,82"}/>
                <MainCard icon={<InventoryIcon size={24} />} title={"Estoque"} value={"R$ 134.550,02"}/>
            </section>

            {/* Gráficos / Relatórios */}
            <section className="charts-section">
                <h2>Visão Geral</h2>
                <div className="chart-placeholder">
                    <p>📊 Gráfico de movimentações (em breve)</p>
                </div>
            </section>
        </>
    )

}

export default Dashboard;