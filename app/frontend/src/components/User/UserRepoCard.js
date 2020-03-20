import React from "react";

// Material-UI
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { ReactComponent as StarIcon} from "./../../assets/star.svg";
import { ReactComponent as ForkIcon}  from "./../../assets/repo-forked.svg";

const styles = {
  card: {
    maxWidth: "100%",
    marginTop: 30
  },
  repoFooter: {
    display: "flex", 
    flexDirection: "row", 
    marginTop: 10, 
    alignItems: "center"
  },
  repoFooterMargin: {
    display: "flex", 
    marginRight: 12
  },
  iconMargin: {
    marginRight: 3
  }
};


function UserRepoCard(props) {
  const { classes, repo } = props;

  function goToRepo(repoUrl) {
    window.open(repoUrl)
  }

  return (
    <Card className={classes.card} onClick={() => goToRepo(repo.html_url)}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h6">
            {repo.name}
          </Typography>
          {repo.description}

          <div className={classes.repoFooter}>
            <small style={{ marginRight: 12}}>{repo.language}</small>
            <div className={classes.repoFooterMargin}>
              <StarIcon className={classes.iconMargin}/>
              {repo.stargazers_count}
            </div>
            <div className={classes.repoFooterMargin}>
              <ForkIcon className={classes.iconMargin}/>
              {repo.forks_count}
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default withStyles(styles)(UserRepoCard);
