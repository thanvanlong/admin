import { Box, Button, Card, Divider, Typography } from '@mui/material'
import { nav } from '../utils/fakeData'
import React, { useState } from 'react'

function Nav() {
    const [selected, setSelected] = useState(1);
    const CustomBtn = ({ id, name, icon }) => {
        const color1 = id === selected ?
            "linear-gradient(180deg, rgba(1,227,167,1) 0%, rgba(9,9,121,1) 100%, rgba(40,0,128,1) 100%)"
            :
            'white';
        const color2 = id !== selected ? 'rgb(22,41,56)' : 'white';
        return (
            <Button
                onClick={() => { setSelected(id) }}
                sx={{
                    width: '95%',
                    height: 60,
                    background: color1,
                    fontFamily: 'Roboto Slab',
                    fontWeight: 900,
                    color: color2,
                    marginTop: 0.5,
                    paddingLeft: 3,
                    display: 'flex',
                    justifyContent: 'flex-start'
                }}
                startIcon={icon}
            >{name}
            </Button>
        );
    };
    return (
        <Box sx={{
            width: '18%',
            height: 600,
            borderWidth: 1,
            borderStyle: 'solid',
            borderRadius: 2,
            borderColor: 'rgb(213,219,225)',
            paddingTop: 3,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            
        }}>
            <Box>
                <img src='https://phanexpress.com/WebLauPhan/theme/Phan_logoEx.svg' width={80} />
            </Box>

            <Typography
                fontFamily={'Roboto Slab'}
                fontWeight={900}
                paddingBottom={2}
                paddingTop={1}
                fontSize={15}
                textAlign={'left'}>
                MENU
            </Typography>
            {nav.map((item, index) => (
                <>
                    <CustomBtn name={item.name} id={item.id} icon={item.icon} />
                    <Box width={'90%'} height={'1px'} bgcolor={'rgb(213,219,225)    '} />
                </>
            ))}
        </Box>
    )
}

export default Nav