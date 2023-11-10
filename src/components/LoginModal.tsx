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
  Text,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import SocialLogin from "./SocialLogin";
import { FaUserSecret, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  IUsernameLoginError,
  IUsernameLoginSuccess,
  IUsernameLoginVariables,
  usernameLogIn,
} from "../api";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  username: string;
  password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(usernameLogIn, {
    onMutate: () => {
      console.log("mutation starting 🔅");
    },
    onSuccess: (data) => {
      toast({
        title: "welcome back!",
        status: "success",
      });
      onClose();
      queryClient.refetchQueries(["me"]);
    },
    onError: (error) => {
      console.log("mutation has an error ❗");
    },
  });
  const onSubmit = ({ username, password }: IForm) => {
    mutation.mutate({ username, password });
  };
  console.log(errors);
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
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
                isInvalid={Boolean(errors.username?.message)}
                required
                {...register("username", {
                  required: "사용자 이름을 입력해주세요.",
                })}
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
                isInvalid={Boolean(errors.password?.message)}
                required
                {...register("password", {
                  required: "비밀번호를 입력해야 합니다.",
                })}
                variant={"filled"}
                placeholder="Password"
              />
            </InputGroup>
          </VStack>
          <LightMode>
            <Button
              isLoading={mutation.isLoading}
              type="submit"
              mt={4}
              colorScheme="red"
              w={"100%"}
            >
              Log in
            </Button>
            <SocialLogin />
          </LightMode>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
