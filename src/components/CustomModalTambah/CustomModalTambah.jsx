import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Button, IconButton, Box, Divider, ButtonGroup, Tooltip, Fab } from "@material-ui/core";
import AddRoundedIcon from '@material-ui/icons/AddRounded';

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #c2c2a3",
    boxShadow: theme.shadows[20],
    padding: theme.spacing(2, 4, 3),
    overflowY: "auto",
    maxHeight: "600px",
    borderRadius: "8px",
  },
  bottom: {
    position: "fixed",
    bottom: 50,
    right: 78,
    fontSize: 47,
    color: "primary",
  },
}));

export const CustomModalTambah = ({ handleTambah, handleInitialData, children }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <h2>Buat Catatan</h2>
        <ButtonGroup>
          <Fab 
            color="primary" 
            size="small"
            onClick={() => {
              handleInitialData();
            }}></Fab>
          <Fab color="secondary" size="small"></Fab>
          <Fab color="warning" size="small"></Fab>
        </ButtonGroup>
      </Box>
      <Divider />
      <br />
      {children}
      <Divider />
      <Box
        mt={4}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button onClick={handleClose} variant="contained" color="default">
          Batal
        </Button>
        <Button
          onClick={() => {
            handleTambah();
            handleClose();
          }}
          variant="contained"
          color="primary"
        >
          Tambah
        </Button>
      </Box>
    </div>
  );

  return (
    <div>
      <ButtonGroup>
        <Tooltip title="Buat Catatan" placement="left">
          <IconButton 
              variant="contained"
              aria-controls="profile-menu"
              className={classes.bottom}
              onClick={() => {
                handleInitialData();
                handleOpen();
              }}
          >
              <AddRoundedIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default CustomModalTambah;
