import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.js';
import Register from './pages/Register.js';
import LoginPage from './pages/Login.js';
import MainContent from './pages/MainContent.js';

import ProtectedRoute from './ProtectedRoutes.js';

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#357b37",
		},
	},
});

function App() {
	return (
		<>	
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Routes>
						<Route exact path='/' element={<Home />} />
						<Route exact path='/register' element={<Register />} />
						<Route exact path='/login' element={<LoginPage />} />
						<Route
							path="/dashboard/*"
							element={
								<ProtectedRoute>
									<MainContent />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</>
	);
}

export default App;
