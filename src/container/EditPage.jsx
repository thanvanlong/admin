import { Box, Button, Card } from '@mui/material'
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import DefaultInput from '../components/DefaultInput'
import DefaultSelect from '../components/DefaultSelect'
import { configString } from '../config/admin.config'

function EditPage() {
    const location = useLocation();
    const obj = location.state.data[0];
    const rs = Object.keys(obj).map((key) => [key, obj[key]]);
    const data = rs.slice(1, rs.length - 1);
    console.log(data);
    return (
        <Card sx={{
            width: '100%',
            marginTop: 5,
            borderWidth: 1,
            borderStyle: 'solid',
            borderRadius: 2,
            borderColor: 'rgb(213,219,225)',
            paddingInline: 1,
            paddingBlock: 3,

        }}>
            {data.map((item, index) => (
                <DefaultInput
                    id={item[0]}
                    name={configString(item[0])}
                    data={configString(item[1])} />
            ))}
            <Box sx={{
                width: '100%',
                display: 'flex',
                paddingInline: '40%',
                justifyContent: 'space-around',
                marginTop: 5,
            }}>
                <Button sx={{
                    paddingInline: 3,
                    backgroundColor: 'rgba(1,227,167,1)',
                    color: 'white'
                }}>Submit</Button>
                <Button sx={{
                    backgroundColor: 'rgba(40,0,128,1)',
                    paddingInline: 3,
                    color: 'white'
                }}>Cancel</Button>
            </Box>
        </Card>
    )
}

export default EditPage