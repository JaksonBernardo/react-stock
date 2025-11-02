
import React from 'react';
import { FaBoxOpen, FaChartLine, FaUsers, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import '../css/Home.css';

import Card from '../components/pages/Card.js';

const Home = () => {

    return (
        <div className="landing-container">
            <div className="div-btn">
                <Link to='/login' className='btn-entrar'>Entrar</Link>
            </div>
            <div className="hero">
                <div className="hero-content">
                    <h1>Gestão de Estoque Inteligente</h1>
                    <p>Otimize seu estoque, controle seus relatórios e acompanhe seu negócio de forma simples e eficiente.</p>
                    <Link to="/register" className='btn-primary'>Experimente Agora</Link>
                </div>
            </div>
            <section className="features">
                <h2>Recursos da Plataforma</h2>
                <div className="features-grid">
                    <Card iconType={FaBoxOpen} size={40} title={"Controle de Estoque"} text = {"Gerencie entradas e saídas de produtos com precisão e segurança."}/>
                    <Card iconType={FaChartLine} size={40} title={"Relatórios Detalhados"} text = {"Acompanhe métricas e indicadores para decisões mais assertivas."}/>
                    <Card iconType={FaUsers} size={40} title={"Gestão de Usuários"} text = {"Controle acessos e permissões de sua equipe facilmente."}/>
                    <Card iconType={FaShieldAlt} size={40} title={"Segurança"} text = {"Dados protegidos com criptografia e autenticação segura."}/>
                </div>
            </section>
            <section className="cta">
                <h2>Comece agora a transformar sua gestão de estoque</h2>
                <Link to="/register" className='btn-primary'>Criar conta gratuita</Link>
            </section>
            <footer className="footer">
                <p>© 2025 SmartStock. Todos os direitos reservados.</p>
            </footer>
        </div>
    );

}

export default Home;