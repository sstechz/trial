import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const Discussions = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        paddingTop: "60px",
        bgcolor: "cyan",
      }}
      //   style={{
      //     backgroundImage: `url(${bg})`,
      //     backgroundSize: "cover",
      //     backgroundRepeat: "repeat",
      //   }}
    >
      {/* <Typography>This is the sports component</Typography> */}

      <Box sx={{ bgcolor: "yellow" }}>
        <Typography>Discussions & Chat-room</Typography>
      </Box>

      <Stack direction={"row"} gap={3} bgcolor={"red"}>
        <Stack
          direction={"column"}
          sx={{
            height: "320px",
            width: "300px",
            bgcolor: "olivedrab",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ height: "40px", width: "150px", bgcolor: "magenta" }}>
            <Typography>Badminton</Typography>
          </Box>
          <Stack
            direction={"row"}
            gap={1}
            sx={{
              height: "90%",
              width: "90%",
              bgcolor: "aqua",
              alignItems: "end",
              justifyContent: "center",
            }}
          >
            
            <Stack direction={"column"} sx={{ bgcolor: "darkcyan" }}>
              <Typography>Members : 30</Typography>
              <Typography>Date : 14th Nov.</Typography>
              <Typography>Duration : 4 days</Typography>
              <Typography>Timing : 4pm - 8pm</Typography>
            </Stack>
            <Box sx={{ height: "40px", width: "100px", bgcolor: "darkcyan" }}>
              <Button>
                <Typography sx={{ color: "black" }}>Chat</Typography>
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Discussions;
