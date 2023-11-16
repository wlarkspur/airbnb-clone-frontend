import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ProtectedPage from "../components/ProtectedPage";
import useHostOnlyPage from "../components/HostOnlyPage";

export default function UploadPhotos() {
  const { register } = useForm();
  const { roomPk } = useParams();
  useHostOnlyPage();
  return (
    <ProtectedPage>
      <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
        <Container>
          <Heading textAlign={"center"}>Upload a photo</Heading>
          <VStack spacing={5} mt={10}>
            <FormControl>
              <Input {...register("file")} type="file" accept="image/*"></Input>
            </FormControl>
            <Button colorScheme="red" w={"full"}>
              Upload photos
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
