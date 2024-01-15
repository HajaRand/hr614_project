
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";

const Header = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AppBar position="static">
            <Toolbar>
                {/* <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton> */}
                <Typography variant={isMobile ? 'h6' : 'h1'} style={{ flexGrow: 1 }}>
                    Fitness Pro
                </Typography>
                <Profile />
                <LoginButton />
                <LogoutButton />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
