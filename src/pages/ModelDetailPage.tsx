import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Box } from "@mui/material";

import InputForm from "../components/InputForm";
import OutputSection from "../components/Output";
import "../styles/ModelDetailPage.css";

interface Input {
  name: string;
  description: string;
  type: string;
  required: boolean;
  default: string | null;
}

interface Output {
  name: string;
  description: string;
  type: string;
}

interface Model {
  id: string;
  name: string;
  description: string;
  avatar: string;
  inputs: Input[];
  outputs: Output[];
}

const ModelDetailPage: React.FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [model, setModel] = useState<Model | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [outputValues, setOutputValues] = useState<{ [key: string]: any }>({});
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getModel = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/model-spaces/${id}`
        );
        setModel(response.data.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      }
    };
    getModel();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "file" ? files?.[0] : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const prepareFormData = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const formData: { [key: string]: any } = {};
      if (model !== null) {
        for (const input of model.inputs) {
          const value =
            formValues[input.name] !== undefined
              ? formValues[input.name]
              : input.default;

          if (input.type === "audio" || input.type === "image") {
            if (value instanceof File) {
              const base64Value = await fileToBase64(value);
              formData[input.name] = base64Value;
            }
          } else {
            formData[input.name] = value;
          }
        }
      }
      return formData;
    };

    try {
      const formData = await prepareFormData();
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/model-spaces/${id}/predict`,
        formData
      );
      setOutputValues(response?.data?.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("An unknown error occurred"));
      }
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  if (!model) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div>
        <Box className="header-container">
          <Box className="image-container">
            <img src={model.avatar} alt={model.name} className="image" />
            <Typography variant="h4" component="div" className="details">
              {model.name}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            color="text.secondary"
            className="description"
          >
            {model.description}
          </Typography>
        </Box>
        {error && <h2 style={{ color: "red" }}>Error: {error.message}</h2>}
        <Box className="model-content">
          <InputForm
            inputs={model.inputs}
            formValues={formValues}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          <OutputSection outputs={model.outputs} outputValues={outputValues} />
        </Box>
      </div>
    </div>
  );
};

export default ModelDetailPage;
