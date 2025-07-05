import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import SignInModal from "../components/SignInModal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    }, []);

  const [modalOpen, setModalOpen] = useState(true);

  if (!isAuthenticated) {
    
    return <SignInModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />;
  }

  return <Outlet />;
};

export default PrivateRoute;