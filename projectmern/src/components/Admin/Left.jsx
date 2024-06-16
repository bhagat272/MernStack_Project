import React from "react";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalMallIcon from '@mui/icons-material/LocalMall';
const theme = createTheme({
  palette: {
    primary: {
      main: "#ff5722", // Your custom primary color
    },
    secondary: {
      main: "#2196f3", // Your custom secondary color
    },
  },
});

const Left = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="w-2/6 mt-2">
        <Link to="/productsadd">
          <Button variant="contained" color="primary">
            <LocalMallIcon/>&nbsp;Products
          </Button>
        </Link>
        <Link to={"/query"}>
          <Button className="ms-1 bg-secondary" variant="contained" color="secondary">
          <MailOutlineIcon/>&nbsp;  Queries
          </Button>
        </Link>
        <Link to={"/user"}>
          <Button className="ms-1 " variant="contained" color="secondary">
           <PeopleAltIcon/> &nbsp;Users
          </Button>
        </Link>
      </div>
    </ThemeProvider>
  );
};

export default Left;
