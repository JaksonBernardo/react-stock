import React, { useState } from 'react';
import { MdPerson, MdEmail, MdLock } from 'react-icons/md';
import '../css/Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    
    const navigate = useNavigate();

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleCreateAdmin = async (event) => {

        try {
            
            var response = await fetch('http://localhost:4000/admin/create-admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': email,
                    'password': password,
                    'username': username
                })
            }).then(response => response.json())
          
            alert(`${response.message}`);
            navigate("/login");

        } catch (error) {
            
            alert("Ocorreu um erro ao cadastrar");
            return;

        }

    }

    return (
        <div className="register-page">
            <div className="register-overlay">
                <div className="register-card">
                    <h1 className="register-title">Crie sua conta</h1>
                    <p className="register-subtitle">Gerencie seus estoques de forma inteligente</p>

                    <div className="register-form-modern">
                        <div className="form-group icon-input">
                            <MdPerson className="input-icon" />
                            <input
                                type="text"
                                name="username"
                                placeholder="Nome de usuário"
                                onInput={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group icon-input">
                            <MdEmail className="input-icon" />
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                onInput={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group icon-input">
                            <MdLock className="input-icon" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Senha"
                                onInput={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn-primary btn-glow" onClick={(e) => handleCreateAdmin(e)}>Criar conta</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
