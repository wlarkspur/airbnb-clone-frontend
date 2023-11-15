import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  SelectField,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { FaBed, FaDollarSign, FaToilet } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  IUploadRoomVariables,
  getAmenities,
  getCategories,
  uploadRoom,
} from "../api";
import { IAmenity, ICategory, IRoomDetail } from "../types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function UploadRooms() {
  const { register, handleSubmit } = useForm<IUploadRoomVariables>();
  const toast = useToast();
  const naviagte = useNavigate();
  const mutation = useMutation(uploadRoom, {
    onSuccess: (data: IRoomDetail) => {
      toast({
        status: "success",
        title: "Room created",
        position: "bottom-right",
      });
      naviagte(`/rooms/${data.id}`);
    },
  });
  const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<
    IAmenity[]
  >(["amenities"], getAmenities);
  const { data: categories, isLoading: isCategorisLoading } = useQuery<
    ICategory[]
  >(["categories"], getCategories);
  useHostOnlyPage();
  const onSubmit = (data: IUploadRoomVariables) => {
    mutation.mutate(data);
  };
  return (
    <ProtectedPage>
      <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
        <Container>
          <Heading textAlign={"center"}>Upload Room</Heading>
          <VStack
            spacing={5}
            as={"form"}
            mt={5}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                {...register("name", { required: true })}
                required
                type="text"
              ></Input>
              <FormHelperText>Write the name of your room</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input
                {...register("country", { required: true })}
                required
                type="text"
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input
                {...register("city", { required: true })}
                required
                type="text"
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                {...register("address", { required: true })}
                required
                type="text"
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaDollarSign />} />
                <Input
                  {...register("price", { required: true })}
                  type="number"
                  min={0}
                ></Input>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Rooms</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaBed />} />
                <Input
                  {...register("rooms", { required: true })}
                  type="number"
                  min={0}
                ></Input>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Toilets</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaToilet />} />
                <Input
                  {...register("toilets", { required: true })}
                  type="number"
                  min={0}
                ></Input>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                {...register("description", { required: true })}
              ></Textarea>
            </FormControl>
            <FormControl>
              <Checkbox {...register("pet_friendly", { required: true })}>
                Pet_kindly
              </Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel>Kind of room</FormLabel>
              <Select
                {...register("kind", { required: true })}
                placeholder="Choose a kind"
              >
                <option value={"entire_place"}>Entire Place</option>
                <option value={"private_room"}>Private Room</option>
                <option value={"shared_room"}>Shared Room</option>
              </Select>
              <FormHelperText>
                What kind of rooms are you in mind?{" "}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                {...register("category", { required: true })}
                placeholder="Choose a kind"
              >
                {categories?.map((category) => (
                  <option key={category.pk} value={category.pk}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <FormHelperText>What category describe your room?</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Amenities</FormLabel>
              <Grid templateColumns={"1fr 1fr"} gap={5}>
                {amenities?.map((amenity) => (
                  <Box key={amenity.pk}>
                    <Checkbox
                      value={amenity.pk} // amenities는 List로 값을 구분하기 위해 value값에 pk를 포함해 구분해줄 필요가 있다.
                      {...register("amenities", { required: true })}
                    >
                      {amenity.name}
                    </Checkbox>
                    <FormHelperText>{amenity.description}</FormHelperText>
                  </Box>
                ))}
              </Grid>
            </FormControl>
            {mutation.isError ? (
              <Text color={"red.500"}>Something went wrong</Text>
            ) : null}
            <Button
              type="submit"
              isLoading={mutation.isLoading}
              colorScheme={"red"}
              size={"lg"}
              width={"100%"}
            >
              Upload Room
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
