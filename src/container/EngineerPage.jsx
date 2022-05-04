import {
    Card, Table, Box, MenuItem, TextField,
    TableContainer, TableHead,
    Typography, TableRow, TableCell,
    TableBody, Button, IconButton,
    TablePagination
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { rows } from '../utils/fakeData'
import {faker} from '@faker-js/faker'
import React, { useState } from 'react'

function EngineerPage() {
    const roles = ['Admin', 'Take care', 'Cooker', 'Waiter'];
    const [value, setValue] = useState(roles[0]);
    const handleChange = (e) => {
        setValue(e.target.value);
    }
    const [sort, setSort] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [data, setData] = React.useState(rows.slice(rowsPerPage * page, rowsPerPage * (page + 1)));
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setData(rows.slice(rowsPerPage * newPage, rowsPerPage * (newPage + 1)));
    };

    const handleChangeRowsPerPage = (event) => {
        const newRowPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowPerPage);
        setData(rows.slice(newRowPerPage * page, newRowPerPage * (page + 1)))
        setPage(0);
    };
    const handleSort = (e) => {
        const name = e.currentTarget.id;
        const temp = !sort ?
            rows.slice(rowsPerPage * page, rowsPerPage * (page + 1))
                .sort((a, b) => (a[name] + '').localeCompare(b[name]))
            :
            rows.slice(rowsPerPage * page, rowsPerPage * (page + 1))
                .sort((a, b) => (b[name] + '').localeCompare(a[name]));
        setData(temp);
        setSort(!sort)
    }
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
            <TableContainer>
                <Table>
                    <TableHead sx={{ backgroundColor: 'rgb(239,239,239)' }}>
                        <TableRow>
                            <TableCell>
                                <Typography
                                    fontFamily={'Roboto Slab'}
                                    fontWeight={900}>
                                    STT
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Box display={'flex'}>
                                    <Typography
                                        fontFamily={'Roboto Slab'}
                                        fontWeight={900}>
                                        Name
                                    </Typography>
                                    <Button sx={{ maxWidth: 5 }} id='name' onClick={handleSort}
                                        startIcon={<CompareArrowsIcon sx={{ transform: 'rotate(90deg)' }} />}>
                                    </Button>
                                </Box>
                            </TableCell>
                            <TableCell align='center' >
                                <Box display={'flex'}>
                                    <Typography
                                        fontFamily={'Roboto Slab'}
                                        fontWeight={900}>
                                        ID
                                    </Typography>
                                    <Button sx={{ maxWidth: 5 }} id='id' onClick={handleSort}
                                        startIcon={<CompareArrowsIcon sx={{ transform: 'rotate(90deg)' }} />}>
                                    </Button>
                                </Box>
                            </TableCell>
                            <TableCell >
                                <Box display={'flex'}>
                                    <Typography
                                        fontFamily={'Roboto Slab'}
                                        fontWeight={900}>
                                        Sex
                                    </Typography>
                                    <Button id='sex' onClick={handleSort}
                                        startIcon={<CompareArrowsIcon sx={{ transform: 'rotate(90deg)' }} />}>
                                    </Button>
                                </Box>
                            </TableCell>
                            <TableCell >
                                <Box display='flex'>
                                    <Typography
                                        fontFamily={'Roboto Slab'}
                                        fontWeight={900}>
                                        Address
                                    </Typography>
                                    <Button id='address' onClick={handleSort}
                                        startIcon={<CompareArrowsIcon sx={{ transform: 'rotate(90deg)' }} />}>
                                    </Button>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box display={'flex'} sx={{width: 200}}>
                                    <Typography
                                        fontFamily={'Roboto Slab'}
                                        fontWeight={900}>
                                        Date of Birth
                                    </Typography>
                                    <Button id='birth' onClick={handleSort}
                                        startIcon={<CompareArrowsIcon sx={{ transform: 'rotate(90deg)' }} />}>
                                    </Button>
                                </Box>
                            </TableCell>
                            <TableCell >
                                <Box display={'flex'}>
                                    <Typography
                                        fontFamily={'Roboto Slab'}
                                        fontWeight={900}>
                                        Phone
                                    </Typography>
                                    <Button
                                        id='phone'
                                        onClick={handleSort}
                                        startIcon={<CompareArrowsIcon sx={{ transform: 'rotate(90deg)' }} />}
                                    >
                                    </Button>
                                </Box>
                            </TableCell>
                            <TableCell >
                                <Box display={'flex'}>
                                    <Typography
                                        fontFamily={'Roboto Slab'}
                                        fontWeight={900}>
                                        Email
                                    </Typography>
                                    <Button
                                        id='email'
                                        onClick={handleSort}
                                        startIcon={<CompareArrowsIcon sx={{ transform: 'rotate(90deg)' }} />}
                                    >
                                    </Button>
                                </Box>
                            </TableCell>
                            <TableCell >
                                <Box display={'flex'}>
                                    <Typography
                                        fontFamily={'Roboto Slab'}
                                        fontWeight={900}>
                                        Acion
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ overflowY: 'auto' }}>
                        {data.map((item, index) => (
                            <TableRow id={item.id} className={item.id} sx={{ cursor: 'pointer' }} onClick={(e) => { console.log(e.currentTarget) }}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell >
                                    <Typography fontFamily={'Roboto Slab'} fontWeight={900} >{faker.name.findName()}</Typography>
                                </TableCell>
                                <TableCell sx={{ width: 50 }}>
                                    <Typography fontFamily={'Roboto Slab'} fontWeight={900} >{item.id}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontFamily={'Roboto Slab'} fontWeight={900} >{faker.name.gender()}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontFamily={'Roboto Slab'} fontWeight={900} >{item.address}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontFamily={'Roboto Slab'} fontWeight={900} >{item.birth}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontFamily={'Roboto Slab'} fontWeight={900} >{faker.phone.phoneNumber()}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontFamily={'Roboto Slab'} fontWeight={900} >{faker.internet.email()}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Box display={'flex'}>
                                        <IconButton sx={{
                                            width: 40,
                                            height: 40,
                                            backgroundColor: 'rgb(47,223,132)',
                                            color: 'white',
                                            marginInline: 1,
                                        }}>
                                            <EditOutlinedIcon sx={{ fontSize: 15,}} />
                                        </IconButton>
                                        <IconButton sx={{
                                             width: 40,
                                             height: 40,
                                            backgroundColor: 'rgb(255,19,0)',
                                            color: 'white'
                                        }}>
                                            <DeleteOutlineOutlinedIcon sx={{ fontSize: 15,}}/>
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={rows.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 15, 20, 25]}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    )
}

export default EngineerPage