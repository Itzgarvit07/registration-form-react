import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import HeadingBox from "./components/HeadingBox";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import StyleTextfield from "./components/StyledTextfield";
import ForwardedTextInput from "./components/StyledTextfield";
import {
  analyticsOptions,
  coursesData,
  educationOptions,
  genderOptions,
} from "./Constant";
import ConfirmationModal from "./components/Modal";
import ControlledRadioButtonsGroup from "./components/StyledRadioBtn";
import FileUploadForm from "./components/InputFile";

// import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [formdata, setFormData] = useState([]);
  const [permanentAddress, setPermanentAddress] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [aadharCardBack, setAadharCardBack] = useState("");
  const [aadharCardFront, setAadharCardFront] = useState("");
  const methods = useForm();
  const { handleSubmit, register, watch, formState, setValue, getValues } =
    methods;
  const errors = formState?.errors;
  const handleNextButton = (e) => {
    e.preventDefault();
    setCurrentSection(currentSection + 1);
  };
  const handlePrevButton = (e) => {
    e.preventDefault();
    setCurrentSection(currentSection - 1);
  };
  const getData = () => {
    fetch(`http://localhost:8080/studentsData`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  const handleData = handleSubmit((data) => {
    if (Object.keys(errors).length === 0 && currentSection < 4) {
      // If there are no errors, proceed to the next section
      setCurrentSection(currentSection + 1);
    }

    if (!confirmation && currentSection === 4) {
      alert("first agree to terms and conditions");
    }
    if (currentSection === 4 && confirmation) {
      setFormData(data);
      fetch(`http://localhost:8080/submit`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => console.log(res))
        .catch((err) => console.error("Error:", err));
    }
  });
  console.log(formdata, "58");
  const values = getValues();
  const handleAddress = () => {
    setPermanentAddress((prev) => !prev);
  };
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  console.log(watch(), "135");
  console.log(methods.watch(), "136");

  useEffect(() => {
    if (permanentAddress === true) {
      setValue("permanentAddress", values?.localAddress);
    } else {
      setValue("permanentAddress", "");
    }
  }, [permanentAddress]);
  useEffect(() => {
    methods.setValue("eduDesignation", educationOptions[0].value);
    methods.setValue("analytics", analyticsOptions[0].value);
    // methods.setValue("gender" , )
  }, []);
  useEffect(() => {
    confirmation && setOpen(false);
  }, [open]);
  // useEffect(() => {
  //   const aadharCardFrontFiles = methods.watch("aadharCardfront")[0];
  //   const aadharCardBackFiles = methods.watch("aadharCardback");

  //   console.log(aadharCardFrontFiles, aadharCardBackFiles, "134");

  //   // if (aadharCardFrontFiles?.length === 0) {
  //   //   alert("Select files");
  //   // } else {
  //   const formData = new FormData();
  //   // formData.append("name", "Suhani");
  //   // console.log(formData);

  //   // const temp = {};
  //   // temp["name"] = "Suhani";
  //   // console.log(temp);

  //   // Append front files
  //   // for (let i = 0; i < aadharCardFrontFiles.length; i++) {
  //   //   temp["files"] = aadharCardFrontFiles[0];
  //   // }

  //   // for (let i = 0; i < aadharCardFrontFiles.length; i++) {
  //   formData.append("files", aadharCardFrontFiles);
  //   // }

  //   // // Append back files
  //   // for (let i = 0; i < aadharCardBackFiles.length; i++) {
  //   //   temp["files"] = aadharCardBackFiles[0];
  //   // }
  //   // console.log(aadharCardFrontFiles[0]);
  //   console.log("FormData:", formData);

  //   // Send the form data to the server
  //   fetch("http://localhost:8080/upload", {
  //     method: "POST",
  //     body: JSON.stringify(formData),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Success:", data);
  //       // Handle successful response from the server
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       // Handle errors
  //     });
  //   // }
  // }, [methods.watch("aadharCardfront")]);

  // console.log(methods.watch("aadharCardfront"), "l");
  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <form onSubmit={handleSubmit(handleData)} noValidate>
          {currentSection === 1 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
                gap: "10px",
                border: "1px solid black",
                padding: "10px",
              }}
            >
              <HeadingBox heading={"Personal Details"} />
              <ForwardedTextInput
                label="Name"
                type="text"
                error={errors?.name ? true : false}
                helperText={errors?.name?.message}
                placeholder="name"
                isRequired
                {...register("name", {
                  required: "Name is Required",
                })}
              />
              <ForwardedTextInput
                label="Email"
                type="text"
                error={errors?.email ? true : false}
                helperText={errors?.email?.message}
                placeholder="email"
                isRequired
                {...register("email", {
                  required: "Email is Required",
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(value) ||
                      "Email address must be a valid address",
                  },
                })}
              />
              <ForwardedTextInput
                label="Phone No"
                type="number"
                error={errors?.phoneNo ? true : false}
                helperText={errors?.phoneNo?.message}
                placeholder="phoneNo"
                isRequired
                {...register("phoneNo", {
                  required: "PhoneNo is Required",
                  validate: {
                    matchPatern: (value) =>
                      /^\d{10}$|^(\+\d{1,3}[- ]?)?\d{10}$/.test(value) ||
                      "PhoneNo must be a valid number",
                  },
                })}
              />
              <ControlledRadioButtonsGroup
                label="Gender"
                name="gender"
                defaultValue=""
                data={genderOptions}
                isRequired={true}
                rules={{ required: "Please select an option" }}
              />
              <ForwardedTextInput
                label="DOB"
                type="date"
                error={errors?.dob ? true : false}
                helperText={errors?.dob?.message}
                placeholder="dob"
                isRequired
                {...register("dob", {
                  required: "dob is Required",
                })}
              />
              {/* //AadharCard */}
              {/* <FileUploadForm /> */}
              {/* <label htmlFor="">AadharCard</label>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "baseline",
                  gap: "10px",
                }}
              >
                <ForwardedTextInput
                  // label="Aadhaar Card"
                  type="file"
                  // error={errors?.dob ? true : false}
                  helperText={"Aadhar Card Front"}
                  placeholder="Aadhar Card"
                  // onChange={(e) => {
                  //   setAadharCardFront(e.target.files[0]);
                  // }}
                  isRequired
                  {...register("aadharCardfront", {
                    required: "aadharCard is Required",
                  })}
                />
                <ForwardedTextInput
                  // label="Aadhaar Card/"
                  type="file"
                  // error={errors?.dob ? true : false}
                  // helperText={errors?.dob?.message}
                  placeholder="Aadhar Card"
                  helperText={"Aadhar Card Back"}
                  // onChange={(e) => {
                  //   setAadharCardBack(e.target.files[0]);
                  // }}
                  isRequired
                  {...register("aadharCardback", {
                    required: "aadharCard is Required",
                  })}
                />
                {/* <button onclick={upoloadFile}>Upload</button> */}
              {/* </Box> */}
              {/* // */}
              <Button
                sx={{ border: "1px solid black" }}
                onClick={handleNextButton}
              >
                Next{" "}
              </Button>
              <Button
                sx={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "10px",
                  "&:hover": {
                    color: "blue",
                  },
                }}
                onClick={handleData}
                type="submit"
              >
                Save and next
              </Button>
            </Box>
          )}
          {/* //Residental Detail */}
          {currentSection === 2 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
                gap: "10px",
                border: "1px solid black",
                padding: "10px",
              }}
            >
              <HeadingBox heading={"Parent / Guardian Details"} />
              <ForwardedTextInput
                label="Parent / Guardian / Spouse Name"
                type="text"
                error={errors?.parentName ? true : false}
                helperText={errors?.parentName?.message}
                placeholder="Parent / Guardian / Spouse Name"
                isRequired
                {...register("parentName", {
                  required: "parentName is Required",
                })}
              />
              <ForwardedTextInput
                label="Parent / Guardian / Spouse Phoneno"
                type="number"
                error={errors?.parentNo ? true : false}
                helperText={errors?.parentNo?.message}
                placeholder="Parent / Guardian / Spouse Phoneno"
                isRequired
                {...register("parentNo", {
                  required: "parentNo is Required",
                })}
              />

              <Button
                sx={{ border: "1px solid black" }}
                onClick={handleNextButton}
              >
                Next{" "}
              </Button>
              <Button
                sx={{ border: "1px solid black" }}
                onClick={handlePrevButton}
              >
                Back{" "}
              </Button>
              <Button
                sx={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "10px",
                  "&:hover": {
                    color: "blue",
                  },
                }}
                onClick={handleData}
                type="submit"
              >
                Save and next
              </Button>
            </Box>
          )}
          {/* educational detail */}
          {currentSection === 3 && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  gap: "10px",
                  border: "1px solid black",
                  padding: "10px",
                }}
              >
                <HeadingBox heading={"Residential Details"} />
                <ForwardedTextInput
                  label="Local Address"
                  type="text"
                  error={errors?.localAddress ? true : false}
                  helperText={errors?.localAddress?.message}
                  placeholder="localAddress"
                  disabled={
                    watch("localAddress")?.length > 0 &&
                    watch("localAddress") === watch("permanentAddress")
                  }
                  isRequired
                  {...register("localAddress", {
                    required: "localAddress is Required",
                  })}
                />
                <FormControlLabel
                  defaultValue={false}
                  disabled={!watch("localAddress")}
                  control={<Switch checked={permanentAddress} />}
                  label="same as local"
                  onChange={handleAddress}
                />
                <ForwardedTextInput
                  label="Permanent Address"
                  type="text"
                  error={errors?.permanentAddress ? true : false}
                  helperText={errors?.permanentAddress?.message}
                  placeholder="permanentAddress"
                  isRequired
                  {...register("permanentAddress", {
                    required: "permanentAddress is Required",
                  })}
                />
                <Button
                  sx={{ border: "1px solid black" }}
                  onClick={handleNextButton}
                >
                  Next{" "}
                </Button>
                <Button
                  sx={{ border: "1px solid black" }}
                  onClick={handlePrevButton}
                >
                  Back{" "}
                </Button>
                <Button
                  sx={{
                    backgroundColor: "blue",
                    color: "white",
                    padding: "10px",
                    "&:hover": {
                      color: "blue",
                    },
                  }}
                  onClick={handleData}
                  type="submit"
                >
                  Save and next
                </Button>
              </Box>
            </>
          )}
          {currentSection === 4 && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  gap: "10px",
                  border: "1px solid black",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <HeadingBox heading={"Educational Details"} />
                <ControlledRadioButtonsGroup
                  label="Are u a"
                  name="eduDesignation"
                  defaultValue={educationOptions[0].value}
                  data={educationOptions}
                />
                {methods.watch("eduDesignation") === "student" && (
                  <>
                    <ForwardedTextInput
                      label="Last Attained Qualification"
                      type="text"
                      error={errors?.qualification ? true : false}
                      helperText={errors?.qualification?.message}
                      placeholder="Your latest educational degree / diploma"
                      isRequired
                      {...register("qualification", {
                        required: "qualification is Required",
                      })}
                    />
                    <ForwardedTextInput
                      label="Year"
                      type="text"
                      error={errors?.year ? true : false}
                      helperText={errors?.year?.message}
                      placeholder="Completion year"
                      isRequired
                      {...register("year", {
                        required: "year is Required",
                      })}
                    />
                    <ForwardedTextInput
                      label="College / University"
                      type="text"
                      error={errors?.college ? true : false}
                      helperText={errors?.college?.message}
                      placeholder="College / University"
                      isRequired
                      {...register("college", {
                        required: "college is Required",
                      })}
                    />
                  </>
                )}
                {methods.watch("eduDesignation") === "workingProfessionals" && (
                  <>
                    <ForwardedTextInput
                      label="Designation"
                      type="text"
                      error={errors?.designation ? true : false}
                      helperText={errors?.designation?.message}
                      placeholder="Designation"
                      isRequired
                      {...register("designation", {
                        required: "designation is Required",
                      })}
                    />
                    <ForwardedTextInput
                      label="Company"
                      type="text"
                      error={errors?.company ? true : false}
                      helperText={errors?.company?.message}
                      placeholder="Company"
                      isRequired
                      {...register("company", {
                        required: "company is Required",
                      })}
                    />
                  </>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  gap: "10px",
                  border: "1px solid black",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <HeadingBox heading={"Course Details"} />
                {/* <ForwardedTextInput
                label="Course"
                type="text"
                error={errors?.course ? true : false}
                helperText={errors?.course?.message}
                placeholder="course"
                isRequired
                {...register("course", {
                  required: "course is Required",
                })}
              /> */}
                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-required-label">
                    Course Detail
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    placeholder="Select a Course"
                    {...register("coursedetail", {
                      required: "coursedetail is Required",
                    })}
                    // error={errors?.coursedetail ? true : false}
                    // helperText={errors?.coursedetail?.message}
                    value={watch("coursedetail") || ""}
                    label="Course detail"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {coursesData?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item?.value}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {watch("coursedetail") === "otherCourse" && (
                  <ForwardedTextInput
                    type="text"
                    error={errors?.otherCourse ? true : false}
                    helperText={errors?.otherCourse?.message}
                    placeholder="add a course"
                    isRequired
                    {...register("otherCourse", {
                      required: "coursedetail is Required",
                    })}
                  />
                )}
                <ControlledRadioButtonsGroup
                  label="How you came to know about us?"
                  name="analytics"
                  defaultValue={analyticsOptions[0].value}
                  data={analyticsOptions}
                />
                {methods.watch("analytics") === "friend" && (
                  <ForwardedTextInput
                    label="Friend Name"
                    type="text"
                    error={errors?.friendName ? true : false}
                    helperText={errors?.friendName?.message}
                    placeholder="your friend name"
                    isRequired
                    {...register("friendName", {
                      required: "friendName is Required",
                    })}
                  />
                )}
              </Box>
              <FormControlLabel
                defaultValue={false}
                aria-readonly
                control={<Switch checked={confirmation} />}
                disabled={!confirmation}
                // label="same as local"
              />{" "}
              By clicking submit, you agree to our{" "}
              <a
                style={{ color: "blue", cursor: "pointer" }}
                onClick={handleOpen}
              >
                Terms & Conditions
              </a>
              <Button
                sx={{ border: "1px solid black" }}
                onClick={handlePrevButton}
              >
                Back{" "}
              </Button>
              <Button
                sx={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "10px",
                  width: "100%",
                  "&:hover": {
                    color: "blue",
                  },
                }}
                onClick={handleData}
                type="submit"
              >
                Submit
              </Button>
              <Button
                sx={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "10px",
                  width: "100%",
                  "&:hover": {
                    color: "blue",
                  },
                }}
                onClick={getData}
                type="submit"
              >
                getData
              </Button>
            </>
          )}
        </form>
        <ConfirmationModal
          open={open}
          setOpen={setOpen}
          setConfirmation={setConfirmation}
          confirmation={confirmation}
        />
      </Box>
    </FormProvider>
  );
};

export default RegisterForm;
