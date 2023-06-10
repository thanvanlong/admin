import React, { useEffect, useState } from "react";
import {Card, Box, Button, IconButton, TextField, Checkbox} from "@mui/material";
import DefaultInput from "../components/DefaultInput";
import MultipleSelectChip from "../components/MultipleSelect";
import { Backdrop, Dialog, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import AdminContainer from "../service/AdminContainer.service";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CircularProgress from "@mui/material/CircularProgress";
import {useNavigate, useParams} from "react-router-dom";
import { configDate } from "../config/admin.config";
function AddPageV2() {
  const param = useParams();
  console.log(param);
  const [imgPrev, setImgPrev] = useState();
  const [files, setFiles] = useState();
  const service = new AdminContainer();
  const [audio, setAudio] = useState();
  const [open, setOpen] = useState(false);
  const [dt, setDt] = useState({ categories: [] });
  const [dialog, setDialog] = useState(false);
  const [rsApi, setRsApi] = useState();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    if (e.target.name === "category") {
      setDt({
        ...dt,
        ["categories"]: [
          ...dt["categories"],
          { ["title"]: value[value.length - 1] },
        ],
      });
    } else {
      setDt({ ...dt, [name]: value });
    }
  };

  const callAPI = React.useCallback(async () => {
    if (param["id"] && param["id"] != "book") {
      await service.getById("music" + "/" + param["id"]).then((res) => {
        const tt = Object.keys(res.data);
        convertData(tt, res.data);
        setImgPrev(res.data?.image);
      });
    }
    // setOpen(true);
    // await service.getAllCategory().then((res) => {
    //   setCategories(res);
    // });
    // setOpen(false);
  }, []);

  useEffect(() => {
    callAPI();
  }, []);

  const convertData = (data, obj) => {
    let t = {};
    let temp = [];
    data.map((key) => {
      t = { ...t, [key]: obj[key] };
      if (key === "categories") {
        obj[key].map((category) => {
          temp.push(category?.title);
          console.log(category);
        });
      }
    });
    setDt(t);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!files && !imgPrev) {
      setRsApi({ data: "Vui lòng chọn anh", errorCode: "400" });
      setDialog(true);
      return;
    } else if (
      files?.type !== "image/jpeg" &&
      files?.type != "image/png" &&
      !imgPrev
    ) {
      setRsApi({ data: "File ảnh không hợp lệ!!", errorCode: "400" });
      setDialog(true);
      return;
    }
    setOpen(true);
    console.log(param)
    if (param["id"] && param['id'] == 'book') {
      var formData = new FormData();
      if (files) {
        formData.append("image", files);
      }
      if (audio) {
        formData.append("audio", audio)
      }
      Object.keys(dt).map((item) => {
        if (item != 'url' && item != 'categories' && item != 'updatedAt' && item != 'genre' && item != 'createdAt') {
          formData.append(item, dt[item])
        }
      })
      axios
          .put("http://14.225.205.30:8081/api/v1/music/" + dt.id, formData, {
            headers: {
              Accept: "application/json ,text/plain, */*",
              "Content-Type": "multipart/form-data",
              'Authorization': 'Bearer '+ localStorage.getItem("USER"),
            },
          })
          .then((res) => {
            console.log(res);
            setOpen(false);
            setDialog(true);
            navigate("/")
          });
    } else {
      var formData = new FormData();
      const json = JSON.stringify(dt);
      formData.append("image", files);
      formData.append("audio", audio)
      Object.keys(dt).map((item) => {
        if (item != 'url' && item != 'categories') {
          formData.append(item, dt[item])
        }
      })
      axios
        .post("http://14.225.205.30:8081/api/v1/music", formData, {
          headers: {
            Accept: "application/json ,text/plain, */*",
            "Content-Type": "multipart/form-data",
            'Authorization': 'Bearer '+ localStorage.getItem("USER"),
          },
        })
        .then((res) => {
          console.log(res);
          setOpen(false);
          setDialog(true);
          navigate("/")
        });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const objectUrl = URL.createObjectURL(acceptedFiles[0]);
      setFiles(acceptedFiles[0]);
      setImgPrev(objectUrl);
    },
  });

  return (
    <Card
      sx={{
        width: "100%",
        height: "auto",
        marginTop: 5,
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 2,
        borderColor: "rgb(213,219,225)",
        paddingInline: 2,
        paddingBlock: 3,
      }}
    >
      <form>
        <Box sx={{ width: "100%", display: "flex" }}>
          <Box sx={{ width: "65%" }}>
            <DefaultInput
              id={"title"}
              name={"Tên bài hát"}
              disabled={true}
              data={dt?.title}
              handleChange={handleChange}
            />
            <DefaultInput
              id={"artist"}
              name={"Nghệ sĩ"}
              disabled={true}
              data={dt?.artist}
              handleChange={handleChange}
            />
            <DefaultInput
              id={"authors"}
              name={"Tác giả"}
              disabled={true}
              data={dt?.authors ? dt?.authors?.[0]?.name : ''}
              handleChange={handleChange}
            />
            <DefaultInput
              id={"album"}
              name={"Album"}
              disabled={true}
              data={dt?.album}
              handleChange={handleChange}
            />
          </Box>
          <Box
            sx={{
              width: "28%",
              borderStyle: "dashed",
              borderRadius: 5,
              borderColor: "#3333",
              padding: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 6,
            }}
          >
            {imgPrev ? (
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    width: "100%",
                    maxHeight: 250,
                    marginRight: 3,
                  }}
                >
                  <img
                    width={"100%"}
                    src={imgPrev}
                    alt={"img"}
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </Box>

                <IconButton
                  sx={{
                    width: "15%",
                    position: "absolute",
                    top: -15,
                    right: -15,
                  }}
                  onClick={() => {
                    setImgPrev();
                  }}
                >
                  {localStorage.getItem("USER") ? (
                    <HighlightOffOutlinedIcon sx={{ color: "black" }} />
                  ) : (
                    <></>
                  )}
                </IconButton>
              </Box>
            ) : (
              <IconButton
                variant="outline"
                sx={{ width: "100%", height: "100%", padding: 10 }}
                {...getRootProps({ className: "dropzone" })}
              >
                <input
                  type={'file'}
                  accept={"image/*"}
                  hidden
                  {...getRootProps({ className: "dropzone" })}
                  required
                />
                <CloudUploadIcon sx={{ width: "100%", height: "100%" }} />
              </IconButton>
            )}
          </Box>
        </Box>
        <Box>
          <Box sx={{ paddingInline: 2 }}>
            <Typography
                fontFamily={"Roboto Slab"}
                fontWeight={900}
                fontSize={"16px"}
                marginLeft={1}
                marginBottom={"5px"}
            >
              File bài hát
            </Typography>
            <Box style={{
              borderRadius: 3,
              borderWidth: 10,
              width: '99%',
              marginLeft: 8,
              borderColor: 'black',
              display: 'flex',
              height: 80,
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <audio controls style={{width: "70%", display: !dt?.url ? 'none' : 'flex'}} src={dt?.url}>
              </audio>
              <Button
                  component="label"
                  sx={{
                    paddingInline: 3,
                    backgroundColor: "rgba(1,227,167,1)",
                    color: "white",
                  }}
              >
                Upload File
                <input
                    type="file"
                    onChange={(e) => {
                      console.log(e.target.files)
                      var file = e.target.files[0];
                      var fileURL = URL.createObjectURL(file);
                      setDt({...dt, url: fileURL})
                      setAudio(file)
                    }}
                    accept={"audio/*"}
                    hidden
                />
              </Button>
            </Box>
          </Box>
          <DefaultInput
            id={"releaseDate"}
            name={"Năm xuất bản"}
            disabled={true}
            data={dt?.releaseDate}
            handleChange={handleChange}
            type={"text"}
          />
        </Box>
        {localStorage.getItem("USER") ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              paddingInline: "35%",
              justifyContent: "space-around",
              marginTop: 6,
            }}
          >
            <Button
              onClick={handleSubmit}
              // type={"submit"}
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
        ) : (
          <></>
        )}
      </form>
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
            {rsApi?.data}
          </Typography>
          <Typography textAlign={"center"}>
            {rsApi?.errorCode === "200" ? (
              <CheckCircleOutlineIcon
                sx={{
                  color: "green",
                  fontSize: 200,
                }}
              />
            ) : (
              <ErrorOutlineIcon
                sx={{
                  color: "red",
                  fontSize: 200,
                }}
              />
            )}
          </Typography>
        </Box>
      </Dialog>
    </Card>
  );
}

export default AddPageV2;
