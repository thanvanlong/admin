import { Box, Button, Card, Backdrop } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState, useCallback } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import DefaultInput from '../components/DefaultInput'
import DefaultSelect from '../components/DefaultSelect'
import { configField, configString, configDate } from '../config/admin.config'
import AdmniContainer from '../service/AdminContainer.service'

function EditPage() {
    const param = useParams();
    const service = new AdmniContainer();
    const type = Object.keys(param).filter(item => item !== 'id')[0];
    const [obj, setObj] = useState({});
    const [dt, setDt] = useState({});

    const rs = Object.keys(obj).map((key) => [key, obj[key]]);
    const tt = Object.keys(obj);
    const callAPI = useCallback(async () => {
        setOpen(true);
        await service.getById(type + 's/' + param['id']).then(res => {
            setObj(res.data);
        });
        setOpen(false);
    }, [])
    useEffect(() => {
        let t = {};
        const tmp = tt.map((key) => {
            const newItem = { ...dt, [key]: obj[key] };
            t = { ...t, [key]: obj[key] };
        })
        console.log(t);
        setDt(t)
        callAPI();
    }, []);
    const [open, setOpen] = useState(false);
    const data = rs.slice(1, rs.length - 1);
    const handleChange = (e) => {
        const name = e.target.name ? e.target.name : e.target.id;
        const value = e.target.value;
        setDt({ ...dt, [name]: (value + '').toLocaleLowerCase() })
    };
    const handleSubmit = async () => {
        console.log(dt);
        const rs = await service.update(type, dt);
        console.log(rs);
    }
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
            {data.map((item, index) => {
                const typeConfig = configField[type];
                const tmp = typeConfig[item[0]];
                return (
                    <DefaultInput
                        id={item[0]}
                        name={configString(item[0])}
                        data={tmp?.type === 'date' ? configDate(item[1]) : configString(item[1])}
                        type={tmp?.type}
                        disabled={tmp?.visiable}
                        dataSelect={tmp?.data}
                        key={index}
                        handleChange={handleChange}
                    />
                )
            })}
            <Box sx={{
                width: '100%',
                display: 'flex',
                paddingInline: '40%',
                justifyContent: 'space-around',
                marginTop: 5,
            }}>
                <Button
                    onClick={handleSubmit}
                    sx={{
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
            <Backdrop
                sx={{ color: '#fff', zIndex: 100 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Card>
    )
}

export default EditPage