//@ts-nocheck

import React, { useState } from 'react';
import AddressApi from '../apis/Address';

const AddressForm = ({ onSubmit }) => {
    const [address, setAddress] = useState({
        addressLine: '',
        addressLine2: '',
        city: '',
        province: '',
        postcode: '',
        country: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAddress({
            ...address,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await AddressApi.create(address);

            if (response.status === 201) {
                const newAddress = response.data;
                setAddress({
                    AddressLine: '',
                    addressLine2: '',
                    city: '',
                    province: '',
                    postcode: '',
                    country: '',
                });
                onSubmit(newAddress);
            } else {
                console.error('Error creating Address');
            }
        } catch (error) {
            console.error('Error creating Address:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Address Line:</label>
                <input
                    type="text"
                    className="form-control"
                    name="AddressLine"
                    value={address.addressLine}
                    onChange={handleInputChange}
                    required
                />
            </div>
            {/* Add other address fields here */}
            <button type="submit" className="btn btn-primary">
                Create Address
            </button>
        </form>
    );
};

export default AddressForm;
