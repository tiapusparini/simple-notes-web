import axios from "axios";

axios.defaults.baseURL = "https://tia-notes-api.herokuapp.com/";

const axiosConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getPengguna = () => {
  return axios
    .get("pengguna/", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getPenggunaById = (id) => {
  return axios
    .get("pengguna/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

// export const postPengguna = (pengguna) => {
//   const body = {
//     nama: pengguna.nama,
//     username: pengguna.username,
//     password: pengguna.password,
//   };

//   return axios
//     .post("pengguna/", body, axiosConfig)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((err) => {
//       return err.response.data;
//     });
// };

export const putPengguna = (pengguna) => {
  const body = {
    nama: pengguna.nama,
    username: pengguna.username,
    password: pengguna.password,
  };

  return axios
    .put("pengguna/" + pengguna.id, body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deletePengguna = (id) => {
  return axios
    .delete("pengguna/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
