//@ts-nocheck
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Layout from "../components/Layout";
import HomeImage from '../assets/images/Home.jpeg'; // Adjust the path as needed

const Home = () => {
    return (
        <Box sx={{ height: '100vh', overflow: 'hidden' }}>
            <Layout />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '100%',
                    backgroundImage: `url(${HomeImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <Box sx={{ textAlign: 'center' }}> {/* Container for centering Typography */}
                    <Typography variant="h1" color="primary" gutterBottom>
                        Welcome to Trustree Pro
                    </Typography>
                    <Typography variant="h3" color="secondary" gutterBottom>
                        A system to guide Lower Limb amputees to be optimal fitness
                    </Typography>  
                    <Typography variant="h5" color="secondary" gutterBottom>
                        Cusomise Your Routine
                        Keep track of Progress
                        Ask the community questions and keep in touch
                    </Typography>                
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
