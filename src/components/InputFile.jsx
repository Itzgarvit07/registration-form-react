// import React, { useState } from "react";
// import { Box, TextField, Typography, Button } from "@mui/material";
// import { useForm } from "react-hook-form";

// function FileUploadForm() {
//   const [file , setFiles] = useState({
//     aadharCardFront : null ,
//   })
//   const [aadharCardFront, setAadharCardFront] = useState(null);
//   const [aadharCardBack, setAadharCardBack] = useState(null);
//   const [aadharCardFrontUrl, setAadharCardFrontUrl] = useState("");
//   const [aadharCardBackUrl, setAadharCardBackUrl] = useState("");
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = () => {
//     const formData = new FormData();
//     formData.append("aadharCardFront", aadharCardFront);
//     formData.append("aadharCardBack", aadharCardBack);

//     // Send the form data to the server
//     fetch("/upload", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         // Handle successful response from the server
//         console.log("Success:", data);
//         // Here, you can update the UI or perform any actions based on the response from the server
//       })
//       .catch((error) => {
//         // Handle errors
//         console.error("Error:", error);
//         // Display error message or perform other error handling tasks
//       });
//   };

//   const handleAadharCardFrontChange = (event) => {
//     const file = event.target.files[0];
//     setAadharCardFront(file);
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setAadharCardFrontUrl(e.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAadharCardBackChange = (event) => {
//     const file = event.target.files[0];
//     setAadharCardBack(file);
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setAadharCardBackUrl(e.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         display: "flex",
//         alignItems: "flex-start",
//         gap: "20px",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           flexDirection: "column",
//         }}
//       >
//         <TextField
//           type="file"
//           {...register("aadharCardFront", { required: true })}
//           helperText={"Aadhar Card Front"}
//           error={errors.aadharCardFront ? true : false}
//           onChange={handleAadharCardFrontChange}
//         />
//         {aadharCardFront && (
//           <Box>
//             <Typography>Aadhar Card Front Preview:</Typography>
//             <img
//               src={aadharCardFrontUrl}
//               alt="Aadhar Card Front"
//               style={{ maxWidth: "100%", maxHeight: "200px" }}
//             />
//           </Box>
//         )}
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           flexDirection: "column",
//         }}
//       >
//         <TextField
//           type="file"
//           {...register("aadharCardBack", { required: true })}
//           helperText={"Aadhar Card Back"}
//           error={errors.aadharCardBack ? true : false}
//           onChange={handleAadharCardBackChange}
//         />
//         {aadharCardBack && (
//           <Box>
//             <Typography>Aadhar Card Back Preview:</Typography>
//             <img
//               src={aadharCardBackUrl}
//               alt="Aadhar Card Back"
//               style={{ maxWidth: "100%", maxHeight: "200px" }}
//             />
//           </Box>
//         )}
//       </Box>
//       <Button variant="contained" onClick={onSubmit}>
//         Submit
//       </Button>
//     </Box>
//   );
// }

// export default FileUploadForm;

import { Upload } from "@mui/icons-material";
import React, { useState } from "react";

const InputFile = () => {
  const [file, setFile] = useState();
  const Upload = () => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData, "147");
    fetch(`http://localhost:8080/upload`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <button onClick={Upload}>upload</button>
    </div>
  );
};

export default InputFile;
