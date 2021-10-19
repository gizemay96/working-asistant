import {React , useState , useEffect} from 'react'

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import PickersDay from '@mui/lab/PickersDay';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { ClickAwayListener } from "@material-ui/core";


const TextFieldCustom = styled(TextField)({
    '& label.Mui-focused': {
        color: '#c852e5',
    },
    '& label.Mui-focused': {
        color: '#c852e5',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: '#c852e5',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#c852e5',
        },
        color: "white"
    },
});




const theme = createTheme({
    palette: {
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "#07152a"
                }
            }
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    outline: 'none',
                    color: 'white',
                    border: "none"
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    outline: "none"

                }
            }
        },
    },
});

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) =>
        prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
    backgroundColor: "#27293d",
    color: "white",
    ":hover": {
        backgroundColor: "#1565c0"
    },
}));

function CustomDatePicker({setDateToParent}) {
    const [value, setValue] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);

    const handleClickAway = () => { if (isOpen) { console.log('ww'); setIsOpen(false); } };
    const handleClick = () => setIsOpen(!isOpen);


    useEffect(() => {
        setDateToParent(value);
        renderWeekPickerDay();
    }, [value])


    const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
        if (!value) {
            return <CustomPickersDay {...pickersDayProps} />;
        }


        return (
            <CustomPickersDay
                {...pickersDayProps}
                disableMargin
            />
        );
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <ClickAwayListener onClickAway={handleClickAway}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div className="dark-blue-picker">
                            <DatePicker
                                open={isOpen}
                                onClose={handleClick}
                                onOpen={handleClick}
                                label="Release Date"
                                value={value}
                                inputFormat="dd/MM/yyyy"
                                onChange={(newValue) => { setValue(newValue); }}
                                renderDay={renderWeekPickerDay}
                                renderInput={(params) => <TextFieldCustom onClick={handleClick} id="custom-css-outlined-input" {...params} style={{ width: "100%", color: "white", outlineColor: "white", borderBlock: "none" }} />}
                            />
                        </div>
                    </LocalizationProvider>
                </ClickAwayListener>
            </ThemeProvider>
        </div>
    )
}

export default CustomDatePicker;
