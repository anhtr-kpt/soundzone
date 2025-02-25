import Header from "@/admin/components/Header";
import AdminSidebar from "@/admin/components/Sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

const AdminLayout = () => {
  return (
    <div className="relative min-h-screen w-full flex font-nunito">
      <Header />
      <AdminSidebar />
      <main className="flex-grow p-8 ml-56 mt-[72px]">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};

export default AdminLayout;
