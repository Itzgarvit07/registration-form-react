import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Checkbox } from "@mui/material";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ConfirmationModal({
  open,
  setOpen,
  setConfirmation,
  confirmation,
}) {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event) => {
    setConfirmation(!confirmation);
  };
  useEffect(() => {
    console.log(confirmation);
    if (confirmation) {
      setOpen(false);
    }
  }, [confirmation]);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            borderBottom={"1px solid grey"}
          >
            Term & Conditions
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You agree to the following:
          </Typography>
          <ul>
            <li>You have understood the course content.</li>
            <li>You have understood the course duration.</li>
            <li>
              You have cleared all your doubts regarding the course, the content
              and the duration and have no problem with it.
            </li>
            <li>Fees once paid is not refundable.</li>
          </ul>
          {/* <Button
            onClick={() => {
              setConfirmation(true);
            }}
          >
            I agree
          </Button> */}
          <Checkbox
            checked={confirmation}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Box>
      </Modal>
    </div>
  );
}
