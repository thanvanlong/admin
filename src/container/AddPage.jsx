import { Box, Button, Card, Backdrop, Typography, Dialog } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState, useCallback } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import DefaultInput from '../components/DefaultInput'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { configField, configString, configDate } from '../config/admin.config'
import AdmniContainer from '../service/AdminContainer.service'

function AddPage() {
    const param = useParams();
    const type = param['id'];
    const obj = configField[type];
    const field = Object.keys(obj).filter(key => obj[key].create === true);
    const service = new AdmniContainer();
    const [dt, setDt] = useState({});
    const [dialog, setDialog] = useState(false);

    // const rs = Object.keys(obj).map((key) => [key, obj[key]]);
    // const callAPI = useCallback(async () => {
    //     setOpen(true);
    //     await service.getById(type + '/' + param['id']).then(res => {
    //         setObj(res.data);
    //         const tt = Object.keys(res.data);
    //         console.log(tt);
    //         convertData(tt, res.data);
    //     });
    //     setOpen(false);
    // }, []);
    const convertData = useCallback((data) => {
        let t = {};
        data.map((key) => {
            t = { ...t, [key]: '' };
        })
        console.log(t);
        setDt(t);
    },[])
    useEffect(() => {
        convertData(field);
    }, []);
    const [open, setOpen] = useState(false);
    const handleChange = (e) => {
        const name = e.target.name ? e.target.name : e.target.id;
        const value = e.target.value;
        setDt({ ...dt, [name]: value });
    };
    const handleSubmit = async () => {
        console.log(dt);
        setOpen(true);
        const rs = await service.create(type, dt);
        console.log(rs);
        setOpen(false)
        setDialog(true);
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
            {field.map((item, index) => {
                const typeConfig = configField[type];
                const tmp = typeConfig[item];
                return (
                    <DefaultInput
                        id={item}
                        name={configString(item)}
                        type={tmp?.type}
                        data={dt[item]}
                        dataSelect={tmp?.data}
                        disabled={true}
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
            <Dialog
                open={dialog}
                onClose={() => {
                    setDialog(false);
                }} >
                <Box sx={{
                    width: 500,

                    backgroundColor: 'white',
                    padding: 5
                }}>
                    <Typography
                        fontFamily={'Roboto Slab'}
                        fontSize={20}
                        textAlign={'center'}
                        textTransform={'uppercase'}
                        paddingBottom={5}
                        paragraph>
                        Cập nhật thành công!!
                    </Typography>
                    <Typography textAlign={'center'}>
                        <CheckCircleOutlineIcon sx={{
                            color: 'green',
                            fontSize: 200
                        }} />
                    </Typography>
                </Box>
            </Dialog>
        </Card>
    )
}

export default AddPage