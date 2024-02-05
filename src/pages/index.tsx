import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Card } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import CustomForm, { CustomFormInput } from '../common/custom-form/CustomForm';
import { useMemo } from 'react';

interface LoginFormInput {
  email: string;
  passwd: string;
}

const Dashboard = () => {
  const loginFormSchema = z.object({
    email: z
      .string()
      // .email('Input must be in email format')
      .max(50, 'Email must contain at most 10 character(s)'),
    passwd: z.string().max(50, 'Password must contain at most 10 character(s)'),
  });
  const defaultValues: LoginFormInput = {
    email: '',
    passwd: '',
  };

  const methods = useForm<LoginFormInput>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const fieldList: CustomFormInput[] = useMemo(() => {
    return [
      {
        name: 'email',
        type: 'text',
        inputXs: { xs: 12 },
        label: 'Username or Email',
        headerXs: { xs: 12 },
        color: 'red',
        backgroundColor: 'green',
      },
      {
        name: 'passwd',
        type: 'text',
        inputType: 'password',
        inputXs: { xs: 12 },
        label: 'Date',
        headerXs: { xs: 12 },
      },
    ];
  }, []);

  const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
    console.log(data);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        padding: '1rem',
        boxSizing: 'border-box',
        position: 'relative',
        backgroundColor: '#312e2b',
      }}
    >
      <Card
        sx={{
          width: '350px',
          padding: '1rem',
        }}
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <CustomForm fieldList={fieldList} />
          </form>
        </FormProvider>
      </Card>
    </Box>
  );
};
export default Dashboard;
