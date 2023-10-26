import { Box, Typography, Stack, Button } from "@mui/material";
import React, { useState } from "react";

import "./sports.scss";
// import bg from "../assets/bg.jpg";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import Carousel from "../../../components/carousel/Carousel";
import Discussion from "../../../components/discussion/Discussion";

const Sports = () => {
  const [endpoint, setEndpoint] = useState("sports_arena");

  const onTabChange = (tab: string) => {
    setEndpoint(tab === "Sports Arena" ? "sports_arena" : "discussions");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">SpotLight</span>
        <SwitchTabs
          data={["Sports Arena", "Discussions"]}
          onTabChange={onTabChange}
        />
      </ContentWrapper>
      {endpoint === 'sports_arena' ? <Carousel /> : <Discussion/>}
    </div>
  );
};

export default Sports;

// <Box
//   sx={{
//     width: "100%",
//     height: "100%",
//     paddingTop: "60px",
//     bgcolor: "cyan",
//   }}
// >
//   <Box sx={{ bgcolor: "yellow" }}>
//     <Typography>Sports Arena</Typography>
//   </Box>

//   <Stack direction={"row"} gap={3} bgcolor={"red"}>
//     <Stack
//       direction={"column"}
//       sx={{ height: "320px", width: "300px", bgcolor: "olivedrab", alignItems: 'center', justifyContent: 'center' }}
//     >
//       <Box sx={{ height: "40px", width: "150px", bgcolor: "magenta" }}>
//         <Typography>Badminton</Typography>
//       </Box>
//       <Stack
//         direction={"row"}
//         gap={1}
//         sx={{ height: '90%', width: '90%', bgcolor: "aqua", alignItems: 'end', justifyContent: 'center' }}
//       >
//         <Stack direction={"column"} sx={{ bgcolor: "darkcyan" }}>
//           <Typography>Days Left : 18</Typography>
//           <Typography>Venue : Old Hostel</Typography>
//           <Typography>Timing : 4pm</Typography>
//         </Stack>
//         <Box sx={{ height: "40px", width: "100px", bgcolor: "darkcyan"}}>
//           <Button ><Typography sx={{color: 'black'}}>Enter</Typography></Button>
//         </Box>
//       </Stack>
//     </Stack>

//     <Stack
//       direction={"column"}
//       sx={{ height: "320px", width: "300px", bgcolor: "olivedrab", alignItems: 'center', justifyContent: 'center' }}
//     >
//       <Box sx={{ height: "40px", width: "150px", bgcolor: "magenta" }}>
//         <Typography>Basket_Ball</Typography>
//       </Box>
//       <Stack
//         direction={"row"}
//         gap={1}
//         sx={{ height: '90%', width: '90%', bgcolor: "aqua", alignItems: 'end', justifyContent: 'center' }}
//       >
//         <Stack direction={"column"} sx={{ bgcolor: "darkcyan" }}>
//           <Typography>Days Left : 18</Typography>
//           <Typography>Venue : Basket_ball_court</Typography>
//           <Typography>Timing : 4pm</Typography>
//         </Stack>
//         <Box sx={{ height: "40px", width: "100px", bgcolor: "darkcyan"}}>
//           <Button ><Typography sx={{color: 'black'}}>Enter</Typography></Button>
//         </Box>
//       </Stack>
//     </Stack>

//     <Stack
//       direction={"column"}
//       sx={{ height: "320px", width: "300px", bgcolor: "olivedrab", alignItems: 'center', justifyContent: 'center' }}
//     >
//       <Box sx={{ height: "40px", width: "150px", bgcolor: "magenta" }}>
//         <Typography>Cricket</Typography>
//       </Box>
//       <Stack
//         direction={"row"}
//         gap={1}
//         sx={{ height: '90%', width: '90%', bgcolor: "aqua", alignItems: 'end', justifyContent: 'center' }}
//       >
//         <Stack direction={"column"} sx={{ bgcolor: "darkcyan" }}>
//           <Typography>Days Left : 18</Typography>
//           <Typography>Venue : Cricket_ground</Typography>
//           <Typography>Timing : 4pm</Typography>
//         </Stack>
//         <Box sx={{ height: "40px", width: "100px", bgcolor: "darkcyan"}}>
//           <Button ><Typography sx={{color: 'black'}}>Enter</Typography></Button>
//         </Box>
//       </Stack>
//     </Stack>

//     <Stack
//       direction={"column"}
//       sx={{ height: "320px", width: "300px", bgcolor: "olivedrab", alignItems: 'center', justifyContent: 'center' }}
//     >
//       <Box sx={{ height: "40px", width: "150px", bgcolor: "magenta" }}>
//         <Typography>Badminton</Typography>
//       </Box>
//       <Stack
//         direction={"row"}
//         gap={1}
//         sx={{ height: '90%', width: '90%', bgcolor: "aqua", alignItems: 'end', justifyContent: 'center' }}
//       >
//         <Stack direction={"column"} sx={{ bgcolor: "darkcyan" }}>
//           <Typography>Days Left : 18</Typography>
//           <Typography>Venue : Old Hostel</Typography>
//           <Typography>Timing : 4pm</Typography>
//         </Stack>
//         <Box sx={{ height: "40px", width: "100px", bgcolor: "darkcyan"}}>
//           <Button ><Typography sx={{color: 'black'}}>Enter</Typography></Button>
//         </Box>
//       </Stack>
//     </Stack>

//     <Stack
//       direction={"column"}
//       sx={{ height: "320px", width: "300px", bgcolor: "olivedrab", alignItems: 'center', justifyContent: 'center' }}
//     >
//       <Box sx={{ height: "40px", width: "150px", bgcolor: "magenta" }}>
//         <Typography>Badminton</Typography>
//       </Box>
//       <Stack
//         direction={"row"}
//         gap={1}
//         sx={{ height: '90%', width: '90%', bgcolor: "aqua", alignItems: 'end', justifyContent: 'center' }}
//       >
//         <Stack direction={"column"} sx={{ bgcolor: "darkcyan" }}>
//           <Typography>Days Left : 18</Typography>
//           <Typography>Venue : Old Hostel</Typography>
//           <Typography>Timing : 4pm</Typography>
//         </Stack>
//         <Box sx={{ height: "40px", width: "100px", bgcolor: "darkcyan"}}>
//           <Button ><Typography sx={{color: 'black'}}>Enter</Typography></Button>
//         </Box>
//       </Stack>
//     </Stack>
//   </Stack>
// </Box>
