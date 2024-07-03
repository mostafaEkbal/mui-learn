import React, { useState } from 'react';
import BasicInput from '@/components/common/BasicInput/BasicInput';
import CommonButton from '@/components/common/CommonButton/CommonButton';
import { Box, TextFieldProps } from '@mui/material';
import DefaultLayout from '@/layouts/DefaultLayout';
import GridWrapper from '@/components/common/GridWrapper/GridWrapper';

const ParentComponent = () => {
    const [isNameValid, setIsNameValid] = useState(true);
    const [nameError, setNameError] = useState<string | null>(null);
    const [nameTouched, setNameTouched] = useState(false);

    const handleValidationChange = (
        isValid: boolean,
        error: string | null,
        touched: boolean
    ) => {
        setIsNameValid(isValid);
        setNameError(error);
        setNameTouched(touched);
    };

    const handleSubmit = () => {
        if (isNameValid && nameTouched) {
            // Proceed with form submission
            console.log('Name and email is valid.');
        } else {
            console.log('Name is invalid.');
        }
    };

    return (
        <DefaultLayout>
            <GridWrapper>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        width: '400px',
                        alignItems: 'start'
                    }}
                >
                    <BasicInput
                        name='name'
                        inputType='name'
                        label='Name'
                        required
                        onValidationChange={handleValidationChange}
                    />
                    <BasicInput
                        name='email'
                        inputType='email'
                        label='Email'
                        required
                        onValidationChange={handleValidationChange}
                    />
                    <BasicInput
                        name='password'
                        inputType='password'
                        label='Password'
                        required
                        onValidationChange={handleValidationChange}
                    />
                    <BasicInput
                        name='phoneNumber'
                        inputType='phoneNumber'
                        label='PhoneNumber'
                        required
                        onValidationChange={handleValidationChange}
                    />
                    <CommonButton onClick={handleSubmit}>Submit</CommonButton>
                </Box>
            </GridWrapper>
        </DefaultLayout>
    );
};

export default ParentComponent;
