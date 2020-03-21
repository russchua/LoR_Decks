import React from "react";
import PropTypes from "prop-types";

import LorLogo from "./../../assets/LoR-logo.png";

// Material-UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%",
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  toolbar: {
    background: "black"
  },
  logo: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer"
  }
});

const routeToHome = history => {
  history.push("/");
};

const Header = props => {
  const { classes, history } = props;

  return (
    <div style={{ backgroundColor: "black" }}>
      <div style={{ margin: "0 auto", maxWidth: 1020}}>
        <AppBar
          position="static"
          className={classes.root}
          elevation={0} // Removes box-shadow
        >
          <Toolbar 
            className={classes.toolbar} 
            onClick={() => routeToHome(history)}
          >
            <div className={classes.logo}>
             <img src={LorLogo} alt="LorLogo" width="150" height="50" style={{ marginRight: 10 }} />
            </div>
            <div className={classes.grow} />
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
