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
  useToast,
} from "@chakra-ui/react";
import SocialLogin from "./SocialLogin";
import { FaUserSecret, FaLock, FaEnvelope, FaUserAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../api";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface ISign {
  name: string;
  email: string;
  username: string;
  password: number;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ISign>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(signUp, {
    onSuccess: () => {
      toast({
        title: "환영합니다 :)",
        status: "success",
      });
      onClose();
      reset();

      queryClient.refetchQueries(["me"]);
    },
    onError: (error: any) => {
      console.log(`mutation에 오류가 있어요: ${error.response?.data?.error}`);
      const apiErrorMessage =
        error.response?.data?.error || "회원가입 중 오류가 발생했어요";
      toast({
        title: "에러",
        description: apiErrorMessage,
        status: "error",
        position: "top",
      });
    },
  });
  const onSubmit = ({ name, email, username, password }: ISign) => {
    mutation.mutate({ name, email, username, password });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign up</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserAlt />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.name?.message)}
                required
                {...register("name", {
                  required: "이름을 입력해주세요",
                })}
                variant={"filled"}
                placeholder="Name"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.email?.message)}
                required
                {...register("email", {
                  required: "Email 주소를 입력해주세요",
                })}
                variant={"filled"}
                placeholder="Email"
              />
            </InputGroup>
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
                  required: "Username을 입력해주세요",
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
                type="password"
                required
                {...register("password", {
                  required: "Password를 입력해주세요",
                })}
                variant={"filled"}
                placeholder="Password"
              />
            </InputGroup>
          </VStack>
          <LightMode>
            <Button type="submit" mt={4} colorScheme="red" w={"100%"}>
              Sign up
            </Button>
            {mutation.isError}
            <SocialLogin />
          </LightMode>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
