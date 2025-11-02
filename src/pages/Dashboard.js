import { jwtDecode } from 'jwt-decode';

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
                <MainCard title={"Entradas"} text={"245 itens"}/>
                <MainCard title={"Saídas"} text={"120 itens"}/>
                <MainCard title={"Vendas"} text={"R$ 4.320,62"}/>
                <MainCard title={"Valor em Estoque"} text={"R$ 134.550,02"}/>
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