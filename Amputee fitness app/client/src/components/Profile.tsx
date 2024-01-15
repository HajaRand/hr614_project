//@ts-nocheck

import { useAuth0 } from "@auth0/auth0-react";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Profile = () => {
    const {
        user,
        isLoading,
        isAuthenticated,
    } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    //console.log("FITNESSPRO: User Information: ", JSON.stringify(user));

    if (isAuthenticated) {
        return (
            <Box display="flex" alignItems="center">
                <Avatar 
                    alt={user?.name} 
                    src={user?.picture} 
                    title={user?.email} 
                    sx={{ width: 56, height: 56, marginRight: 2 }} 
                />
            </Box>
        );
    } else {
        return null;
    }
};

export default Profile;
