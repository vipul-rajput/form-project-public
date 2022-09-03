import {
  Button,
  Box,
  Container,
  Input,
  Switch,
  Select,
  Radio,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
function AnswerInput(props) {
  switch (props.type) {
    case "text":
      return (
        <Input
          onChange={(e) => {
            props.setAnswer( props.index, e.target.value, props.type);
          }}
          variant="flushed"
        />
      );
    case "radio":
      return (
        <RadioGroup
          width="50%"
          onChange={(newValue) => {
            props.setAnswer(props.index, newValue, props.type);
          }}
        >
          {props.options.map((val, index) => {
            return (
              <Radio ml="30px" value={val} my="10px" display="block">
                {val}
              </Radio>
            );
          })}
        </RadioGroup>
      );
    case "checkbox":
      return (
        <CheckboxGroup>
          {props.options.map((val, index) => {
            return (
              <Checkbox width="50%" ml="30px" my="10px" display="block">
                {val}
              </Checkbox>
            );
          })}
        </CheckboxGroup>
      );
    default:
      return <Input />;
  }
}
export default function ViewForm(props) {
  const temp = {
    formTitle: "ss",
    formDescription: "ss",
    questions: [
      { type: "radio", options: ["q", "q", ""], required: false, title: "q" },
      { type: "text", options: null, required: false, title: "ss" }
    ],
  };
  const [answer, setAnswer] = useState(props.formData.questions);
 
  const setResponse = (index, newValue, type) => {
    if (type === "text"||type === "radio") {
      let ans = answer;
      console.log(ans, index, newValue, type)
      ans[index]["response"] = newValue;
      setAnswer(ans);
    }else{
     
    }
  };
  return (
    <Box>
      {console.log(answer)}
      <Box pt="20px" minH="100vh" bgColor="#ede7f6">
        <Container
          borderTop="solid"
          borderTopWidth="10px"
          borderColor="#B098A4"
          borderRadius="10"
          px={"50px"}
          pb="20px"
          bgColor="white"
          maxW="50%"
        >
          <Text mt="5" mb="3" fontSize="30px" fontWeight="extrabold">
            {props.formData.formTitle}
          </Text>
          <Text mb="4" fontSize="15px">
            {props.formData.formDescription}
          </Text>
        </Container>
        {props.formData.questions.map((ques, i) => {
          return (
            <Container
              key={i}
              boxShadow="2xl"
              borderRadius="10"
              minH="10%"
              mt={3}
              px={"50px"}
              py="20px"
              bgColor="white"
              maxW="50%"
            >
              {" "}
              <Box display="flex">
                <Text fontSize="20" fontWeight="bold">
                  {ques.title}
                </Text>
                {ques.required ? (
                  <Text mx={2} color="red">
                    *
                  </Text>
                ) : null}
              </Box>
              <AnswerInput
                index={i}
                setAnswer={setResponse}
                options={ques.options}
                type={ques.type}
              />
            </Container>
          );
        })}
        <Container my="50px" centerContent>
          <Button onClick={()=>{console.log(answer)}} colorScheme="pink">Submit</Button>
        </Container>
      </Box>
    </Box>
  );
}
