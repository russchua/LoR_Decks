import React from "react";

// Material-UI
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import UserRepoCard from "./UserRepoCard";

const styles = () => ({
  repoCard: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "flex-start",
    alignContent: "space-between",
    padding: `20px 20px 10px 20px`
  }
});

function UserProfileContent(props) {
  const { classes, repos } = props

  console.log(repos)

  return (
    <Paper className={classes.repoCard} elevation={0}>
      {repos.map((repo, id) => (
        <UserRepoCard key={id} repo={repo}/>
      ))}
    </Paper>
  );
}

export default withStyles(styles)(UserProfileContent);
