import React from 'react'
import { Typography, TextField, Container, Box, MenuItem, Select } from '@mui/material'
import { configString } from '../config/admin.config';
function DefaultInput(props) {
    const { id, name, disabled, data, dataSelect, handleChange: onChange } = props;
    const [value, setValue] = React.useState(data);
    const handleChange = (e) => {
        setValue(e.target.value);
        onChange(e);
    }
    return (
        <Box sx={{paddingInline: 2}}>
            <Typography
                fontFamily={'Roboto Slab'}
                fontWeight={900}
                fontSize={'16px'}
                marginBottom={'5px'} >{name}</Typography>
            {!dataSelect ? <TextField
                fullWidth
                variant="outlined"
                size='small'
                type={props?.type}
                id={id}
                disabled={!disabled}
                value={value}
                onChange={handleChange}
                placeholder={('Nhập ' + (name + '').toLocaleLowerCase())}
                sx={{ padding: '5px', }}
            /> :
                <Select
                    fullWidth
                    value={value}
                    variant='outlined'
                    size='small'
                    disabled={!disabled}
                    onChange={handleChange}
                    name={id}
                    sx={{
                        marginInline: 0.5,
                        width: '99.3%'
                    }}
                >
                    {dataSelect.map((item, index) => (
                        <MenuItem
                            value={configString(item)}
                            key={index}>
                            {configString(item)}
                        </MenuItem>
                    ))}
                </Select>}
        </Box>
    )
}

export default DefaultInput