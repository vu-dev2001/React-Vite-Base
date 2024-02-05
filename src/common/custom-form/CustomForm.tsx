import { Add } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Box,
  BoxProps,
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SxProps,
  TextField,
  Theme,
  Typography,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React, {
  ChangeEvent,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CustomFormText, {
  CustomFormTextInput,
  CustomFormTextProps,
} from './components/CustomFormText';
import { CenterBox } from '../CenterBox';
// import dayjs from 'dayjs'

interface Option {
  title: string;
  value: string | number;
}

interface XS {
  xs?: number;
  md?: number;
  xl?: number;
}
export interface CustomFormDateRange {
  type: 'dateRange';
  disableSeperation?: boolean;
  disableStartDate?: boolean;
  disableEndDate?: boolean;
}

export interface CustomFormDateTimeRange {
  type: 'dateTimeRange';
  disableSeperation?: boolean;
  disableStartDate?: boolean;
  disableEndDate?: boolean;
}

interface CustomFormFileInput {
  type: 'file';
  hiddentUploadButton?: boolean;
  hiddenChooseFromRecord?: boolean;
}

export type CustomFormInput = {
  title?: string;
  name: string;
  key?: string;
  sx?: SxProps<Theme>;
  headerSx?: SxProps<Theme>;
  inputSx?: SxProps<Theme>;
  headerXs?: XS;
  inputXs?: XS;
  rightElementGrid?: XS;
  rightElement?: React.ReactNode;
  children?: React.ReactNode;
  options?: unknown;
  supportText?: string;
  errorText?: string;
} & (
  | {
      type: 'number' | 'date';
    }
  | ({ type: 'text' } & CustomFormTextInput)
  | CustomFormDateRange
  | CustomFormDateTimeRange
  | CustomFormFileInput
  | {
      type: 'select';
      options: Option[];
    }
  | {
      type: 'radio';
      options: string[];
    }
  | {
      type: 'boolean';
    }
  | {
      type: 'custom';
      children: React.ReactNode;
    }
);
interface CustomFormProps {
  fieldList: CustomFormInput[];
  sx?: SxProps<Theme>;
}
const CustomForm = ({ fieldList, sx }: CustomFormProps) => {
  // console.log('=======================================')
  return (
    <Box
      sx={{
        width: '100%',
        '> *': {
          marginBottom: '1rem',
        },
        ...sx,
      }}
    >
      {fieldList.map((field, index) => {
        return (
          <CustomFormInput field={field} key={field.name + 'Attr' + index} />
        );
      })}
    </Box>
  );
};

const CustomFormInput = ({
  field: {
    title,
    headerSx,
    inputSx,
    type,
    name,
    sx,
    headerXs = { xs: 2 },
    inputXs = { xs: 8 },
    rightElement,
    rightElementGrid,
    key,
    supportText,
    errorText,
    ...rest
  },
}: {
  field: CustomFormInput;
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  // const fileRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  // const [tmpFile, setTmpFile] = useState<FileList | null>(null);
  return (
    <Grid
      container
      key={key}
      sx={{
        '> *': {
          display: 'flex',
          alignItems: 'center',
          '&:last_child()': {
            paddingBottom: '0rem',
          },
          '> *': {
            width: '100%',
          },
        },
        ...sx,
      }}
    >
      {title && (
        <Grid item sx={{ ...headerSx }} {...(headerXs || {})}>
          <Box sx={{ paddingRight: '1.5rem' }}>
            <Typography>{title}</Typography>
          </Box>
        </Grid>
      )}
      <Grid item sx={{ ...inputSx }} {...(inputXs || {})}>
        <CenterBox>
          {type === 'text' && (
            <CustomFormText
              name={name}
              errors={errors}
              control={control}
              {...rest}
            />
          )}
          {/* {type === 'number' && (
            <Controller
              control={control}
              name={name}
              render={({ field: { onChange, value, ref } }) => {
                return (
                  <TextField
                    fullWidth
                    label={label}
                    {...(placeholder ? { placeholder } : {})}
                    onChange={(e) => {
                      onChange({
                        target: { value: parseInt(e.target.value) },
                      });
                    }}
                    ref={ref}
                    sx={{
                      ...(errors && errors[name] ? errorCss : {}),
                    }}
                    type="number"
                    value={value}
                  />
                );
              }}
            />
          )}
          {type === 'select' && (
            <Controller
              control={control}
              name={name}
              render={({ field: { onChange, value, ref } }) => {
                return (
                  <Select
                    fullWidth
                    label={label}
                    {...(placeholder ? { placeholder } : {})}
                    onChange={onChange}
                    ref={ref}
                    value={value}
                  >
                    {((rest.options as Option[]) || []).map(
                      (option: Option, index: number) => (
                        <MenuItem
                          key={name + 'option' + option.value + index}
                          value={option.value}
                        >
                          {option.title}
                        </MenuItem>
                      )
                    )}
                  </Select>
                );
              }}
            />
          )}
          {type === 'file' && (
            <Controller
              control={control}
              name={name}
              render={({ field: { onChange, ref } }) => {
                const remainField = rest as CustomFormFileInput;
                return (
                  <Box alignItems={'center'} display={'flex'}>
                    <Box display={'flex'} gap={2}>
                      <Button
                        onClick={() => {
                          if (!fileRef || !fileRef.current) return;
                          fileRef.current.click();
                        }}
                        startIcon={<Add />}
                        sx={{
                          textTransform: 'none',
                          borderRadius: '24px',
                        }}
                        variant={'outlined'}
                      >
                        Choose File
                      </Button>
                      <input
                        accept="text/csv"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setTmpFile(e.target.files ?? null);
                          if (remainField.hiddentUploadButton) {
                            onChange({
                              target: {
                                value: e.target.files ?? null,
                                name: name,
                              },
                            });
                          }
                        }}
                        ref={(e) => {
                          ref(e);
                          fileRef.current = e;
                        }}
                        style={{
                          display: 'none',
                        }}
                        type={'file'}
                      />
                      <Typography
                        alignSelf={'center'}
                        sx={{
                          maxWidth: '462px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden !important',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {tmpFile && tmpFile[0].name
                          ? tmpFile[0].name
                          : 'No File Chosen'}
                      </Typography>
                      {remainField.hiddentUploadButton || (
                        <Button
                          onClick={() => {
                            onChange({
                              target: {
                                value: tmpFile,
                                name: name,
                              },
                            });
                          }}
                          sx={(theme) => ({
                            textTransform: 'none',
                            borderRadius: '24px',
                            backgroundColor: theme.palette.secondary.main,
                            color: '#FFFFFF',
                            '&:hover': {
                              backgroundColor: theme.palette.secondary.main,
                            },
                          })}
                          variant={'outlined'}
                        >
                          Upload
                        </Button>
                      )}
                      {remainField.hiddenChooseFromRecord || (
                        <Button
                          sx={{
                            color: '#006783',
                            backgroundColor: '#EBF3F5',
                            height: '2rem',
                            borderRadius: '1rem',
                          }}
                        >
                          Choose from Record
                        </Button>
                      )}
                    </Box>
                  </Box>
                );
              }}
            />
          )}
          {type === 'radio' && (
            <Controller
              control={control}
              name={name}
              render={({ field: { onChange, value } }) => {
                return (
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    onChange={(e) => {
                      onChange({ target: { value: parseInt(e.target.value) } });
                    }}
                    row
                    value={value}
                  >
                    {((rest.options as string[]) || []).map(
                      (option: string, index: number) => (
                        <FormControlLabel
                          control={<Radio />}
                          key={`${name}_radio_${index}`}
                          label={option}
                          value={index}
                        />
                      )
                    )}
                  </RadioGroup>
                );
              }}
            />
          )} */}

          {type === 'custom' && <Box>{rest.children}</Box>}

          {/* {type === 'date' && (
            <Controller
              control={control}
              name={name}
              {...(placeholder ? { placeholder } : {})}
              render={({ field: { onChange, value, ref } }) => {
                return (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <CenterBox
                      sx={{
                        width: '100%',
                        display: 'flex',
                        '> *': {
                          mr: '1rem',
                          '&:last-child': {
                            mr: 0,
                          },
                        },
                      }}
                    >
                      <DatePicker
                        label={label}
                        onChange={(e) => {
                          console.log(new Date(value));
                          onChange(e);
                        }}
                        ref={ref}
                        sx={{ width: '100%' }}
                        value={value}
                      />
                    </CenterBox>
                  </LocalizationProvider>
                );
              }}
            />
          )}

          {type === 'dateRange' && (
            <Controller
              control={control}
              name={name}
              render={({ field: { onChange, value } }) => {
                const tmp: CustomFormDateRange = rest as CustomFormDateRange;
                return (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <CenterBox
                      sx={{
                        display: 'flex',
                        width: '100%',
                      }}
                    >
                      {tmp?.disableStartDate ? (
                        <Box>
                          <Typography sx={{ textAlign: 'left' }}>
                            {value &&
                              value.startDate.format('YYYY-MM-DD hh:mm:ss')}
                          </Typography>
                        </Box>
                      ) : (
                        <DatePicker
                          onChange={(e) => {
                            value.startDate = e;
                            onChange({ target: { value } });
                          }}
                          sx={{
                            width: tmp?.disableEndDate
                              ? `calc(100% - ${
                                  tmp?.disableSeperation === true ? '1' : '3'
                                }rem - 130px)`
                              : `calc(calc(50% - ${
                                  tmp?.disableSeperation === true ? '' : '1'
                                }.5rem)`,
                          }}
                          value={value.startDate}
                        />
                      )}
                      {!(tmp?.disableSeperation === true) ? (
                        <Box sx={{ width: '3rem' }}>
                          <Typography
                            sx={{ fontSize: '1.5rem', textAlign: 'center' }}
                          >
                            ~
                          </Typography>
                        </Box>
                      ) : (
                        <Box width={'1rem'} />
                      )}
                      {tmp?.disableEndDate ? (
                        <Box>
                          <Typography
                            sx={{ fontSize: '1.5rem', textAlign: 'left' }}
                          >
                            0000/00/00 00:00
                          </Typography>
                        </Box>
                      ) : (
                        <DatePicker
                          onChange={(e) => {
                            value.endDate = e;
                            onChange({ target: { value } });
                          }}
                          sx={{
                            width: tmp?.disableStartDate
                              ? `calc(100% - ${
                                  tmp?.disableSeperation ? '1' : '3'
                                }rem - 130px)`
                              : `calc(calc(50% - ${
                                  tmp?.disableSeperation ? '' : '1'
                                }.5rem)`,
                          }}
                          value={value.endDate}
                        />
                      )}
                    </CenterBox>
                  </LocalizationProvider>
                );
              }}
            />
          )}

          {type === 'dateTimeRange' && (
            <Controller
              control={control}
              name={name}
              render={({ field: { onChange, value } }) => {
                const tmp: CustomFormDateRange = rest as CustomFormDateRange;

                return (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <CenterBox
                      sx={{
                        display: 'flex',
                        width: '100%',
                      }}
                    >
                      {tmp?.disableStartDate ? (
                        <CenterBox
                          sx={{
                            width: '130px',
                            boxSizing: 'border-box',
                          }}
                        >
                          <Typography sx={{ textAlign: 'left' }}>
                            {value &&
                              value.startDate.format('YYYY-MM-DD hh:mm:ss')}
                          </Typography>
                        </CenterBox>
                      ) : (
                        <DateTimePicker
                          onChange={(e) => {
                            value.startDate = e;
                            onChange({ target: { value } });
                          }}
                          sx={{
                            width: tmp?.disableEndDate
                              ? `calc(100% - ${
                                  tmp?.disableSeperation === true ? '1' : '3'
                                }rem - 130px)`
                              : `calc(calc(50% - ${
                                  tmp?.disableSeperation === true ? '' : '1'
                                }.5rem)`,
                          }}
                          value={value.startDate}
                        />
                      )}
                      {!(tmp?.disableSeperation === true) ? (
                        <Box sx={{ width: '3rem' }}>
                          <Typography
                            sx={{ fontSize: '1.5rem', textAlign: 'center' }}
                          >
                            ~
                          </Typography>
                        </Box>
                      ) : (
                        <Box width={'1rem'} />
                      )}
                      {tmp?.disableEndDate ? (
                        <Box
                          sx={{
                            width: '130px',
                            boxSizing: 'border-box',
                          }}
                        >
                          <Typography sx={{ textAlign: 'left' }}>
                            {value &&
                              value.endDate.format('YYYY-MM-DD hh:mm:ss')}
                          </Typography>
                        </Box>
                      ) : (
                        <DateTimePicker
                          onChange={(e) => {
                            value.endDate = e;
                            onChange({ target: { value } });
                          }}
                          sx={{
                            width: tmp?.disableStartDate
                              ? `calc(100% - ${
                                  tmp?.disableSeperation ? '1' : '3'
                                }rem - 130px)`
                              : `calc(calc(50% - ${
                                  tmp?.disableSeperation ? '' : '1'
                                }.5rem)`,
                          }}
                          value={value.endDate}
                        />
                      )}
                    </CenterBox>
                  </LocalizationProvider>
                );
              }}
            />
          )} */}
        </CenterBox>
      </Grid>
      {rightElement && (
        <Grid item {...(rightElementGrid || {})}>
          <CenterBox
            sx={{
              marginLeft: '1rem',
              whiteSpace: 'nowrap',
              fontSize: '1rem',
            }}
          >
            {rightElement}
          </CenterBox>
        </Grid>
      )}
      {(supportText || errorText || errors) && (
        <>
          <Box sx={{ width: '100%', padding: 0 }} />
          <Grid item paddingTop={0} {...(headerXs || {})} />
          <Grid
            item
            paddingTop={0}
            xs={12 - (headerXs.xs || 0)}
            {...(headerXs && headerXs.md ? { md: 12 - headerXs.md } : {})}
            {...(headerXs && headerXs.xl ? { xl: 12 - headerXs.xl } : {})}
          >
            {supportText && (
              <Box marginTop={'.5rem'}>
                <Typography>{supportText}</Typography>
              </Box>
            )}
            {errors && errors[name] && (
              <Box sx={{ color: 'red', marginTop: '.5rem' }}>
                {errors[name]?.message as ReactNode}
              </Box>
            )}
          </Grid>
        </>
      )}
    </Grid>
  );
};
export default CustomForm;
