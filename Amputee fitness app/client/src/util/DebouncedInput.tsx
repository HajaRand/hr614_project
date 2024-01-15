//@ts-nocheck

import { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';

function DebouncedInput(props) {
    const { onSave, value: propValue, ...otherProps } = props;
    const [internalValue, setInternalValue] = useState(propValue || '');
    const timer = useRef(null);

    useEffect(() => {
        setInternalValue(propValue);
    }, [propValue]);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setInternalValue(newValue);

        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            onSave({
                target: {
                    name: event.target.name,
                    value: newValue
                }
            });
        }, 1000);
    };

    return (
        <TextField
            onChange={handleChange}
            value={internalValue}
            {...otherProps}
            variant="outlined"
        />
    );
}

export default DebouncedInput;
