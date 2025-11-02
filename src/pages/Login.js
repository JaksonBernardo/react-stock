import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/LoginPage.css";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
// import { PasswordOutlined } from "@mui/icons-material";

const LoginPage = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!email || !password) {

            alert('Preencha o email e senha para fazer login');
            return;

        }

        try {
            
            const response = await fetch('http://localhost:4000/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': email,
                    'password': password,
                    'username': 'Testando'
                })
            })

            const data = await response.json();

            if (response.ok) {

                if (data.token) {

                    localStorage.setItem('token', data.token);
                    navigate("/dashboard");
                    
                } else {

                    alert('Usuário ou senha inválidos');
                    return;

                }

            } else {

                console.error(data.message);
                alert('Erro ao fazer login');
                return;

            }


        } catch (error) {
            
            console.error(error);
            alert('Houve algum problema ao se conectar com o servidor');
            return;

        }

    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Bem-vindo de volta</h1>
                <p className="login-subtitle">
                    Faça login para acessar a plataforma
                </p>

                <form className="login-form">
                    <div className="input-group">
                        <EmailIcon className="input-icon" />
                        <input
                            type="email"
                            placeholder="E-mail"
                            required
                            className="login-input"
                            onInput={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <LockIcon className="input-icon" />
                        <input
                            type="password"
                            placeholder="Senha"
                            required
                            className="login-input"
                            onInput={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn-login" onClick={(e) => handleLogin(e)}>
                        Entrar
                    </button>
                </form>

                <p className="register-link">
                    Ainda não tem uma conta? <a href="/register">Cadastre-se</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
