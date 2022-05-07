import {
    Box, MenuItem, TextField, Typography,
    Button, IconButton, Backdrop, Dialog
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { fieldName } from '../config/table.config'
import { editable } from '../config/attr-config-editable.config'
import CustomTable from '../components/CustomTable';
import { useParams } from 'react-router-dom';
import AdmniContainer from '../service/AdminContainer.service';
import { useDispatch } from 'react-redux'
import { setUser } from '../store/Module.action';
import { configString, roleConfig } from '../config/admin.config';
function ManagePage() {
    const service = new AdmniContainer();
    const [open, setOpen] = useState();
    const [dataSearch, setDataSearch] = useState({
        id: '',
        name: '',
        role: '',
    });
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDataSearch({ ...dataSearch, [name]: value })
        setValue(value);
    };
    const tmp = useRef();
    const dispatch = useDispatch();
    const param = useParams();
    console.log(param);
    const roles = roleConfig[param?.id];
    const [value, setValue] = useState(roles[0]);
    const callAPI = useCallback(async () => {
        setOpen(true);
        await service.get(param?.id).then(res => {
            dispatch(setUser(res.data));
            tmp.current = res.data;
        });
        setOpen(false);
    }, []);
    const handleDelete = async (data) => {
        console.log(data);
        await service.delete(param?.id + '/' + data).then(res => console.log(res));
        // console.log(rs);
    }
    const handleSearch = () => {
        const newData = tmp.current.filter(
            item => (item.username + '').toLocaleLowerCase().includes(dataSearch.name) &&
                (item._id + '').toLocaleLowerCase().includes(dataSearch.id) &&
                (item.role + '').toLocaleLowerCase().includes(dataSearch.role)
        );
        console.log(newData);
    }
    useEffect(() => {
        callAPI();
    }, []);
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
                <TextField
                    sx={{ width: 270 }}
                    size='small'
                    label="ID"
                    name='id'
                    onChange={handleChange}
                    variant="outlined" />
                <TextField
                    sx={{ width: 270 }}
                    size='small'
                    name='name'
                    label="Name"
                    onChange={handleChange}
                    variant="outlined" />
                <TextField
                    size='small'
                    sx={{ width: 270 }}
                    label="Role"
                    name='role'
                    value={value}
                    onChange={handleChange}
                    select>
                    {roles.map((option) => (
                        <MenuItem key={option} value={option}>
                            {configString(option)}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    onClick={handleSearch}
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
                handleDelete={handleDelete}
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