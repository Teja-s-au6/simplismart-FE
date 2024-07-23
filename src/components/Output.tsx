import React from "react";
import { Box, Typography } from "@mui/material";

import "../styles/Output.css";

interface Output {
  name: string;
  description: string;
  type: string;
}

interface OutputSectionProps {
  outputs: Output[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  outputValues: { [key: string]: any };
}

const OutputSection: React.FC<OutputSectionProps> = ({
  outputs,
  outputValues,
}) => {
  const isImageUrl = (url: string) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };
  return (
    <Box className="output-section">
      {outputs.map((output, index) => (
        <Box key={index} className="output-container">
          <Typography variant="h6">{output.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {output.description}
          </Typography>
          {outputValues[output.name] ? (
            isImageUrl(outputValues[output.name]) ? (
              <img
                src={outputValues[output.name]}
                alt={output.name}
                style={{ maxWidth: "100%", marginTop: "10px" }}
              />
            ) : (
              <Typography variant="body1" style={{ marginTop: "10px" }}>
                {outputValues[output.name]}
              </Typography>
            )
          ) : null}
        </Box>
      ))}
    </Box>
  );
};

export default OutputSection;
