import { Outlet } from "react-router-dom";
import AdminNavbar from "../AdminNavBar";

type AdminLayoutProps = {
  adminName?: string;
};

export default function AdminLayout({ adminName = "Admin JCI" }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <AdminNavbar adminName={adminName} notificationsCount={3} />
      <Outlet />
    </div>
  );
}