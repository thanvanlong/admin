import React from 'react'
import { Typography, TextField, Container, Box } from '@mui/material'
function DefaultInput(props) {
    const { id, name, required, data, handleChange } = props;
    return (
        <Container>
            <Typography
                fontFamily={'Roboto Slab'}
                fontWeight={900}
                fontSize={'16px'}
                marginBottom={'5px'} >{name}</Typography>
            <TextField
                fullWidth
                variant="outlined"
                size='small'
                type={props?.type ? 'file' : 'text'}
                required={required}
                id={id}
                value={data}
                onChange={handleChange}
                placeholder={('Nhập ' + (name + '').toLocaleLowerCase())}
                sx={{ padding: '5px' }}
            />
        </Container>
    )
}

export default DefaultInput