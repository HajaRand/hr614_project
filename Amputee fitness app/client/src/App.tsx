
import { Routes, Route } from "react-router-dom";
import Container from '@mui/material/Container';
import UserContextProvider from "./context/UserContext";
import Header from "./components/Header";

import { ThemeProvider } from '@mui/material/styles';

import FITNESSPROTheme from './themes/theme';

import Home from "./routes/Home";
import ManageUsers from "./routes/ManageUsers";

import NoPage from "./routes/NoPage";
import LoginCallback from './routes/LoginCallback';
import SetupPage from './routes/SetupPage';
import SetupUsers from './routes/SetupUsers';


const App = () => {
    return (
        <ThemeProvider theme={FITNESSPROTheme}>
        <UserContextProvider>
            <Container maxWidth="xl" sx={{ py: 3 }}>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/ManageUsers" element={<ManageUsers />} />
                    <Route path="/callback" element={<LoginCallback />} />
                    <Route path="/SetupPage" element={<SetupPage />} />
                    <Route path="/SetupUsers" element={<SetupUsers />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </Container>
        </UserContextProvider>
        </ThemeProvider>
    );
};

export default App;
