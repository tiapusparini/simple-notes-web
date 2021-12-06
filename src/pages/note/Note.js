import { useHistory } from "react-router-dom";
import { React, useState, useEffect } from "react";
import CustomModalTambah from "../../components/CustomModalTambah/CustomModalTambah";
import CustomModalHapus from "../../components/CustomModalHapus/CustomModalHapus";
import CustomModalDetail from "../../components/CustomModalDetail/CustomModalDetail";
import { Table } from "../../components/Table/Table";
import {
  Grid,
  CircularProgress,
  TextField,
  Card,
  CardActions,
  CardContent,
  Button,
  Container,
  // Tooltip,
} from "@material-ui/core";

import Tooltip from '@material-ui/core/Tooltip';

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import {
  getNotes,
  getNotesByIdPengguna,
  deleteNotes,
  putNotes,
  postNotes,
} from "../../functions/Notes";
import {getPengguna} from "../../functions/Pengguna";
import { Typography } from "@material-ui/core";

export default function Note() {
    const history = useHistory();
    const [state, setState] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tambahState, setTambahState] = useState({
      cardColor: "#ffff",
      id_pengguna: "",
      judul: "",
      isi: "",
    });
    const [editState, setEditState] = useState({
      id: "",
      id_pengguna: "",
      judul: "",
      isi: "",
    });
    
    //LOAD EVERYTIME THE PAGE OPEN (DOESNT HAVE ANY DATA FROM DB YET)
    useEffect(() => {
      async function getData() {
        const data = await getNotesByIdPengguna(localStorage.id);
        let result = [];

        data.forEach((x, i) => {
          x = { ...x, no: i + 1 };
          result.push(x);
        });
        setState(result);
        setIsLoading(false);
      }
      getData();
    }, []);
    
    const getDataNotes = async () => {
      const data = await getNotesByIdPengguna(localStorage.id);
      let result = [];
  
      data.forEach((x, i) => {
        x = { ...x, no: i + 1 };
        result.push(x);
      });
  
      setState(result);
      setIsLoading(false);
    };
    
    const tambahNote = async () => {
      setIsLoading(true);
      // console.log(tambahState);
      const response = await postNotes(tambahState);
      if (response.errorMessage === null) {
        history.push(`/app/note`);
      }
      getDataNotes();
      setIsLoading(false);
      setTambahState({ judul: "", isi: "" });
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
      });
    };

    return (
      <Container>
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <CircularProgress size={50} style={{ marginTop: 50 }} />
        </div>
      ) : (
      <Grid container spacing={2}>
        {state.map(state=>(
          <Grid item md={3} sm={6} xs={12}>
            {/* SHOW ALL NOTES */}
            <Card style={{backgroundColor: `${tambahState.cardColor}`}}>
              <CardContent>
                  <Typography variant="h5" gutterBottom>{state.judul}</Typography>
                  <Typography variant="body2">{state.isi}</Typography>
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
                    });
                  }}
                >
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
                    style={{ marginBottom: "13px" }}
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
          ))}
          {/* Modal Tambah */}
          <CustomModalTambah
            handleTambah={() => {
              tambahNote();
            }}
            handleInitialData={async () => {
              setTambahState({
                cardColor: `${tambahState.cardColor}`,
                id_pengguna: localStorage.id,
                judul: "",
                isi: "",
              });
            }}
          >
            <Typography variant="caption">Judul</Typography>
            <TextField
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
              style={{ marginBottom: "13px" }}
            />
          </CustomModalTambah>
      </Grid>
      )}
      </Container>
    );
}