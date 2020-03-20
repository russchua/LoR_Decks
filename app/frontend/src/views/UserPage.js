import React, { Component } from "react";
import Spinner from "../components/Layouts/Spinner";

// Redux
import { connect } from "react-redux";
import UserProfileContainer from "../components/User/UserProfileContainer";

class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }
  render() {
    if (this.props.isLoading) {
      return <Spinner />;
    } else {
      return <UserProfileContainer userDetails={this.props.userDetails} />;
    }
  }
}

const mapStateToProps = state => ({
  isLoading: state.search.isLoading,
  userDetails: state.user.userDetails
});

export default connect(
  mapStateToProps,
  null
)(UserPage);
