import axios from "axios";

axios.defaults.baseURL = "https://tia-notes-api.herokuapp.com/";

export let axiosConfig = {
  headers: {
    Authorization: `Bearer ${localStorage.token}`,
  },
};
//`Bearer ${localStorage.token}`
export const getNotes = () => {
  return axios
    .get("data/", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => { 
      return err.response.data;
    });
};

export const getNotesById = (id) => {
  return axios
    .get("data/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getNotesByIdPengguna = (id_pengguna) => {
  return axios
    .get("data/id_pengguna/" + id_pengguna, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const postNotes = (data) => {
  const body = {
    judul: data.judul,
    isi: data.isi,
    id_pengguna: data.id_pengguna,
  };

  return axios
    .post("data/", body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const putNotes = (data) => {
  const body = {
    judul: data.judul,
    isi: data.isi,
    id_pengguna: data.id_pengguna,
  };

  return axios
    .put("data/" + data.id, body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deleteNotes = (id) => {
  return axios
    .delete("data/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
