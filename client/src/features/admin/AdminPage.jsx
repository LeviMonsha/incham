import AdminPanelComponent from "./components/AdminPanelComponent";
import MenuBar from "../content/components/MenuBarComponent";

function AdminPage() {
  return (
    <div>
      <MenuBar />
      <AdminPanelComponent />
    </div>
  );
}

export default AdminPage;
