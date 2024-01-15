//@ts-nocheck

import React, { Dispatch } from "react";
import UserList from "../components/UserList";
import Layout from "../components/Layout";

const ManageUsers = () => {
    return (
        <div className="mainscreen">
            <div className="content">
                <Layout></Layout>
                <UserList />
            </div>
        </div>
    );
};

export default ManageUsers;
