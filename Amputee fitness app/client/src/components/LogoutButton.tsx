//@ts-nocheck
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        return (
            <Button variant="contained" color="secondary" onClick={() => logout({ returnTo: window.location.origin })}>
                Log Out
            </Button>
        );
    } else {
        return null;
    }
};

export default LogoutButton;
