import AdminSidebar from "@/admin/components/Sidebar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="bg-black relative min-h-screen w-full flex">
      <AdminSidebar />
      <main className="flex-grow p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
