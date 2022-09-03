import React, { useState, useEffect } from "react";
import CustomInput from "../../components/CustomInputs";
import {
  Button,
  Box,
  Container,
  Input,
  Switch,
  Select,
  Flex,
  Editable,
  EditableInput,
  EditablePreview,
  Text,
} from "@chakra-ui/react";
import ViewForm from "../../components/ViewForm";

export default function CreateForm() {
  const onSave = () => {
    let ques = questions;
    ques.forEach((que) => {
      if (que.type === "text") {
        console.log(que);
        que["options"] = null;
      }
    });
    const form = {
      formTitle: formMetaData.formTitle,
      formDescription: formMetaData.formDescription,
      questions: [...ques],
    };
    setfinalForm(form);
  };
  const types = ["text", "radio", "checkbox"];
  const createQuestion = () => {
    const defaultQuestion = {
      type: "text",
      options: [],
      required: false,
    };
    setQuestions([...questions, defaultQuestion]);
    // console.log(questions);
  };

  const questionTitleInput = (newValue, index) => {
    let ques = questions;
    ques[index].title = newValue;
    setQuestions(ques);
  };
  const questionRequired = (checked, index) => {
    let ques = questions;
    ques[index].required = checked;
    setQuestions(ques);
  };
  const [finalForm, setfinalForm] = useState();
  const [formMetaData, setFormMetaData] = useState({
    formTitle: "",
    formDescription: "",
  });
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    createQuestion();
  }, []);
  return (
    <Box>
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
          <Editable
            onChange={(newValue) => {
              setFormMetaData({ ...formMetaData, formTitle: newValue });
            }}
            fontSize="27px"
            fontWeight="extrabold"
            mt="10px"
            placeholder="Form Title"
            defaultValue="Untitled Form"
          >
            <EditablePreview
              borderRadius="0"
              width="30%"
              py={2}
            
            />
            <EditableInput
              maxLength="20"
              borderRadius="0"
              width="30%"
              py={2}
              borderBottom="1px"
              borderColor="#B098A4"
            
            />
          </Editable>
          <Editable
            onChange={(newValue) => {
              setFormMetaData({ ...formMetaData, formDescription: newValue });
            }}
            fontSize="15px"
            mt="10px"
            placeholder="Description"
          >
            <EditablePreview
              width="90%"
            
            />
            <EditableInput
              maxLength="250"
              borderRadius="0"
              width="90%"
              py={2}
              borderBottom="1px"
              borderColor="#B098A4"
            
            />
          </Editable>
        </Container>

        {questions.map((que, index) => {
          return (
            <Container
              key={index}
              boxShadow="2xl"
              borderRadius="10"
              minH="10%"
              mt={3}
              px={"50px"}
              py="20px"
              bgColor="white"
              maxW="50%"
            >
              <Box display="flex" justifyContent="space-between">
                <Editable
                  width="80%"
                  onChange={(newValue) => {
                    questionTitleInput(newValue, index);
                  }}
                  fontSize="17px"
                  fontWeight="600"
                  placeholder="Question Title"
                  defaultValue="Untitled Question"
                >
                  <EditablePreview width="80%" borderRadius="0" py={1} />
                  <EditableInput
                    borderRadius="0"
                    width="80%"
                    py={1}
                    borderBottom="1px"
                    borderColor="#B098A4"
                  
                  />
                </Editable>
                <Select
                  width="20%"
                  height="30px"
                
                  onChange={(event) => {
                    event.preventDefault();
                    let ques = questions;
                    ques[index].type = event.target.value;
                    setQuestions([...ques]);
                  }}
                  className="form-select"
                >
                  {types.map((type, i) => {
                    return <option key={i} value={type}>{type}</option>;
                  })}
                </Select>
              </Box>
              <Box>
                <CustomInput
                  getOptions={(op) => {
                    let ques = questions;
                    ques[index].options = [...op];
                    setQuestions([...ques]);
                  }}
                  index={index}
                  type={que.type}
                />
                <Box display="flex" justifyContent="end">
                  <Text as="abbr" fontSize="sm">
                    Required{" "}
                  </Text>
                  <Switch
                    onChange={(e) => {
                      questionRequired(e.target.checked, index);
                    }}
                    size="md"
                    colorScheme="red"
                    mx="2"
                  />
                </Box>
              </Box>
            </Container>
          );
        })}
        <Container mt="10px" centerContent>
          <Button onClick={createQuestion}>Add</Button>
        </Container>
        <Container mt="10px" centerContent>
          <Button onClick={onSave}>Save</Button>
        </Container>
      </Box>
      {/* {finalForm ? <ViewForm formData={finalForm} /> : null} */}
    </Box>
  );
}
