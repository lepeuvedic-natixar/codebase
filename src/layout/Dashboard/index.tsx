import { Outlet } from "react-router-dom"
import AuthGuard from "utils/route-guard/AuthGuard"

const DashboardLayout = () => (
  <AuthGuard>
    <Outlet />
  </AuthGuard>
)

export default DashboardLayout
