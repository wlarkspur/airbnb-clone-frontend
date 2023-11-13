import {
  Box,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  SelectField,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { FaBed, FaDollarSign, FaToilet } from "react-icons/fa";

/*
 
 ---Python Django part---
 amenities
 category
*/

export default function UploadRooms() {
  useHostOnlyPage();
  return (
    <ProtectedPage>
      <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
        <Container>
          <Heading textAlign={"center"}>Upload Room</Heading>
          <VStack spacing={5} as={"form"} mt={5}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input required type="text"></Input>
              <FormHelperText>Write the name of your room</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input required type="text"></Input>
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input required type="text"></Input>
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input required type="text"></Input>
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaDollarSign />} />
                <Input type="number" min={0}></Input>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Rooms</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaBed />} />
                <Input type="number" min={0}></Input>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Toilets</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaToilet />} />
                <Input type="number" min={0}></Input>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea></Textarea>
            </FormControl>
            <FormControl>
              <Checkbox>Pet_kindly</Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel>Kind of room</FormLabel>
              <Select placeholder="Choose a kind">
                <option value={"entire_place"}>Entire Place</option>
                <option value={"private_room"}>Private Room</option>
                <option value={"shared_room"}>Shared Room</option>
              </Select>
              <FormHelperText>
                What kind of rooms are you in mind?{" "}
              </FormHelperText>
            </FormControl>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
