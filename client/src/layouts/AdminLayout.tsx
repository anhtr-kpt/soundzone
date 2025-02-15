import Header from "@/admin/components/Header";
import AdminSidebar from "@/admin/components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="bg-black relative min-h-screen w-full text-white flex font-nunito">
      <Header />
      <AdminSidebar />
      <main className="flex-grow p-8 ml-56 mt-[72px]">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
