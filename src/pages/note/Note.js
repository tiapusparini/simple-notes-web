import { useHistory } from "react-router-dom";
import { React, useState, useEffect } from "react";
import CustomModalTambah from "../../components/CustomModalTambah/CustomModalTambah";
import CustomModalHapus from "../../components/CustomModalHapus/CustomModalHapus";
import CustomModalDetail from "../../components/CustomModalDetail/CustomModalDetail";
import {
  Grid,
  CircularProgress,
  TextField,
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  Button,
  Container,
  ButtonGroup,
  Fab,
  Divider,
  IconButton,
  Box,
} from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import {
  getNotes,
  getNotesByIdPengguna,
  deleteNotes,
  putNotes,
  postNotes,
} from "../../functions/Notes";
import { getPengguna } from "../../functions/Pengguna";
import { Typography } from "@material-ui/core";

export default function Note() {
  const history = useHistory();
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sliceString, setSliceString] = useState([]);
  const [tambahState, setTambahState] = useState({
    kodeWarna: "",
    id_pengguna: "",
    judul: "",
    isi: "",
  });
  const [editState, setEditState] = useState({
    id: "",
    id_pengguna: "",
    kodeWarna: "",
    judul: "",
    isi: "",
  });

  //LOAD EVERYTIME THE PAGE OPEN (DOESNT HAVE ANY DATA FROM DB YET)
  useEffect(() => {
    async function getData() {
      const data = await getNotesByIdPengguna(localStorage.getItem("id"));
      let result = [];

      data.forEach((x, i) => {
        x = {
          ...x,
          no: i + 1,
          updatedAt: new Date(x.updatedAt).toLocaleDateString("en-GB"),
        };
        result.push(x);
      });
      setState(result);
      setIsLoading(false);
    }
    getData();
  }, []);

  const getDataNotes = async () => {
    const data = await getNotesByIdPengguna(localStorage.getItem("id"));
    let result = [];

    data.forEach((x, i) => {
      x = {
        ...x,
        no: i + 1,
        updatedAt: new Date(x.updatedAt).toLocaleDateString("en-GB"),
      };
      result.push(x);
    });

    setState(result);
    setIsLoading(false);
  };

  function countString(isi) {
    let length = isi.length;

    if (length >= 89) {
      let dot = "...";
      const text = isi.slice(0, 89);
      const textConcat = text.concat(dot);
      return textConcat;
    } 
    else {
      const textConcat = isi;
      return textConcat;
    }
  };

  const tambahNote = async () => {
    setIsLoading(true);
    const response = await postNotes(tambahState);
    if (response.errorMessage === null) {
      history.push(`/app/note`);
    }
    getDataNotes();
    setIsLoading(false);
    setTambahState({ judul: "", isi: "", kodeWarna: "" });
  };

  const editNotes = async () => {
    setIsLoading(true);
    const response = await putNotes(editState);
    if (response.errorMessage === null) {
      history.push(`/app/note`);
    }
    getDataNotes();
    setIsLoading(false);
    setEditState({
      id: "",
      id_pengguna: "",
      judul: "",
      isi: "",
      kodeWarna: "",
    });
  };

  return (
    <Container>
      {/* make loading sign before we getData from database */}
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <CircularProgress size={50} style={{ marginTop: 50 }} />
        </div>
      ) : (
        <Grid container spacing={2}>
          {/* If no data in database, it will show no data. Otherwise it will show all data notes */}
          {state.length ? ( //flexWrap="row wrap" alignSelf="auto" justifyContent="space-around"
            state.map((state) => (
              // <Grid container flex-wrap="wrap-reverse" justifyContent="space-between"
              // alignItems="flex-start" md={3} spacing={2}>
              <Grid item md={3} sm={6} xs={12}>
                {/* SHOW ALL NOTES */}
                <Card
                  style={{
                    backgroundColor: `${state.kodeWarna}`,
                    color: "#222831",
                  }}
                >
                  <CardContent
                    key={state.id}
                    style={{ height: 150, overFlow: "scroll" }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      style={{ minWidth: "min-content" }}
                    >
                      <Typography variant="h5" gutterBottom>
                        {state.judul}
                      </Typography>
                      <Typography variant="caption">
                        {state.updatedAt}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle1">
                      {countString(state.isi)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <CustomModalDetail
                      handleEdit={() => {
                        editNotes();
                      }}
                      handleInitialData={async () => {
                        setEditState({
                          id: state.id,
                          id_pengguna: state.id_pengguna,
                          judul: state.judul,
                          isi: state.isi,
                          kodeWarna: state.kodeWarna,
                        });
                      }}
                    >
                      <Box style={{ marginBottom: "10px" }}>
                        <IconButton
                          size="small"
                          onClick={() => {
                            const tempKodeWarna = "#9fd3c7";
                            setEditState((c) => ({
                              ...c,
                              kodeWarna: tempKodeWarna,
                            }));
                          }}
                        >
                          <FiberManualRecordIcon style={{ color: "#9fd3c7" }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => {
                            const tempKodeWarna = "#a7bcb9";
                            setEditState((c) => ({
                              ...c,
                              kodeWarna: tempKodeWarna,
                            }));
                          }}
                        >
                          <FiberManualRecordIcon style={{ color: "#a7bcb9" }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => {
                            const tempKodeWarna = "#dde0ab";
                            setEditState((c) => ({
                              ...c,
                              kodeWarna: tempKodeWarna,
                            }));
                          }}
                        >
                          <FiberManualRecordIcon style={{ color: "#dde0ab" }} />
                        </IconButton>
                      </Box>
                      <Divider />
                      <br />
                      <Typography variant="caption">Judul</Typography>
                      <TextField
                        size="small"
                        style={{ marginBottom: "13px" }}
                        fullWidth
                        value={editState.judul}
                        onChange={(e) => {
                          const tempJudul = e.target.value;
                          setEditState((c) => ({ ...c, judul: tempJudul }));
                        }}
                      />
                      <Typography variant="caption">Catatan</Typography>
                      <TextField
                        size="small"
                        fullWidth
                        multiline
                        value={editState.isi}
                        onChange={(e) => {
                          const tempIsi = e.target.value;
                          setEditState((c) => ({ ...c, isi: tempIsi }));
                        }}
                        style={{ marginBottom: "20px" }}
                      />
                    </CustomModalDetail>
                    <CustomModalHapus
                      handleDelete={async () => {
                        setIsLoading(true);
                        await deleteNotes(state.id);
                        getDataNotes();
                        setIsLoading(false);
                      }}
                    />
                  </CardActions>
                </Card>
              </Grid>
              // </Grid>
            ))
          ) : (
            <Container fixed>
              <Typography
                variant="h1"
                style={{
                  height: "60vh",
                  textAlign: "center",
                  marginTop: "10px",
                  color: "grey",
                  paddingTop: "200px",
                }}
              >
                Ayo buat catatan!
              </Typography>
            </Container>
          )}
          {/* Modal Tambah */}
          <CustomModalTambah
            handleTambah={() => {
              tambahNote();
            }}
            handleInitialData={async () => {
              setTambahState({
                kodeWarna: "#dde0ab", //`${tambahState.kodeWarna}`
                id_pengguna: localStorage.id,
                judul: "",
                isi: "",
              });
            }}
          >
            <Box style={{ marginBottom: "10px" }}>
              <IconButton
                size="small"
                onClick={() => {
                  const tempKodeWarna = "#9fd3c7";
                  setTambahState((c) => ({ ...c, kodeWarna: tempKodeWarna }));
                  console.log(tempKodeWarna);
                }}
              >
                <FiberManualRecordIcon style={{ color: "#9fd3c7" }} />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => {
                  const tempKodeWarna = "#a7bcb9";
                  setTambahState((c) => ({ ...c, kodeWarna: tempKodeWarna }));
                  console.log(tempKodeWarna);
                }}
              >
                <FiberManualRecordIcon style={{ color: "#a7bcb9" }} />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => {
                  const tempKodeWarna = "#dde0ab";
                  setTambahState((c) => ({ ...c, kodeWarna: tempKodeWarna }));
                  console.log(tempKodeWarna);
                }}
              >
                <FiberManualRecordIcon style={{ color: "#dde0ab" }} />
              </IconButton>
            </Box>
            <Divider />
            <br />
            <Typography variant="caption">Judul</Typography>
            <TextField
              autoFocus
              size="small"
              // placeholder="Ketik disini"
              style={{ marginBottom: "13px" }}
              fullWidth
              value={tambahState.judul}
              onChange={(e) => {
                const tempJudul = e.target.value;
                setTambahState((c) => ({ ...c, judul: tempJudul }));
              }}
            />
            <Typography variant="caption">Catatan</Typography>
            <TextField
              size="small"
              fullWidth
              multiline
              value={tambahState.isi}
              onChange={(e) => {
                const tempIsi = e.target.value;
                setTambahState((c) => ({ ...c, isi: tempIsi }));
              }}
              style={{ marginBottom: "20px" }}
            />
          </CustomModalTambah>
        </Grid>
      )}
    </Container>
  );
}
