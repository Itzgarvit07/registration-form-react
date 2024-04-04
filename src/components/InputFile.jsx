import { Upload } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

const InputFile = () => {
  const [aadharCardFront, setaadharCardFront] = useState(null);
  const [aadharCardBack, setaadharCardBack] = useState(null);

  const handleFileChange = (e) => {
    setaadharCardFront(e.target.files[0]);
  };

  const handleFileTwoChange = (e) => {
    setaadharCardBack(e.target.files[0]);
  };

  const uploadFiles = () => {
    const formData = new FormData();
    formData.append("file", aadharCardFront); // Append first file with key "file"
    formData.append("file", aadharCardBack); // Append second file with the same key "file"

    fetch(`http://localhost:8080/upload`, {
      method: "POST",
      mode: "cors",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Handle response
      })
      .catch((err) => console.log(err)); // Handle errors
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: "10px",
        width: "100%",
      }}
    >
      <label
        style={{
          fontSize: "16px",
          fontWeight: "500",
          letterSpacing: "0.15px",
        }}
      >
        AadharCard {<sup style={{ color: "#F44" }}>*</sup>}
      </label>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", gap: "30px" }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "space-between", gap: "10px" }}
        >
          <TextField type="file" onChange={handleFileChange} />
          <TextField type="file" onChange={handleFileTwoChange} />
        </Box>
        <Button onClick={uploadFiles}>Upload</Button>
      </Box>
    </Box>
  );
};

export default InputFile;
