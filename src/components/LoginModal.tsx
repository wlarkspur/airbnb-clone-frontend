import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  LightMode,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import SocialLogin from "./SocialLogin";
import { FaUserSecret, FaLock } from "react-icons/fa";
import { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(username, password);
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={"form"} onSubmit={onSubmit as any}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserSecret />
                  </Box>
                }
              />
              <Input
                required
                name="username"
                onChange={onChange}
                value={username}
                variant={"filled"}
                placeholder="Username"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaLock />
                  </Box>
                }
              />
              <Input
                required
                name="password"
                type="password"
                onChange={onChange}
                value={password}
                variant={"filled"}
                placeholder="Password"
              />
            </InputGroup>
          </VStack>
          <LightMode>
            <Button type="submit" mt={4} colorScheme="red" w={"100%"}>
              Log in
            </Button>
            <SocialLogin />
          </LightMode>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
