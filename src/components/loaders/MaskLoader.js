import React from 'react';
import Box from '@mui/material/Box';
import GlobalLoader from '../../assets/images/loader/loader.gif';
import './loaders.main.scss';
import Center from '../Center'

const MaskLoader = () => (
  <Box className="comonent-mask-loader-wrapper">
    <Center>
      <img
        src={GlobalLoader}
        alt={GlobalLoader}
        loading="lazy"
      />
    </Center>
   
  </Box>
);
export default MaskLoader;
