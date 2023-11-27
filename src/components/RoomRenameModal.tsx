import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Toast,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getRoom, roomNameChange } from "../api";
import { IRoomDetail } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "../lib/useUser";
import useHostOnlyPage from "./HostOnlyPage";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface ICategory {
  pk: number | undefined;
}

export interface IRename {
  name: string;
  roomPk: string;
  category: ICategory;
}

export default function RoomRenameModal() {
  const { user } = useUser();
  const naviagate = useNavigate();
  const { roomPk } = useParams();
  const { register, handleSubmit, setValue } = useForm<IRename>();
  const { isLoading, data, refetch } = useQuery<IRoomDetail>(
    [`rooms`, roomPk],
    getRoom
  );
  const {
    isOpen: isRenameOpen,
    onClose: onRenameClose,
    onOpen: onRenameOpen,
  } = useDisclosure();
  const toast = useToast();
  const roomNameChangeMutation = useMutation(roomNameChange, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "방 이름 변경이 완료되었습니다.",
        isClosable: true,
      });
      onRenameClose();
      // API 호출 후 변경된 정보 다시 가져오기
      refetch();
    },
    onError: () => {
      toast({
        status: "error",
        title: `Error 관리자에게 문의하세요`,
      });
    },
  });
  const [dynamicRoomPk, setDynamicRoomPk] = useState<string | undefined>();
  // roomPk를 useParams에서 가져온뒤 roomPk값이 나타날때 dynamicRoomPk의 상태를 업데이트하여 URL에서 추출한 roomPk값을 유지한다. 그 뒤 다시 useEffect함수 내에서 useForm의 setValue함수를 통해 "roomPk"의 값을 미리 저장된 dynamicRoomPk값으로 바꿔서 roomNameChangeSubmit함수에서 api로 전달될 수 있도록 코드를 작성함.
  useEffect(() => {
    setDynamicRoomPk(roomPk);
  }, [roomPk]);
  useEffect(() => {
    setValue("roomPk", dynamicRoomPk || "");
  }, [dynamicRoomPk, setValue]);

  const roomNameChangeSubmit = ({ name, roomPk }: IRename) => {
    if (!user?.is_host) {
      naviagate("/");
    }
    if (data) {
      /* const roomPk = data?.id + ""; */
      const category = data?.category?.pk;
      roomNameChangeMutation.mutate({ name, roomPk, category });
    }
  };
  return (
    <>
      <Button onClick={onRenameOpen} type="submit" size={"md"}>
        변경
      </Button>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isRenameOpen}
        onClose={onRenameClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rename room</ModalHeader>
          <ModalCloseButton />
          <ModalBody as={"form"} onSubmit={handleSubmit(roomNameChangeSubmit)}>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaHome />
                  </Box>
                }
              />
              <Input
                type="text"
                {...register("name")}
                placeholder={data?.name}
                variant={"filled"}
              />
            </InputGroup>

            <Button
              w={"full"}
              type="submit"
              mt={4}
              mb={4}
              colorScheme="whatsapp"
            >
              Rename
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
