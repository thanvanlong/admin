import React, { useCallback, useEffect, useRef } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
} from 'chart.js';
import {Box, Card, Backdrop, CircularProgress, Typography, Snackbar, IconButton, Button} from '@mui/material';
import CardContent from '../components/CardContent';
import { content } from '../utils/fakeData';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../components/CustomTable';
import { fieldName } from '../config/table.config'
import { editable } from '../config/attr-config-editable.config'
import { over } from 'stompjs'
import SockJS from 'sockjs-client'
import { setCountNotifi, setOrderPending } from '../store/Module.action';
import AdmniContainer from '../service/AdminContainer.service';
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
function HomePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const service = new AdmniContainer();
    const listOrders = useRef([]);
    const [backDrop, setBackDrop] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const callAPI = useCallback(async () => {
        // setBackDrop(true);
        await service.get('music?limit=1000')
            .then(res => {
                listOrders.current = res.data?.results
                dispatch(setOrderPending(res.data?.results))
            })
        // setBackDrop(false);
    }, []);

    const handleDelete = async (data) => {
        console.log(data);
        await service
            .delete("music", {ids: [data]})
            .then((res) => console.log(res));
        // console.log(rs);
    };
    useEffect(() => {
        callAPI();
    }, []);
    return (
        <>
            <Card width={'100%'} sx={{ padding: 5 }} >
                <Box
                    className="nav"
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}
                >
                    <IconButton>
                        <FormatListBulletedIcon color="primary" />
                    </IconButton>
                    <IconButton>
                        <GridViewIcon />
                    </IconButton>
                    <Button
                        startIcon={<AddIcon />}
                        disabled={localStorage.getItem("USER") ? false : true}
                        onClick={() => {
                            navigate("/add/" + "book");
                        }}
                        sx={{
                            borderRadius: 5,
                            backgroundColor: "rgba(1,227,167,1)",
                            color: "white",
                            paddingInline: 3,
                            fontSize: 14,
                        }}
                    >
                        Thêm nhạc
                    </Button>
                </Box>
                <Box sx={{
                    width: 200,
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginBottom: 2,
                }}>
                    <Box
                        sx={{
                            width: 3,
                            height: 30,
                            background: 'linear-gradient(180deg, rgba(1,227,167,1) 0%, rgba(9,9,121,1) 100%, rgba(40,0,128,1) 100%)'
                        }} />
                    <Typography fontFamily={'Roboto Slab'} fontWeight={900}>Danh sách bài hát</Typography>
                </Box>
                <Box width={'100%'} height={'1px'} bgcolor={'rgb(213,219,225)'} />
                <CustomTable
                    config={editable}
                    fieldName={fieldName.music}
                    handleDelete={handleDelete}
                    type={'orders'} />
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={open}
                    onClose={() => { setOpen(false) }}
                    message="Có một đơn mới kìa!! Check ngay thôi"
                // key={vertical + horizontal}
                />
                <Backdrop
                    sx={{ color: '#fff', zIndex: 100 }}
                    open={false}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Card>
        </>
    )
}

export default HomePage
