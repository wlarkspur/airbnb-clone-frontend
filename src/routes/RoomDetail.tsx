import Calendar from "react-calendar";
import type { Value } from "react-calendar/dist/cjs/shared/types";
import "react-calendar/dist/Calendar.css";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkBooking, getRoom, getRoomReviews, roomNameChange } from "../api";
import { IReview, IRoomDetail } from "../types";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaHome, FaStar } from "react-icons/fa";
import { useState } from "react";
import { Helmet } from "react-helmet";
import useHostOnlyPage from "../components/HostOnlyPage";
import { useForm } from "react-hook-form";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RoomDetail() {
  const toast = useToast();
  const { register, handleSubmit } = useForm();
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
  const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<
    IReview[]
  >([`room`, roomPk, `reviews`], getRoomReviews);
  const [dates, setDates] = useState<Date[] | undefined>();
  const { data: checkBookingData, isLoading: isCheckingBooking } = useQuery(
    ["check", roomPk, dates],
    checkBooking,
    {
      cacheTime: 0,
      enabled: dates !== undefined,
    }
  );
  const handleDateChange = (value: any) => {
    setDates(value);
  };
  const roomNameChangeMutation = useMutation(roomNameChange, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "방 이름 변경이 완료되었습니다.",
        isClosable: true,
      });
      /* onClose(); */
    },
  });
  const roomNameChangeSubmit = (data: any) => {};
  const {
    isOpen: isRenameOpen,
    onClose: onRenameClose,
    onOpen: onRenameOpen,
  } = useDisclosure();
  useHostOnlyPage();
  return (
    <Box
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Helmet>
        <title>{data ? data.name : "Loading..."}</title>
      </Helmet>
      <Skeleton
        height={"43px"}
        width={"55%"}
        isLoaded={!isLoading}
        rounded={"md"}
      >
        <HStack>
          <Heading>{data?.name}</Heading>
          <Modal isOpen={isRenameOpen} onClose={onRenameClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Rename room</ModalHeader>
              <ModalCloseButton />
              <ModalBody as={"form"} onSubmit={roomNameChangeSubmit}>
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
                <Button type="submit" mt={4} w={"full"} colorScheme="whatsapp">
                  Rename
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>
          <Button onClick={onRenameOpen} type="submit" size={"sm"}>
            변경
          </Button>
        </HStack>
      </Skeleton>
      <Grid
        mt={8}
        rounded={"xl"}
        overflow={"hidden"}
        gap={3}
        height={"60vh"}
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={index}
          >
            <Skeleton isLoaded={!isLoading} h={"100%"} w={"100%"}>
              {data?.photos && data.photos.length > 0 ? (
                <Image
                  w={"100%"}
                  h={"100%"}
                  objectFit={"cover"}
                  src={data?.photos[index]?.file}
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <Grid gap={10} templateColumns={"2fr 1fr"} maxW={"container.lg"}>
        <Box>
          <HStack justifyContent={"space-between"} mt={10}>
            <VStack alignItems={"flex-start"}>
              <Skeleton height={"30px"} isLoaded={!isLoading}>
                <Heading fontSize={"2xl"}>
                  House hosted by {data?.owner.name}
                </Heading>
              </Skeleton>
              <Skeleton
                justifyContent={"flex-start"}
                height={"30px"}
                isLoaded={!isLoading}
              >
                <HStack mt={7} justifyContent={"flex-start"} width={"100%"}>
                  <Text>
                    {data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}
                  </Text>
                  <Text>•</Text>
                  <Text>
                    {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
                  </Text>
                </HStack>
              </Skeleton>
            </VStack>
            <Avatar
              bg={"gray.400"}
              name={data?.owner.name}
              size={"xl"}
              src={data?.owner.avatar}
              objectFit={"cover"}
            />
          </HStack>
          <Box mt={10}>
            <Skeleton isLoaded={!isLoading} height={"35px"} w={"30%"}>
              <Heading mb={5} fontSize={"2xl"}>
                <HStack>
                  <FaStar /> <Text>{data?.rating}</Text>
                  <Text>•</Text>
                  <Text>
                    {reviewsData?.length} review
                    {reviewsData?.length === 1 ? "" : "s"}
                  </Text>
                </HStack>
              </Heading>
            </Skeleton>
            <Container mt={16} maxW={"container.lg"} marginX={"none"}>
              <Grid gap={10} templateColumns={"1fr 1fr"}>
                {reviewsData?.map((review, index) => (
                  <VStack alignItems={"flex-start"} key={index}>
                    <HStack>
                      <Avatar
                        name={review.user.name}
                        src={review.user.avatar}
                        size={"md"}
                      />
                      <VStack spacing={0} alignItems={"flex-start"}>
                        <Skeleton
                          isLoaded={!isLoading}
                          height={"60px"}
                          w={"350px"}
                          rounded={"md"}
                        >
                          <Heading fontSize={"md"}>{review.user.name}</Heading>
                          <HStack spacing={1}>
                            <FaStar size={"12px"} />
                            <Text>{review.rating}</Text>
                          </HStack>
                          <Text>{review.payload}</Text>
                        </Skeleton>
                      </VStack>
                    </HStack>
                  </VStack>
                ))}
              </Grid>
            </Container>
          </Box>
        </Box>
        <Box py={10}>
          <Calendar
            locale="en-En"
            onChange={handleDateChange}
            prev2Label={null}
            next2Label={null}
            minDate={new Date()}
            maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)}
            minDetail={"month"}
            selectRange
          />
          <Button
            isDisabled={!checkBookingData?.ok}
            isLoading={isCheckingBooking}
            mt={5}
            w={"100%"}
            colorScheme="red"
          >
            Make Booking
          </Button>
          {!isCheckingBooking && !checkBookingData?.ok ? (
            <Text mt={5} color={"red.500"}>
              해당 날짜 예약 불가요 ㅠㅠ
            </Text>
          ) : null}
        </Box>
      </Grid>
    </Box>
  );
}
