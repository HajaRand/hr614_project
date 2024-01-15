//@ts-nocheck
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_APP_AUTH0_CLIENT_ID;
const redirectUri = import.meta.env.VITE_APP_AUTH0_CALLBACK_URL;
const audienceUri = import.meta.env.VITE_APP_AUTH0_AUDIENCE;

export const Auth0ProviderWithNavigate = ({ children }) => {
    const navigate = useNavigate();
    const onRedirectCallback = (appState:any) => {
        navigate(appState?.returnTo || window.location.pathname);
    };

    console.log("FITNESSPRO: OAuth:", domain, clientId, redirectUri, audienceUri);

    if (!(domain && clientId && redirectUri)) {
        return null;
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
                audience: `${audienceUri}`,
                scope: "openid email profile"
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};
