import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { makeBooking } from "../api";
import { formatDate } from "../lib/utils";
import { FaUser } from "react-icons/fa";
import { IRoomDetail } from "../types";

interface IBookingComfirmModal {
  data: IRoomDetail | undefined;
  dates: Date[] | undefined;
  isCheckingBooking: boolean;
  checkBookingData: any;
}

export default function BookingConfirmModal({
  data,
  dates,
  isCheckingBooking,
  checkBookingData,
}: IBookingComfirmModal) {
  interface IBookingForm {
    roomPk: string | undefined;
    check_in: string;
    check_out: string;
    guests: number;
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm<IBookingForm>();
  const toast = useToast();
  const bookingMutation = useMutation(makeBooking, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "Reservation Done !",
        description: "Hope you enjoy 😄",
      });
      onClose();
    },
  });
  const makeBookingSubmit = ({ guests }: IBookingForm) => {
    const check_in = formatDate((dates && dates[0]) ?? null);
    const check_out = formatDate((dates && dates[1]) ?? null);
    const roomPk = `${data?.id}`;

    bookingMutation.mutate({ roomPk, check_in, check_out, guests });
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as={"form"}>
          <ModalHeader>게스트 인원수를 명시해주세요</ModalHeader>
          <ModalBody>
            <InputGroup>
              <InputLeftElement>
                <FaUser />
              </InputLeftElement>
              <Input {...register("guests")} />
            </InputGroup>
            <Button
              type="submit"
              onClick={handleSubmit(makeBookingSubmit)}
              isDisabled={!checkBookingData?.ok}
              isLoading={isCheckingBooking}
              mt={4}
              w={"100%"}
              colorScheme="linkedin"
            >
              Make Booking
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Button
        onClick={onOpen}
        isDisabled={!checkBookingData?.ok}
        isLoading={isCheckingBooking}
        mt={5}
        w={"100%"}
        colorScheme="red"
      >
        Make Booking
      </Button>
    </>
  );
}
