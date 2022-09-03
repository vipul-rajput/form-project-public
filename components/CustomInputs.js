import { useState, useEffect } from "react";
import { Button, Box, Input, RadioGroup, Radio, Checkbox } from "@chakra-ui/react";
export default function CustomInput(props) {
  const addOption = (index, e) => {
    let op = options;
    op[index] = e.target.value;
    setOptions([...op]);
  };

  const [options, setOptions] = useState([""]);
  useEffect(() => {
    props.getOptions(options);
  }, [options]);
  switch (props.type) {
    case "text":
      return (
        <>
          <Input
            placeholder="Text Answer"
            width="40%"
            variant="flushed"
            borderColor="gray.500"
            disabled
            type="text"
          />
        </>
      );
    case "radio":
      return (
        <>
          {options.map((val, index) => {
            return (
              <Box key={index} my="5px" display="flex">
                <Radio isDisabled></Radio>
                <Input
                  width="40%"
                  mx="20px"
                  borderColor="gray.400"
                  variant="flushed"
                  autoFocus
                  border="0"
                  onChange={(e) => addOption(index, e)}
                  type="text"
                />
              </Box>
            );
          })}
          <Button
            onClick={() => {
              setOptions([...options, ""]);
            }}
          >
            +
          </Button>
        </>
      );
    case "checkbox":
      return (
        <>
          {options.map((val, index) => {
            return (
              <Box key={index} my="5px" display="flex">
                <Checkbox isDisabled></Checkbox>
                <Input
                  width="40%"
                  mx="20px"
                  borderColor="gray.400"
                  variant="flushed"
                  autoFocus
                  border="0"
                  onChange={(e) => addOption(index, e)}
                  type="text"
                />
              </Box>
            );
          })}
          
          <Button
            p="0"
            onClick={() => {
              setOptions([...options, ""]);
            }}
          >
            +
          </Button>
         
        </>
      );
  }
}
