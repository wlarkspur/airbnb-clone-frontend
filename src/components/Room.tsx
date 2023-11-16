import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaStar, FaRegHeart, FaCamera } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

interface IRoomProps {
  imageUrl: string;
  name: string;
  city: string;
  country: string;
  rating: number;
  price: number;
  pk: number;
  isOwner: boolean;
}

export default function Room({
  imageUrl,
  name,
  city,
  country,
  rating,
  price,
  pk,
  isOwner,
}: IRoomProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  const navigate = useNavigate();
  const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/rooms/${pk}/photos`);
  };
  return (
    <Link to={`/rooms/${pk}`}>
      <VStack>
        <Box>
          <Box position={"relative"} overflow={"hidden"} mb={3} rounded={"2xl"}>
            <Image minH={"280"} src={imageUrl} />
            <Button
              variant={"unstyled"}
              position={"absolute"}
              top={0}
              right={0}
              onClick={onCameraClick}
              color={"white"}
            >
              {isOwner ? (
                <FaCamera size={"20px"}></FaCamera>
              ) : (
                <FaRegHeart size={"20px"} />
              )}
            </Button>
          </Box>
          <Box>
            <Grid gap={2} templateColumns={"7fr 1fr"}>
              <Text as="b" noOfLines={1} fontSize={"md"}>
                {name}
              </Text>
              <HStack>
                <FaStar size={15} />
                <Text fontSize={"sm"}>{rating}</Text>
              </HStack>
            </Grid>
            <Text fontSize={"sm"} color={gray}>
              {city}, {country}
            </Text>
            <Text fontSize={"sm"} color={gray}>
              <Text as="b">${price}</Text> / night
            </Text>
          </Box>
        </Box>
      </VStack>
    </Link>
  );
}
