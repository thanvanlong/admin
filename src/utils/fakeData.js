import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import TableRestaurantOutlinedIcon from '@mui/icons-material/TableRestaurantOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import {faker} from '@faker-js/faker'
export const nav = [
    {
        id: 1,
        name: 'Trang chủ',
        url: '/',
        icon: <HomeOutlinedIcon />
    },
    {
        id: 2,
        name: 'Thêm sách',
        url: '/add/book',
        icon: <EngineeringOutlinedIcon />
    },
    {
        id: 3,
        name: 'Thực đơn',
        icon: <FastfoodOutlinedIcon />
    },
    {
        id: 4,
        name: 'Bàn ăn',
        icon: <TableRestaurantOutlinedIcon />
    },
    {
        id: 5,
        name: 'Sự kiện',
        icon: <EventNoteOutlinedIcon />
    },
    {
        id: 6,
        name: 'Đơn đặt',
        icon: <AccountBalanceWalletOutlinedIcon />
    },
    {
        id: 7,
        url: '/edit',
        name: 'Chỉnh sửa'
    }
];

export const content = [
    {
        name: 'Sách',
        img: '../../img/enginee.png',
        quantity: 2000,
    },
    {
        name: 'Nhân viên',
        img: '../../img/cooking.png',
        quantity: 2000,
    },
    {
        name: 'Người dùng',
        img: '../../img/table.png',
        quantity: 2000,
    },
    {
        name: 'Tổng doanh thu',
        img: '../../img/income.png',
        quantity: 200000000,
    }
];

