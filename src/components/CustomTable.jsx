import React, { useState } from 'react'
import {
  Card, Table, Box, MenuItem, TextField,
  TableContainer, TableHead,
  Typography, TableRow, TableCell,
  TableBody, Button, IconButton,
  TablePagination,
} from '@mui/material'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function CustomTable(props) {
  const {  config, fieldName, type } = props;
  const [sort, setSort] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const rows = props?.rows;
  const temp = useSelector(state => state);
  console.log(props);
  const rows = temp?.listUser;
  const [data, setData] = useState(rows?.slice(rowsPerPage * page, rowsPerPage * (page + 1)));
  const navigate = useNavigate();
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
  const handleEdit = (e) => {
    const row = rows.filter(item => item._id == e.currentTarget.id);
    navigate('/edit/' + type + '/' + e.currentTarget.id,{
      state:{
        data: row,
      }
    });
  }
  const handleDelete = () => {

  }
  const handleSelect = () => {

  }
  return (
    <>
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
              {fieldName.map((item, index) => (
                <TableCell>
                  <Box display={'flex'}>
                    <Typography
                      fontFamily={'Roboto Slab'}
                      fontWeight={900}>
                      {item}
                    </Typography>
                    <Button sx={{ maxWidth: 5 }} id={(item + '').toLowerCase()} onClick={handleSort}
                      startIcon={<CompareArrowsIcon sx={{ transform: 'rotate(90deg)' }} />}>
                    </Button>
                  </Box>
                </TableCell>
              ))}
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
              <TableRow id={item._id} className={item._id} sx={{ cursor: 'pointer' }} onClick={handleSelect}>
                <TableCell>{index + 1}</TableCell>
                {fieldName.map((it, index) => (
                  <TableCell key={index}>
                    <Typography fontFamily={'Roboto Slab'} fontWeight={900} >
                      {item[(it + '').toLocaleLowerCase()]}
                    </Typography>
                  </TableCell>
                ))}
                <TableCell>
                  <Box display={'flex'}>
                    <IconButton
                      disabled={!config.btnEdit}
                      onClick={handleEdit}
                      id={item._id}
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: 'rgb(47,223,132)',
                        color: 'white',
                        marginInline: 1,
                      }}>
                      <EditOutlinedIcon sx={{ fontSize: 15, }} />
                    </IconButton>
                    <IconButton
                      disabled={!config.btnDelete}
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: 'rgb(255,19,0)',
                        color: 'white'
                      }}>
                      <DeleteOutlineOutlinedIcon sx={{ fontSize: 15, }} />
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
    </>
  )
}

export default React.memo(CustomTable)