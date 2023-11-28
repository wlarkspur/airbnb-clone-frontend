import Calendar from "react-calendar";
import type { Value } from "react-calendar/dist/cjs/shared/types";
import "react-calendar/dist/Calendar.css";
import { Form, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  checkBooking,
  editAmenities,
  getRoom,
  getRoomReviews,
  roomNameChange,
} from "../api";
import { IReview, IRoomDetail } from "../types";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  FocusLock,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  Stack,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  FaEdit,
  FaHome,
  FaPenSquare,
  FaSlidersH,
  FaStar,
} from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import useHostOnlyPage from "../components/HostOnlyPage";
import { useForm } from "react-hook-form";
import RoomRenameModal from "../components/RoomRenameModal";
import EditRoomDetailPhotoModal from "../components/EditRoomDetailPhotoModal";
import useUser from "../lib/useUser";
import { type } from "os";
import EditRoomAndToiletsModal from "../components/EditRoomAndToiletsModal";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { user, isLoggedIn } = useUser();
  const { isLoading, data, refetch } = useQuery<IRoomDetail>(
    [`rooms`, roomPk],
    getRoom
  );

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
  /* useHostOnlyPage(); */
  //Amenities Edit Modal

  //Amenities Edit Modal
  return (
    <Box
      w={"100%"}
      pb={20}
      mt={10}
      px={{
        base: 10,
        lg: 80,
      }}
    >
      <Helmet>
        <title>{data ? data.name : "Loading..."}</title>
      </Helmet>
      <Skeleton
        height={"43px"}
        width={"80%"}
        isLoaded={!isLoading}
        rounded={"md"}
      >
        <HStack w={"100%"} whiteSpace={"nowrap"}>
          <Heading fontSize={"3xl"}>{data?.name}</Heading>
          {isLoggedIn && user?.is_host && <RoomRenameModal />}
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
                <Box
                  position={"relative"}
                  h={"100%"}
                  _hover={{
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                      backgroundColor: "rgba(0, 0, 0, 0.3)", // 여기서 적절한 색상과 투명도를 설정하세요
                    },
                    ".overlay-button": {
                      opacity: 1,
                    },
                  }}
                >
                  <Image
                    w={"100%"}
                    h={"100%"}
                    objectFit={"cover"}
                    src={data?.photos[index]?.file}
                  />
                  {isLoggedIn && user?.is_host && (
                    <EditRoomDetailPhotoModal
                      roomPk={roomPk}
                      photo_pk={data?.photos[index]?.pk}
                      index={index}
                    />
                  )}
                </Box>
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
                  {isLoggedIn && user?.is_host && (
                    <EditRoomAndToiletsModal data={data} refetch={refetch} />
                  )}
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
