//@ts-nocheck

import React, { useState, useEffect } from 'react';
import AddressApi from '../apis/Address'; // Import the Axios API file for addresses
import AddressForm from './AddressForm'; // Import the AddressForm component

const AddressManagement = () => {
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState({});

    useEffect(() => {
        // Fetch the list of addresses when the component mounts
        const fetchData = async () => {
            try {
                const response = await AddressApi.getAll();
                setAddresses(response.data);
            } catch (error) {
                console.error('Error fetching addresses:', error);
            }
        };

        fetchData();
    }, []);

    // Handler for creating a new address
    const handleCreateAddress = async (addressData) => {
        try {
            const response = await AddressApi.create(addressData);
            if (response.status === 201) {
                // Address created successfully
                console.log('FITNESSPRO: Address created successfully:', response.data);
                // You can update the UI or perform any necessary actions here
            } else {
                console.error('Error creating address');
            }
        } catch (error) {
            console.error('Error creating address:', error);
        }
    };

    return (
        <div>
            <h2>Address Management</h2>
            <div>
                <h3>Create New Address</h3>
                {/* Render the AddressForm component for creating new addresses */}
                <AddressForm onSubmit={handleCreateAddress} />
            </div>
            <div>
                <h3>Address List</h3>
                <ul>
                    {addresses.map((address) => (
                        <li key={address.AddressId}>
                            {address.AddressLine}, {address.City}, {address.Country}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddressManagement;
