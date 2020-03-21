import React, { Component } from "react";
import Spinner from "../components/Layouts/Spinner";
import Search from "../components/Header/Search";

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

// Redux
import { connect } from "react-redux";

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usersList: [],
      isLoading: false
    };
  }

  render() {
    function Footer() {
      return (
        <div style={{ position:"absolute", left: 0, bottom: 0, right: 0, marginBottom: 10 }}>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Source code can be found here
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </div>
      );
    }

    return (
      <>
        <Container maxWidth="sm" style={{ marginTop: 10 }}>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Key in your incomplete deck code to start completing your deck.
          </Typography>
          <Search />
        </Container>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = state => ({
  usersList: state.search.usersList,
  isLoading: state.search.isLoading
});

export default connect(
  mapStateToProps,
  null
)(MainPage);
