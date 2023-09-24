import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { FaAirbnb, FaMoon, FaUserSecret, FaLock } from "react-icons/fa";

import LoginModal from "./LoginModal";
import Header from "./Header";

export default function Root() {
  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
}
