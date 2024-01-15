//@ts-nocheck

import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextProvider } from "../context/UserContextProvider";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import { getAllUsers } from '../apis/User';

const audienceUri = import.meta.env.VITE_APP_AUTH0_AUDIENCE;
const BASE_URL = `${audienceUri}/api/v1`; // Replace with your API URL

const UserList = (props) => {
    const [myUsers, setMyUsers] = useContext(UserContext);
    const { user, isLoading, isAuthenticated, getAccessTokenSilently, getIdTokenClaims } = useAuth0();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (true) {

                    const token = await getAccessTokenSilently();
                    //console.log("FITNESSPRO: token", token);

                    const config = { headers: { Authorization: `Bearer ${token}`} };
                    const response = await getAllUsers(config);

                    //console.log("FITNESSPRO: UserList1: " + JSON.stringify(response));

                    const data = await response.data;
                    //const dataValues = await data.users;

                    console.log("FITNESSPRO: UserList - data ", data)

                    setMyUsers(data);
                }
            } catch (error) {
                console.log("FITNESSPRO: UserList " + error);
            }
        };
        fetchData();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">First Name</TableCell>
                        <TableCell align="left">Last Name</TableCell>
                        <TableCell align="left">Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {myUsers && myUsers.map((nameValue, index) => (
                        <TableRow key={index}>
                            <TableCell align="left">{nameValue.firstname}</TableCell>
                            <TableCell align="left">{nameValue.lastname}</TableCell>
                            <TableCell align="left">{nameValue.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserList;
