import { Box, Grid, Skeleton, SkeletonText } from "@chakra-ui/react";
import Room from "../components/Room";

export default function Home() {
  return (
    <Grid
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        sm: "1fr",
        md: "1fr 1fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
    >
      <Box>
        <Skeleton
          startColor="pink.100"
          endColor="red.200"
          rounded={"2xl"}
          height={280}
          mb={6}
        />
        <SkeletonText w={"50%"} noOfLines={2} mb={4} />
        <SkeletonText w={"30%"} noOfLines={1} />
      </Box>
      <Room />
    </Grid>
  );
}
