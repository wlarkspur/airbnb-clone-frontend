import {
  Button,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { editAmenities } from "../api";
import { useMutation } from "@tanstack/react-query";
import { IRoomDetail } from "../types";

interface EditRoomAndToiletsModalProps {
  data: IRoomDetail | undefined;
  refetch: () => void;
}

export default function EditRoomAndToiletsModal({
  data,
  refetch,
}: EditRoomAndToiletsModalProps) {
  interface IForm {
    roomPk: number;
    toilets: string;
    rooms: string;
    category: number | undefined;
  }

  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { register, handleSubmit, reset } = useForm<IForm>();
  const modalOpen = () => {
    onOpen();
  };
  const editAmenityMutatation = useMutation(editAmenities, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "Amenities Changed ✅",
        description: "Make your room comfort! ",
        isClosable: true,
      });
      refetch();
      onClose();
      reset();
    },
  });

  const amenitySubmit = ({ toilets, rooms }: IForm) => {
    const category = data?.category?.pk;
    const roomPk = data?.id;
    if (!toilets) {
      toilets = `${data?.toilets}`;
    }
    if (!rooms) {
      rooms = `${data?.rooms}`;
    }
    console.log(roomPk);
    editAmenityMutatation.mutate({ roomPk, toilets, rooms, category });
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as={"form"}>
          <ModalHeader>Amenities Edit</ModalHeader>
          <ModalBody>
            <HStack>
              <FormLabel w={"15%"}>Toilets</FormLabel>
              <InputGroup>
                <Input
                  {...register("toilets")}
                  type="number"
                  placeholder={`${data?.toilets}`}
                />
              </InputGroup>
            </HStack>
            <HStack mt={4}>
              <FormLabel textAlign={"center"} w={"15%"}>
                Rooms
              </FormLabel>
              <InputGroup>
                <Input
                  {...register("rooms")}
                  type="number"
                  placeholder={`${data?.rooms}`}
                />
              </InputGroup>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              onClick={handleSubmit(amenitySubmit)}
              colorScheme="whatsapp"
              mr={2}
            >
              수정
            </Button>
            <Button
              onClick={() => {
                onClose();
              }}
              colorScheme="red"
            >
              취소
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button onClick={modalOpen}>변경</Button>
    </>
  );
}
