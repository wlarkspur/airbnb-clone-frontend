import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";
import {
  Avatar,
  Box,
  Container,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
  const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<
    IReview[]
  >([`room`, roomPk, `reviews`], getRoomReviews);
  return (
    <Box
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Skeleton
        height={"43px"}
        width={"55%"}
        isLoaded={!isLoading}
        rounded={"md"}
      >
        <Heading>{data?.name}</Heading>
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
                  src={data?.photos[index].file}
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <HStack width={"40%"} justifyContent={"space-between"} mt={10}>
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
            <HStack justifyContent={"flex-start"} width={"100%"}>
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
  );
}
