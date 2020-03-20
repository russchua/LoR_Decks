import React from "react";
import UserCard from "./UserCard";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

function Users(props) {
  const { userData, history } = props;

  return (
    <>
      {userData.length > 0 ? 
        <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
          <p style={{ backgroundColor: "#fcf8bb" }}>
            Found {userData.length} results
          </p>
        </div>
      : null}
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionAppear={true}
        transitionAppearTimeout={700}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
      <div style={{ margin: "0 auto", maxWidth: 1020 }}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {userData.map((user, id) => (
            <UserCard key={id} user={user} history={history} />
          ))}
        </div>
      </div>
      </ReactCSSTransitionGroup>
    </>
  );
}

export default Users;
