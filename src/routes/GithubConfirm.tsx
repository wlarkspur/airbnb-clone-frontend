import { Heading, Spinner, Text, VStack, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogIn } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function GithubConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  /*  const confirmLogin = async () => { */
  const params = new URLSearchParams(search);
  const code = params.get("code");
  const mutation = useMutation(githubLogIn, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "Welcome",
        position: "bottom-right",
        description: "Happy to have you back!",
      });
      queryClient.refetchQueries(["me"]);
      navigate("/");
    },
  });
  /* if (code) {
    const status = await githubLogIn(code);
    if (status == 200) {
      toast({
        status: "success",
        title: "Welcome",
        position: "bottom-right",
        description: "Happy to have you back!",
      });
      queryClient.refetchQueries(["me"]);
      navigate("/");
    }
  } */
  /*  }; */
  useEffect(() => {
    /* confirmLogin(); */
    if (code) {
      mutation.mutate(code);
    }
  }, []);
  return (
    <VStack justifyContent={"center"} minH={"100vh"}>
      <Heading>Processing log in...</Heading>
      <Text>Don't go anywhere.</Text>
      <Spinner size={"lg"} />
    </VStack>
  );
}
