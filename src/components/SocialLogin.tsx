import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaGithub, FaComment } from "react-icons/fa";

export default function SocialLogin() {
  const kakaoParams = {
    client_id: "c52f1a0c0e398de66b07ef50a4638ed1",
    redirect_uri: "https://airbnb-frontend-6t7z.onrender.com/social/kakao",
    response_type: "code",
  };
  const params = new URLSearchParams(kakaoParams).toString();
  return (
    <Box mb={4}>
      <HStack my={8}>
        <Divider />
        <Text
          textTransform={"uppercase"}
          color={"gray.500"}
          fontSize={"xs"}
          as={"b"}
        >
          Or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button
          as="a"
          href="https://github.com/login/oauth/authorize?client_id=bb08adf727ed5dda6287&scope=read:user,user:email"
          w={"100%"}
          leftIcon={<FaGithub />}
          bgColor={"gray.300"}
        >
          Continue with Github
        </Button>
        <Button
          as={"a"}
          href={`https://kauth.kakao.com/oauth/authorize?${params}`}
          w={"100%"}
          leftIcon={<FaComment />}
          bgColor={"#F7E600"}
          color={"black"}
        >
          Continue with Kakao
        </Button>
      </VStack>
    </Box>
  );
}
