import axios from "axios";

axios.defaults.baseURL = "https://tia-notes-api.herokuapp.com/";

export const getNotes = () => {
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
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
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
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
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
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
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const body = {
    judul: data.judul,
    isi: data.isi,
    kodeWarna: data.kodeWarna,
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
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const body = {
    judul: data.judul,
    isi: data.isi,
    kodeWarna: data.kodeWarna,
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
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return axios
    .delete("data/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
