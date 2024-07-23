import React from "react";
import { Box, TextField, Button } from "@mui/material";

import "../styles/InputForm.css";

interface Input {
  name: string;
  description: string;
  type: string;
  required: boolean;
  default: string | null;
}

interface InputFormProps {
  inputs: Input[];
  formValues: { [key: string]: string | number | boolean };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const InputForm: React.FC<InputFormProps> = ({
  inputs,
  formValues,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Box className="input-section">
      <Box component="form" onSubmit={handleSubmit}>
        {inputs.map((input, index) => (
          <Box key={index} className="input-container">
            <TextField
              label={input.name}
              name={input.name}
              type={
                input.type === "audio" || input.type === "image"
                  ? "file"
                  : input.type
              }
              onChange={handleChange}
              fullWidth
              required={input.required}
              defaultValue={formValues[input.name] || input.default}
              helperText={input.description}
              InputLabelProps={
                input.type === "audio" || input.type === "image"
                  ? { shrink: true }
                  : undefined
              }
              inputProps={
                input.type === "audio"
                  ? { accept: ".mp3,.wav" }
                  : input.type === "image"
                  ? { accept: ".jpeg,.jpg,.png" }
                  : {}
              }
            />
          </Box>
        ))}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ float: "right" }}
        >
          Predict
        </Button>
      </Box>
    </Box>
  );
};

export default InputForm;
