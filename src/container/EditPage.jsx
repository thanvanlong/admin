import {
  Box,
  Button,
  Card,
  Backdrop,
  Typography,
  Dialog,
  FormControl,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import DefaultInput from "../components/DefaultInput";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { configField, configString, configDate } from "../config/admin.config";
import AdmniContainer from "../service/AdminContainer.service";

function EditPage() {
  const param = useParams();
  const service = new AdmniContainer();
  const type = Object.values(param).filter((item) => item !== "id")[0];
  const [obj, setObj] = useState({});
  const [dt, setDt] = useState({});
  const [dialog, setDialog] = useState(false);

  console.log(obj);
  const rs = Object.keys(obj).map((key) => [key, obj[key]]);
  const callAPI = useCallback(async () => {
    setOpen(true);
    await service.getById(type + "/" + param["id"]).then((res) => {
      setObj(res.data);
      const tt = Object.keys(res.data);
      console.log(tt);
      convertData(tt, res.data);
    });
    setOpen(false);
  }, []);
  const convertData = (data, obj) => {
    let t = {};
    data.map((key) => {
      t = { ...t, [key]: obj[key] };
    });
    console.log(t);
    setDt(t);
  };
  useEffect(() => {
    callAPI();
  }, []);
  const [open, setOpen] = useState(false);
  const data = rs.filter((item) => item[0] !== "_id" && item[0] !== "__v");
  const handleChange = (e) => {
    const name = e.target.name ? e.target.name : e.target.id;
    const value = e.target.value;
    console.log(name + "::::::" + value);
    if (name === "neutered") {
      setDt({ ...dt, [name]: value });
    } else {
      setDt({ ...dt, [name]: value });
    }
  };
  console.log(dt);
  const handleSubmit = async () => {
    console.log(dt);
    const key = Object.keys(dt);
    let check = false;
    key.map((item) => {
      if (!dt[item]) {
        alert("Please enter field");
        check = true;
      }
    });

    if (!check) {
      console.log(key);
      const rs = await service.update(type, dt);
      setDialog(true);
    }
  };
  return (
    <Card
      sx={{
        width: "100%",
        marginTop: 5,
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 2,
        borderColor: "rgb(213,219,225)",
        paddingInline: 1,
        paddingBlock: 3,
      }}
    >
      {data.map((item, index) => {
        const typeConfig = configField[type];
        const tmp = typeConfig[item[0]];
        console.log(tmp);
        return (
          <DefaultInput
            id={item[0]}
            name={configString(item[0])}
            data={tmp?.type === "date" ? configDate(item[1]) : item[1]}
            type={tmp?.type}
            disabled={tmp?.visiable}
            dataSelect={tmp?.type === "select" ? [true, false] : null}
            key={index}
            handleChange={handleChange}
          />
        );
      })}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          paddingInline: "40%",
          justifyContent: "space-around",
          marginTop: 5,
        }}
      >
        <Button
          onClick={handleSubmit}
          sx={{
            paddingInline: 3,
            backgroundColor: "rgba(1,227,167,1)",
            color: "white",
          }}
        >
          Submit
        </Button>
        <Button
          sx={{
            backgroundColor: "rgba(40,0,128,1)",
            paddingInline: 3,
            color: "white",
          }}
        >
          Cancel
        </Button>
      </Box>
      <Backdrop sx={{ color: "#fff", zIndex: 100 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        open={dialog}
        onClose={() => {
          setDialog(false);
        }}
      >
        <Box
          sx={{
            width: 500,

            backgroundColor: "white",
            padding: 5,
          }}
        >
          <Typography
            fontFamily={"Roboto Slab"}
            fontSize={20}
            textAlign={"center"}
            textTransform={"uppercase"}
            paddingBottom={5}
            paragraph
          >
            Cập nhật thành công!!
          </Typography>
          <Typography textAlign={"center"}>
            <CheckCircleOutlineIcon
              sx={{
                color: "green",
                fontSize: 200,
              }}
            />
          </Typography>
        </Box>
      </Dialog>
    </Card>
  );
}

export default EditPage;
