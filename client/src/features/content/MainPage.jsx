import React from "react";
import MenuBar from "./components/MenuBarComponent";
import UserSearchComponent from "../content/components/UserSearchComponent";

function MainPage() {
  return (
    <div>
      <MenuBar />
      <h1>Hello!</h1>
      <UserSearchComponent />
    </div>
  );
}

export default MainPage;
