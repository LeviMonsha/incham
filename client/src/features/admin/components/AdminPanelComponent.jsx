import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import StatisticsComponent from "./StatisticsComponent";

const AdminPanelComponent = () => {
  return (
    <div>
      <StatisticsComponent />
    </div>
  );
};

export default AdminPanelComponent;
