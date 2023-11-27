import { useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";
import React, { useEffect } from "react";
/* 
interface IHostOnlyPageProps {
  children: React.ReactNode;
}
 */
export default function useHostOnlyPage() {
  const { user, isLoggedIn, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!user?.is_host) {
        navigate("/");
      }
    }
  }, [userLoading, user, navigate]);
  return;
}
