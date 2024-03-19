import { Delete, Upload } from "@mui/icons-material";
import { Box, Grid, IconButton, TextField } from "@mui/material";
import { useState } from "react";

import profileImage from "../../assets/dog-img.jpg";
import { editUserApi } from "../../api/api";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import BasicButton from "../../components/BasicButton";

function General() {
  const { id, firstName, lastName, emailAddress, image } = useSelector(
    (state: RootState) => state.account
  );

  const [input, setInput] = useState({
    firstName,
    lastName,
    emailAddress,
    image,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await editUserApi(input);
    setLoading(false);
  };

  const updateField = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
            >
              <img
                src={profileImage}
                alt="profile image"
                height={200}
                width={200}
                style={{ objectFit: "cover", borderRadius: 100 }}
              />
              <Box display="flex" gap={1}>
                <IconButton>
                  <Upload />
                </IconButton>
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="firstName"
            label="First Name"
            variant="outlined"
            fullWidth
            value={input?.firstName}
            onChange={updateField}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="lastName"
            label="Last Name"
            variant="outlined"
            fullWidth
            value={input?.lastName}
            onChange={updateField}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="emailAddress"
            label="Email"
            variant="outlined"
            fullWidth
            value={input?.emailAddress}
            onChange={updateField}
          />
        </Grid>
      </Grid>
      <Box display="flex" flexDirection="row-reverse" pt={2} gap={2}>
        <BasicButton
          type="submit"
          variant="contained"
          color="primary"
          isLoading={loading}
        >
          Save
        </BasicButton>
      </Box>
    </form>
  );
}

export default General;
