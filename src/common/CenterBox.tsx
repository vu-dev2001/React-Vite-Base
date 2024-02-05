import { Box, BoxProps } from '@mui/material';
import { PropsWithChildren } from 'react';

export const CenterBox = ({
  children,
  sx,
  ...rest
}: PropsWithChildren<BoxProps>) => {
  return (
    <Box
      {...rest}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
