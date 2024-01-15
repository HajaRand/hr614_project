//@ts-nocheck

import { UserContext } from "./UserContextProvider";
import { useState } from "react";

const UserContextProvider = (props:any) => {

    const [myUsers, setMyUsers] = useState([]);

    return (
        <UserContext.Provider value={[ myUsers, setMyUsers ]}>
            {props.children}
        </UserContext.Provider>
        );
    };

export default UserContextProvider;
