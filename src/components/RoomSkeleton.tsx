import { Box, HStack, Skeleton } from "@chakra-ui/react";

export default function RoomSkeleton() {
  return (
    <Box>
      <Skeleton
        startColor="pink.100"
        endColor="red.200"
        rounded={"2xl"}
        height={"280px"}
        mb={5}
      />
      <HStack justifyContent={"space-between"}>
        <Skeleton rounded={"lg"} width={"60%"} height={4} mb={1} />
        <Skeleton rounded={"lg"} width={"20%"} height={4} mb={1} />
      </HStack>
      <Skeleton rounded={"lg"} width={"50%"} height={4} mb={1} />
      <Skeleton rounded={"lg"} width={"35%"} height={4} mb={1} />
    </Box>
  );
}
