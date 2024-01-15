
//@ts-nocheck
import Button from '@mui/material/Button';

const TodayButton = ({ selectedDate, setSelectedDate }) => {

    const isToday = (date) => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    const handleTodayClick = () => {
        setSelectedDate(new Date());
    };

    return (
        <Button
            color="secondary"
            variant="contained"
            disabled={isToday(selectedDate)}
            onClick={handleTodayClick}
        >
            Today
        </Button>
    );
};

export default TodayButton;
