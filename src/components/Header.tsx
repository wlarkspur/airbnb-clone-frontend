import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  ToastId,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { Link, useNavigate, useParams } from "react-router-dom";
import useUser from "../lib/useUser";
import { getRoom, logOut } from "../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { IRoomDetail } from "../types";

export default function Header() {
  const { roomPk } = useParams();
  const navigate = useNavigate();
  const { userLoading, user, isLoggedIn } = useUser();
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClos,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("red.500", "red.200");
  const Icon = useColorModeValue(FaMoon, FaSun);
  const toast = useToast();
  const queryClient = useQueryClient();
  const toastId = useRef<ToastId>();
  const mutation = useMutation(logOut, {
    onMutate: () => {
      toastId.current = toast({
        title: "Login out...",
        description: "Sad to see you go",
        status: "loading",
        position: "bottom-right",
      });
    },
    onSuccess: () => {
      if (toastId.current) {
        if (!isLoggedIn) {
          queryClient.refetchQueries([`me`]);
        }

        toast.update(toastId.current, {
          status: "success",
          title: "Done",
          description: " See you later!",
        });
      }
    },
  });

  const onLogOut = async () => {
    mutation.mutate();
    queryClient.refetchQueries(["me"]);
  };
  return (
    <Stack
      justifyContent={"space-between"}
      alignItems={"center"}
      py={5}
      px={80}
      direction={{
        sm: "column",
        md: "row",
      }}
      spacing={{
        sm: 3,
        md: 0,
      }}
      borderBottomWidth={1}
    >
      <Box color={logoColor}>
        <Link to={"/"}>
          <FaAirbnb size={"48px"} />
        </Link>
      </Box>

      <HStack spacing={2}>
        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dar mode" //aria-label은 텍스트 음성읽기 기능을 위함.
          icon={<Icon />}
        />
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>Log in</Button>
              <LightMode>
                <Button onClick={onSignUpOpen} colorScheme="red">
                  Sign up
                </Button>
              </LightMode>
            </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar name={user?.name} src={user?.avatar} size={"md"} />
              </MenuButton>
              <MenuList>
                {user?.is_host ? (
                  <Link to={"/rooms/upload"}>
                    <MenuItem>Upload room</MenuItem>
                  </Link>
                ) : null}
                <MenuItem onClick={onLogOut}>Log out</MenuItem>
              </MenuList>
            </Menu>
          )
        ) : null}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClos} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
}
