import React, { useState, useEffect, createContext, useContext, useMemo }  from 'react';
import Header from './Header.jsx';
import Body from './Body.jsx';
import { getOrders }from '../data/dataMethods';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const Main = () => {
    const [results, setResults] = useState({});
    const [isDrafts, setIsDrafts] = useState(false);
    const [mode, setMode] = useState('light');
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const ColorModeContext = createContext({ toggleColorMode: () => {} });
    const colorMode = useContext(ColorModeContext);
    
    useEffect(() => {
        const handleDataFetch = (res) => {
            setResults(res.data);
        }
        getOrders(handleDataFetch)
    }, []);

    const theme = useMemo(
        () =>
        createTheme({
            palette: {
            mode,
            ...(mode === 'light' ?
                {
                    primary: {
                        main: '#ffffff',
                    },
                    secondary: {
                        main: '#000000',
                        light: '#DCDBDC !important',
                    },
                    info: {
                        main: '#000000',
                    }

                } : {
                    primary: {
                        main: '#000000',
                        light: '#282828'
                    },
                    secondary: {
                        main: '#FFFFFF',
                        light: '#FFFFFF !important',
                    },
                    info: {
                        main: '#000000',
                    }
                }

            )
            },
        }),
        [mode],
    );
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMode = () =>  {
        if(mode === 'light'){
            setMode('dark')
        } else {
            setMode('light')
        }
        handleClose();
    };

    return (
        <React.Fragment>
            <Header 
                theme={theme} 
                colorMode={colorMode} 
                setIsDrafts={setIsDrafts} 
                isDrafts={isDrafts} 
                setAnchorEl={setAnchorEl}
                anchorEl={anchorEl}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                {mode === 'light' ?
                    <MenuItem onClick={handleMode}>Dark Mode</MenuItem>
                :
                    <MenuItem onClick={handleMode}>Light Mode</MenuItem>
                }
            </Menu>
            <Body theme={theme} isDrafts={isDrafts} results={results}/>

        </React.Fragment>
    )
}

export default Main;
