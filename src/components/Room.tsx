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
import { FaStar, FaRegHeart } from "react-icons/fa";

export default function Room() {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <VStack>
      <Box>
        <Box position={"relative"} overflow={"hidden"} mb={3} rounded={"2xl"}>
          <Image
            minH={"280"}
            src="https://a0.muscache.com/im/pictures/b7c9264d-73c9-45c3-882e-6e9577d63d68.jpg?im_w=720"
          />
          <Button
            variant={"unstyled"}
            position={"absolute"}
            top={0}
            right={0}
            color={"white"}
          >
            <FaRegHeart size={"20px"} />
          </Button>
        </Box>
        <Box>
          <Grid gap={2} templateColumns={"7fr 1fr"}>
            <Text as="b" noOfLines={1} fontSize={"md"}>
              Drimnin
            </Text>
            <HStack>
              <FaStar size={15} />
              <Text>5.0</Text>
            </HStack>
          </Grid>
          <Text fontSize={"sm"} color={gray}>
            스코틀랜드, 영국
          </Text>
          <Text fontSize={"sm"} color={gray}>
            <Text as="b">$72</Text> / night
          </Text>
        </Box>
      </Box>
    </VStack>
  );
}
