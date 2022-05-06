import {
    Card, Table, Box, MenuItem, TextField,
    TableContainer, TableHead,
    Typography, TableRow, TableCell,
    TableBody, Button, IconButton,
    TablePagination, Backdrop
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { fieldName } from '../config/table.config'
import { editable } from '../config/attr-config-editable.config'
import CustomTable from '../components/CustomTable';
import { useLocation, useParams } from 'react-router-dom';
import AdmniContainer from '../service/AdminContainer.service';
import { useDispatch } from 'react-redux'
import { setUser } from '../store/Module.action';
function ManagePage() {
    const roles = ['Admin', 'Client', 'Cooker', 'Waiter'];
    const service = new AdmniContainer();
    const [value, setValue] = useState(roles[0]);
    const [open, setOpen] = useState();
    const handleChange = (e) => {
        setValue(e.target.value);
    }
    const tmp = useRef();
    const dispatch = useDispatch();
    const param = useParams();
    const callAPI = useCallback(async () => {
        setOpen(true);
        await service.getAll('users').then(res => {
            dispatch(setUser(res.data));
            tmp.current = res.data;
        });
        setOpen(false);
    }, [])
    useEffect(() => {
        callAPI();
    }, [])
    return (
        <Box sx={{
            paddingTop: 3,
        }}>
            <Box
                className='nav'
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}>
                <IconButton>
                    <FormatListBulletedIcon color='primary' />
                </IconButton>
                <IconButton>
                    <GridViewIcon />
                </IconButton>
                <Button
                    startIcon={<AddIcon />}
                    sx={{
                        borderRadius: 5,
                        backgroundColor: 'rgba(1,227,167,1)',
                        color: 'white',
                        paddingInline: 3,
                        fontSize: 14
                    }} >
                    Thêm nhân viên
                </Button>
            </Box>
            <Box
                className='search'
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBlock: 3
                }}>
                <TextField sx={{ width: 270 }} size='small' label="ID" variant="outlined" />
                <TextField sx={{ width: 270 }} size='small' label="Name" variant="outlined" />
                <TextField
                    size='small'
                    sx={{ width: 270 }}
                    label="Role"
                    value={value}
                    onChange={handleChange}
                    select>
                    {roles.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    sx={{
                        width: 270,
                        height: 53,
                        color: 'white',
                        background:
                            'linear-gradient(180deg, rgba(1,227,167,1) 0%, rgba(9,9,121,1) 100%, rgba(40,0,128,1) 100%)'
                    }}>
                    search
                </Button>
            </Box>
            {open === false ? <CustomTable
                config={editable}
                fieldName={fieldName.engineer}
                type={param?.id}
            /> : <></>}
            <Backdrop
                sx={{ color: '#fff', zIndex: 100 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    )
}

export default ManagePage