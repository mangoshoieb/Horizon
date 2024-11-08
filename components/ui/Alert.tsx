import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function OutlinedAlerts() {
  return (
    <Stack sx={{ width: '401px' ,position:"absolute", left:"30%",top:"3%"}} spacing={2}>
      <Alert variant="outlined" severity="warning" className='text-[20px] flex items-center justify-center text-red-500'>
        This is project has not done yet
      </Alert>
    </Stack>
  );
}
