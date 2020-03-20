import React from "react";

// Material-UI
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

// Icons
import CompanyIcon from "@material-ui/icons/People";
import LocationIcon from "@material-ui/icons/LocationOn";
import BlogIcon from "@material-ui/icons/Link";

const styles = () => ({
  paper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    alignContent: "space-between",
    padding: `20px 20px 10px 20px`
  },
  imgLogo: {
    marginRight: "20px"
  },
  nameContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end"
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: "20px"
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row"
  },
  icon: {
    paddingRight: "5px"
  }
});

function UserProfileHeader(props) {
  const {
    classes,
    avatarUrl,
    name,
    username,
    bio,
    company,
    location,
    blog,
    followers,
    following,
    reposCount,
    profilePage
  } = props;

  return (
    <Paper className={classes.paper} elevation={0}>
      <div className={classes.imgLogo}>
        <img src={avatarUrl} height="200" width="200" alt="new" />
      </div>
      <div>
        <div className={classes.nameContainer}>
          <Typography style={{ paddingRight: "10px" }} variant="h5">
            {name}
          </Typography>
          <Typography>
            <a href={profilePage}>@{username}</a>
          </Typography>
        </div>

        <Typography style={{ paddingBottom: "10px" }}>{bio}</Typography>

        <>
          {company ? <div className={classes.iconContainer}>
            <CompanyIcon className={classes.icon} />
            <Typography>{company}</Typography>
          </div>: null}

          {location ? <div className={classes.iconContainer}>
            <LocationIcon className={classes.icon} />
            <Typography>{location}</Typography>
          </div>: null}

          {blog ? <div className={classes.iconContainer}>
            <BlogIcon className={classes.icon} />
            <Typography>
              <a href={blog}>{blog}</a>
            </Typography>
          </div> : null}
        </>

        <div
          style={{
            display: "flex",
          }}
        >
          <div className={classes.userInfo}>
            <Typography variant="h5">{followers}</Typography>
            <Typography>Followers </Typography>
          </div>

          <div className={classes.userInfo}>
            <Typography variant="h5">{following}</Typography>
            <Typography>Following </Typography>
          </div>

          <div className={classes.userInfo}>
            <Typography variant="h5">{reposCount}</Typography>
            <Typography>Repos </Typography>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default withStyles(styles)(UserProfileHeader);
