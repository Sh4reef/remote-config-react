import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ParameterFormDrawer from "../../views/parameter-form-drawer";
import IdentityParameterFormDrawer from "../../views/identity-parameter-form-drawer";

const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login", { state: { from: location.pathname }, replace: true });
    }
  }, [navigate, state, location]);

  return (
    <>
      <Outlet />
      <ParameterFormDrawer />
      <IdentityParameterFormDrawer />
    </>
  );
};

export default DashboardPage;
