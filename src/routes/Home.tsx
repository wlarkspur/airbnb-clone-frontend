import {
  Box,
  Flex,
  Grid,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

import { FaStar } from "react-icons/fa";

export default function Home() {
  return (
    <Grid
      mt={10}
      px={40}
      columnGap={4}
      rowGap={8}
      templateColumns={"repeat(5, 1fr)"}
    >
      <VStack>
        <Box>
          <Box overflow={"hidden"} mb={2} rounded={"2xl"}>
            <Image
              h={"280"}
              w={"280"}
              src="https://a0.muscache.com/im/pictures/b7c9264d-73c9-45c3-882e-6e9577d63d68.jpg?im_w=720"
            />
          </Box>
          <Box>
            <Grid gap={2} templateColumns={"7fr 1fr"}>
              <Text as="b" noOfLines={1} fontSize={"md"}>
                Drimnin
              </Text>
              <HStack spacing={1}>
                <FaStar size={15} />
                <Text>5.0</Text>
              </HStack>
            </Grid>
            <Text fontSize={"sm"} color={"gray.600"}>
              스코틀랜드, 영국
            </Text>
            <Text fontSize={"sm"} color={"gray.600"}>
              <Text as="b">$72</Text> / night
            </Text>
          </Box>
        </Box>
      </VStack>
    </Grid>
  );
}
