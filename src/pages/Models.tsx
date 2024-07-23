import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import "../styles/Model.css";
import ModelCard from "../components/Card";

interface Model {
  id: string;
  name: string;
  description: string;
  avatar: string;
}

const Models: React.FunctionComponent = () => {
  const [modelsData, setModelsData] = useState<Model[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getModels = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/model-spaces`
        );
        setModelsData(response.data.data);
      } catch (err) {
        console.log(err);
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      }
    };
    getModels();
  }, []);

  return (
    <div className="model-container">
      <h1>Welcome Models Space</h1>
      {error && <h2 style={{ color: "red" }}>Error: {error.message}</h2>}
      {modelsData.length ? (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
          <Grid container spacing={3}>
            {modelsData.map((model) => (
              <Grid item xs={12} sm={6} md={4} key={model.id}>
                <Link
                  to={`/model/${model.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <ModelCard
                    name={model.name}
                    avatar={model.avatar}
                    description={model.description}
                  />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : null}
    </div>
  );
};

export default Models;
