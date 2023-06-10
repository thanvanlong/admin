import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { nav } from "../utils/fakeData";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const tmpUrl = "/" + location.pathname.split("/")[1];
  const [selected, setSelected] = useState(
    tmpUrl !== "/edit"
      ? location.pathname
      : "/manage/" + location.pathname.split("/")[2]
  );
  const newNav = nav.filter((item) => item.url == "/");
  const CustomBtn = (props) => {
    const { id, name, icon, url } = props;
    const color1 =
      url === selected
        ? "linear-gradient(180deg, rgba(1,227,167,1) 0%, rgba(9,9,121,1) 100%, rgba(40,0,128,1) 100%)"
        : "linear-gradient(180deg, rgba(1,227,167,1) 0%, rgba(9,9,121,1) 100%, rgba(40,0,128,1) 100%)";
    const color2 = url !== selected ? "white" : "white";
    const handleClick = () => {
      setSelected(url);
      navigate(url);
    };
    return (
      <Button
        onClick={handleClick}
        sx={{
          width: "95%",
          height: 60,
          background: color1,
          fontFamily: "Roboto Slab",
          fontWeight: 900,
          color: color2,
          marginTop: 0.5,
          paddingLeft: 3,
          display: "flex",
          justifyContent: "flex-start",
        }}
        startIcon={icon}
      >
        {name}
      </Button>
    );
  };
  return (
    <Box
      sx={{
        width: "18%",
        height: 600,
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 2,
        borderColor: "rgb(213,219,225)",
        paddingTop: 3,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box>
        <img
          src="../../img/logo.png"
          width={80}
        />
      </Box>

      <Typography
        fontFamily={"Roboto Slab"}
        fontWeight={900}
        paddingBottom={2}
        paddingTop={1}
        fontSize={15}
        textAlign={"left"}
      >
        MENU
      </Typography>
      {newNav.map((item, index) => (
        <Container key={index}>
          <CustomBtn
            name={item.name}
            id={item.id}
            icon={item.icon}
            url={item.url}
          />
          <Box width={"90%"} height={"1px"} bgcolor={"rgb(213,219,225)    "} />
        </Container>
      ))}
    </Box>
  );
}

export default Nav;
