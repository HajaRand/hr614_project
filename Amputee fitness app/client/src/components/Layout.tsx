//@ts-nocheck

import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import HomeIcon from '@mui/icons-material/Home';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group'; // Icon for managing users

import { useAuth0 } from '@auth0/auth0-react';

const Layout = ({ children }) => {
    const isMobile = true; // useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const { isAuthenticated } = useAuth0();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    if (!isAuthenticated) {
        return null;
    }

    const drawerContent = (
        <List>
            <ListItemButton component="a" href="/ManageUsers">
                <ListItemIcon><HomeIcon /></ListItemIcon>
            </ListItemButton>
            <ListItemButton component="a" href="/SetupPage">
                <ListItemIcon><SettingsIcon /></ListItemIcon>
            </ListItemButton>
            <ListItemButton component="a" href="/SetupUsers"> {/* Link to ManageUsers */}
                <ListItemIcon><GroupIcon /></ListItemIcon>
            </ListItemButton>
        </List>
    );

    return (
        <div>
            {isMobile && (
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
            )}
            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? mobileOpen : true}
                onClose={handleDrawerToggle}
                anchor="left"
            >
                {drawerContent}
            </Drawer>
            <main>
                {children}
            </main>
        </div>
    );
};

export default Layout;
