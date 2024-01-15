//@ts-nocheck
import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';

interface CalendarDatePickerProps {
    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
}

const CalendarDatePicker: React.FC<CalendarDatePickerProps> = ({ selectedDate, setSelectedDate }) => {
    const handleDateChange = (date: Date | null) => {
        console.log("FITNESSPRO: handleDateChange: ", date);
        setSelectedDate(date);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
                inputFormat="yyyy-MM-dd"
            />
        </LocalizationProvider>
    );
};

export default CalendarDatePicker;
