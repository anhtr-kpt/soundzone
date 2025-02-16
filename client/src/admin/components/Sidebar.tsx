import NavigationBar from "@/admin/components/NavigationBar";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="fixed top-0 left-0 bottom-0 w-56 py-4 border-r">
      <Link
        to="/admin"
        className="flex justify-center items-center space-y-2 h-[72px]"
      >
        <img src="../src/assets/logo.svg" className="w-1/2" />
      </Link>
      <p className="px-8 font-semibold mt-8 mb-2">Navigation</p>
      <NavigationBar />
    </aside>
  );
};

export default AdminSidebar;
