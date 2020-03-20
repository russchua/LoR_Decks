import React, { Component } from "react";
import Users from "../components/User/Users";
import Spinner from "../components/Layouts/Spinner";

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
    if (this.props.isLoading) {
      return <Spinner />;
    } else {
      return (
        <Users userData={this.props.usersList} history={this.props.history} />
      );
    }
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
