import { Box, TextField } from '@mui/material';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { CenterBox } from '../../CenterBox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

export interface CustomFormTextInput {
  label?: string;
  placeholder?: string;
  inputType?: 'text' | 'password' | 'email' | 'number' | 'tel';
  color?: string;
  backgroundColor?: string;
}
interface CustomFormTextProps {
  control: Control<FieldValues>;
  errors: FieldErrors<FieldValues>;
  name: string;
}

const CustomFormText = ({
  control,
  name,
  errors,
  label,
  placeholder,
  inputType = 'text',
  color = 'black',
  backgroundColor = 'white',
}: CustomFormTextProps & CustomFormTextInput) => {
  const [currentType, setCurrentType] = useState<
    'text' | 'password' | 'email' | 'number' | 'tel'
  >(inputType);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref } }) => {
        return (
          <CenterBox sx={{ position: 'relative' }}>
            <TextField
              error={errors && errors[name] ? true : false}
              fullWidth
              label={label}
              {...(placeholder ? { placeholder } : {})}
              onChange={(e) => {
                onChange({
                  target: { value: e.target.value },
                });
              }}
              sx={{
                input: {
                  padding: '.5rem',
                  color,
                },
                '.MuiFilledInput-root': {
                  backgroundColor,
                },
                'label:not(.MuiInputLabel-shrink)': {
                  top: '-.5rem',
                },
              }}
              ref={ref}
              value={value}
              type={currentType}
            />
            <Box
              sx={{
                position: 'absolute',
                right: '.75rem',
                height: '100%',
                display: inputType === 'password' ? 'flex' : 'none',
                justifyContent: 'center',
                alignItems: 'center',
                '> *': {
                  fontSize: '1.5rem',
                },
              }}
            >
              <VisibilityIcon
                sx={{
                  display: currentType === 'password' ? '' : 'none',
                }}
                onClick={() => {
                  setCurrentType('text');
                }}
              />
              <VisibilityOffIcon
                sx={{
                  display: currentType === 'password' ? 'none' : '',
                }}
                onClick={() => {
                  setCurrentType('password');
                }}
              />
            </Box>
          </CenterBox>
        );
      }}
    />
  );
};

export default CustomFormText;
