import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

import "../styles/ModelCard.css";

interface ModelCard {
  name: string;
  description: string;
  avatar: string;
}

const ModelCard: React.FunctionComponent<ModelCard> = ({
  name,
  description,
  avatar,
}) => {
  return (
    <Card className="model-card">
      <CardMedia
        component="img"
        image={avatar}
        alt={name}
        className="model-card-media"
      />
      <CardContent className="model-card-content">
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ModelCard;
