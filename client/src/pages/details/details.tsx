import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import DetailsBanner from './detailsBanner/detailsBanner';
import Players from './players/players';

const Details = () => {

  const { sports } = useParams<{ sports: "Badminton" | "Cricket" | "Basketball" | "Football" | "Table_Tennis" }>();

  if (!sports) {
    return null; // or display an error message
  }

  return (
    <Box>
        <DetailsBanner sports = {sports}/>
        <Players sports = {sports}/>
    </Box>
  )
}

export default Details;