import React, { Component } from "react";
import axios from "axios";
import UserProfileHeader from "./UserProfileHeader";
import UserProfileContent from "./UserProfileContent";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";

// Material-UI
import withStyles from "@material-ui/core/styles/withStyles";

//TODO: Exception handling for users without company, location, blog

const styles = () => ({
  paper: {
    margin: "15px 150px 15px 150px",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    alignContent: "space-between",
    padding: `20px 10px 10px 10px`
  },
  imgLogo: {
    marginRight: "20px"
  },
  nameContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end"
  },
  nameTitle: {
    paddingRight: "10px"
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: "20px"
  },
  userInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start"
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row"
  },
  icon: {
    paddingRight: "5px"
  },
  padBottom: {
    paddingBottom: "10px"
  }
});

class UserProfileContainer extends Component {
  state = {
    avatarUrl: "",
    name: "",
    username: "",
    bio: "",
    company: "",
    location: "",
    blog: "",
    followers: 0,
    following: 0,
    reposCount: 0,
    reposUrl: "",
    repos: [],
    profilePage: ""
  };

  componentDidMount() {
    axios.get(this.props.userDetails.url).then(res => {
      console.log(res.data);
      this.setState({
        avatarUrl: res.data.avatar_url,
        name: res.data.name,
        username: res.data.login,
        bio: res.data.bio,
        company: res.data.company,
        location: res.data.location,
        blog: res.data.blog,
        followers: res.data.followers,
        following: res.data.following,
        reposCount: res.data.public_repos,
        reposUrl: res.data.repos_url,
        profilePage: res.data.html_url
      });

      axios.get(res.data.repos_url).then(res => {
        this.setState({
          repos: res.data
        })
      })
    });
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionAppear={true}
        transitionAppearTimeout={700}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        <div style={{ margin: "0 auto", maxWidth: 1020, marginTop: 30}}>
          <UserProfileHeader
            avatarUrl={this.state.avatarUrl}
            name={this.state.name}
            username={this.state.username}
            bio={this.state.bio}
            company={this.state.company}
            location={this.state.location}
            blog={this.state.blog}
            followers={this.state.followers}
            following={this.state.following}
            reposCount={this.state.reposCount}
            profilePage={this.state.profilePage}
          />
          <UserProfileContent repos={this.state.repos}/>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default withStyles(styles)(UserProfileContainer);
