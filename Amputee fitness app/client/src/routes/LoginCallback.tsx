import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom';
import { callback as Callback }  from '../apis/Rbac';

const LoginCallback = () => {
    const navigate = useNavigate(); 
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    console.log("FITNESSPRO: LoginCallback0");

    useEffect(() => {

            const fetchData = async () => {
                try {
                    if (isAuthenticated) {
                        console.log("FITNESSPRO: LoginCallback1");
                        const token = await getAccessTokenSilently();
                        const config = { headers: { Authorization: `Bearer ${token}` } };
                        await Callback(config);

                        navigate('/');
                    };
                } catch (error) {
                    console.error('FITNESSPRO: Error calling server login:', error);
                }


            }
        fetchData();
    }, [isAuthenticated]);

    return (
       null
    );
};

export default LoginCallback;
