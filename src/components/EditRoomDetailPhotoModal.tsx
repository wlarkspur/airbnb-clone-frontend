import {
  Box,
  Button,
  DarkMode,
  FormControl,
  Image,
  Input,
  LightMode,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { IRoomDetail } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getRoom,
  getUploadURL,
  roomPhotoChange,
  uploadImage,
  uploadImageToChange,
} from "../api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useHostOnlyPage from "./HostOnlyPage";

interface IForm {
  file: FileList;
}

interface IEditRoomDetailPhotoModal {
  index: number;
  photo_pk: number | string;
  roomPk: string | undefined;
}

interface IroomPhotoChangeSubmit {
  roomPk: string;
  file: string;
  description: string;
  photo_pk: number;
}

export interface IUploadURLResponse {
  id: string;
  uploadURL: string;
}

export default function EditRoomDetailPhotoModal({
  index,
  photo_pk,
  roomPk,
}: IEditRoomDetailPhotoModal) {
  const toast = useToast();
  /* const { roomPk } = useParams(); */
  const { register, handleSubmit, watch } = useForm<IForm>();
  const { isLoading, data, refetch } = useQuery<IRoomDetail>(
    [`rooms`, roomPk],
    getRoom
  );
  const roomPhotoChangeMutation = useMutation(roomPhotoChange, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "변경사항이 저장되었습니다",
        isClosable: true,
      });
      refetch();
      onClose();
    },
    onError: () => {
      toast({
        status: "error",
        title: "Error 관리자 문의주세요",
        isClosable: true,
      });
    },
  });

  const uploadImageToChangeMutation = useMutation(uploadImageToChange, {
    onSuccess: ({ result }: any) => {
      if (roomPk) {
        roomPhotoChangeMutation.mutate({
          description: "I Love react",
          file: `https://imagedelivery.net/vb1hJxSPrA50SRWhJFXABQ/${result.id}/public`,
          roomPk,
          photo_pk,
        });
      }
    },
  }); //useMutation 받는 값 Object
  const uploadURLMutation = useMutation(getUploadURL, {
    onSuccess: (data: IUploadURLResponse) => {
      uploadImageToChangeMutation.mutate({
        uploadURL: data.uploadURL,
        file: watch("file"),
      });
    },
  });
  const roomPhotoChangeSubmit = (data: any) => {
    uploadURLMutation.mutate();
  };

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );
  const onOpenModal = (index: number) => {
    setSelectedPhotoIndex(index);
    onOpen();
  };
  /* useHostOnlyPage(); */
  return (
    <>
      <LightMode>
        <Box>
          {data?.photos[index]?.pk ? (
            <Button
              onClick={() => onOpenModal(index)}
              className="overlay-button"
              position="absolute"
              top="50%"
              left="50%"
              transform={"translate(-50%,-50%)"}
              opacity={0}
            >
              <Text>사진 변경</Text>
            </Button>
          ) : (
            <Link to={`/rooms/${roomPk}/photos`}>
              <Button
                className="overlay-button"
                position="absolute"
                top="50%"
                left="50%"
                transform={"translate(-50%,-50%)"}
                opacity={0}
              >
                <Text>사진 등록</Text>
              </Button>
            </Link>
          )}
        </Box>
      </LightMode>

      <Modal motionPreset="scale" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter={"auto"} />
        <ModalContent
          as={"form"}
          onSubmit={handleSubmit(roomPhotoChangeSubmit)}
        >
          <ModalHeader>
            <Image
              mb={3}
              rounded={"md"}
              src={data?.photos[selectedPhotoIndex ?? 0]?.file}
            />
            {selectedPhotoIndex != null ? selectedPhotoIndex + 1 : 0}번 사진을
            변경합니다
          </ModalHeader>
          <ModalBody>
            <FormControl>
              <Input
                {...register("file")}
                mb={1}
                px={1}
                py={1}
                type="file"
                accept="image/*"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={
                uploadURLMutation.isLoading ||
                uploadImageToChangeMutation.isLoading ||
                uploadImageToChangeMutation.isLoading
              }
              type="submit"
              colorScheme="whatsapp"
              mr={2}
            >
              확인
            </Button>
            <Button
              onClick={() => {
                setSelectedPhotoIndex(null);
                onClose();
              }}
              colorScheme="red"
            >
              취소
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
