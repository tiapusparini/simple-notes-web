import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import classnames from "classnames";
import { Box, IconButton, Link } from "@material-ui/core";
import Icon from "@mdi/react";

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
} from "@mdi/js";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Note from "../../pages/note/Note";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
// import Kerjasama from "../../pages/kerjasama/Kerjasama";
// import TambahKerjasama from "../../pages/kerjasama/TambahKerjasama";
// import EditKerjasama from "../../pages/kerjasama/EditKerjasama";

// import ProgramStudi from "../../pages/programstudi/ProgramStudi";
// import JenisPartner from "../../pages/jenispartner/JenisPartner";
// import JenisDokumen from "../../pages/jenisdokumen/JenisDokumen";
// import BentukKegiatan from "../../pages/bentukkegiatan/BentukKegiatan";
// import Mahasiswa from "../../pages/mahasiswa/Mahasiswa";
// import Negara from "../../pages/negara/Negara";
// import Tingkat from "../../pages/tingkat/Tingkat";
// import Kategori from "../../pages/kategori/Kategori";
// import Dosen from "../../pages/dosen/Dosen";
// import Publikasi from "../../pages/publikasi/Publikasi";
// import TambahPublikasi from "../../pages/publikasi/TambahPublikasi";
// import Penelitian from "../../pages/penelitian/Penelitian";
// import PengabdianMasyarakat from "../../pages/pengabdianmasyarakat/PengabdianMasyarakat";
// import PrestasiMahasiswa from "../../pages/prestasimahasiswa/PrestasiMahasiswa";
// import Sertifikasi from "../../pages/sertifikasi/Sertifikasi";
// import StudiLanjut from "../../pages/studilanjut/StudiLanjut";
// import Nidk from "../../pages/nidk/Nidk";
// import Haki from "../../pages/haki/Haki";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        {/* <Sidebar /> */}
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/note" component={Note} />
            <Route path="/app/ui/icons" component={Icons} />
            <Route path="/app/ui/charts" component={Charts} />
          </Switch>
          <Box
            mt={5}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent="space-between"
          >
            {/* <div>
              <Link
                color={"primary"}
                href={"https://flatlogic.com/"}
                target={"_blank"}
                className={classes.link}
              >
                Flatlogic
              </Link>
              <Link
                color={"primary"}
                href={"https://flatlogic.com/about"}
                target={"_blank"}
                className={classes.link}
              >
                About Us
              </Link>
              <Link
                color={"primary"}
                href={"https://flatlogic.com/blog"}
                target={"_blank"}
                className={classes.link}
              >
                Blog
              </Link>
            </div>
            <div>
              <Link
                href={"https://www.facebook.com/flatlogic"}
                target={"_blank"}
              >
                <IconButton aria-label="facebook">
                  <Icon path={FacebookIcon} size={1} color="#6E6E6E99" />
                </IconButton>
              </Link>
              <Link href={"https://twitter.com/flatlogic"} target={"_blank"}>
                <IconButton aria-label="twitter">
                  <Icon path={TwitterIcon} size={1} color="#6E6E6E99" />
                </IconButton>
              </Link>
              <Link href={"https://github.com/flatlogic"} target={"_blank"}>
                <IconButton aria-label="github" style={{ marginRight: -12 }}>
                  <Icon path={GithubIcon} size={1} color="#6E6E6E99" />
                </IconButton>
              </Link>
            </div> */}
          </Box>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
