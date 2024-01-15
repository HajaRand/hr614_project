//@ts-nocheck
import { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';

function DebouncedTextField(props:any) {
    const { onSave, value: initialValue, name, placeholder, debounceTime = 1000, ...otherProps } = props;
    const [value, setValue] = useState(initialValue || '');
    const timerRef = useRef(null);

    // Update the internal value when the initialValue prop changes
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleChange = (event:any) => {
        const newValue = event.target.value;
        setValue(newValue);

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            if (onSave) {
                onSave({ target: { name, value: newValue } });
            }
        }, debounceTime);
    };

    return (
        <TextField
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            multiline
            rows="3"
            //minRows={1}
            //maxRows={6}
            fullWidth // This makes the TextField fill the width of its parent container
            {...otherProps}
            variant="outlined"
        />
    );
}

export default DebouncedTextField;
