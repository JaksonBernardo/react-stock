import { jwtDecode } from 'jwt-decode';

const Reports = () => {

    const userInfos = jwtDecode(localStorage.getItem("token"));

    document.title = "Relatórios";

    return (
        <>
            <header className="dashboard-header">
                <h1>Relatórios</h1>
                <p>Acompanhe métricas e resultados detalhados das suas operações.</p>
            </header>

            {/* Filtros e botões */}
            <section className="reports-filters">
                <div className="filter-group">
                    <label>Período:</label>
                    <select>
                        <option>Últimos 7 dias</option>
                        <option>Últimos 30 dias</option>
                        <option>Último trimestre</option>
                    </select>
                </div>
                <button className="btn-generate">Gerar Relatório</button>
            </section>

            {/* Conteúdo principal */}
            <section className="reports-content">
                <h2>Resumo de Relatórios</h2>

                <div className="report-card">
                    <h3>📦 Movimentação de Estoque</h3>
                    <p>Total de entradas e saídas nos últimos 30 dias.</p>
                    <div className="chart-placeholder">
                        <p>📊 Gráfico de movimentação (em breve)</p>
                    </div>
                </div>

                <div className="report-card">
                    <h3>💰 Desempenho de Vendas</h3>
                    <p>Análise de faturamento e produtos mais vendidos.</p>
                    <div className="chart-placeholder">
                        <p>📈 Gráfico de vendas (em breve)</p>
                    </div>
                </div>

                <div className="report-card">
                    <h3>🏷️ Categorias Mais Movimentadas</h3>
                    <p>Relatório de desempenho por categoria.</p>
                    <div className="chart-placeholder">
                        <p>📉 Gráfico de categorias (em breve)</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Reports;
