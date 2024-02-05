import { SxProps, Theme } from '@mui/material';
import { FieldValues, UseFormReturn } from 'react-hook-form';

interface XS {
  xs?: number;
  md?: number;
  xl?: number;
}

interface Option {
  title: string;
  value: string | number;
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
  title: string;
  key?: string;
  sx?: SxProps<Theme>;
  headerSx?: SxProps<Theme>;
  inputSx?: SxProps<Theme>;
  headerXs?: XS;
  inputXs?: XS;
  label?: string;
  placeholder?: string;
  rightElementGrid?: XS;
  name: string;
  rightElement?: React.ReactNode;
  children?: React.ReactNode;
  options?: unknown;
  supportText?: string;
  errorText?: string;
} & (
  | {
      type: 'text' | 'number' | 'date';
    }
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

export interface CustomFormOption<T extends FieldValues = FieldValues> {
  methods: UseFormReturn<T>;
  formFields: CustomFormInput[]
}
