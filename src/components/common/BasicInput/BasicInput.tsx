import React, { useState, useEffect, useCallback } from 'react';
import {
    BaseTextFieldProps,
    IconButton,
    InputAdornment,
    TextField
} from '@mui/material';
import * as Yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface IBasicInputProps extends BaseTextFieldProps {
    inputType: 'name' | 'password' | 'email' | 'phoneNumber';
    regExp?: RegExp;
    name: string;
    label: string;
    required?: boolean;
    onValidationChange: (
        isValid: boolean,
        error: string | null,
        touched: boolean
    ) => void;
}

const BasicInput: React.FC<IBasicInputProps> = ({
    inputType,
    variant,
    placeholder,
    label,
    required = false,
    regExp,
    name,
    onValidationChange,
    ...props
}) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [touched, setTouched] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = useCallback(() => {
        setShowPassword((show) => !show);
    }, []);

    const handleMouseDownPassword = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
        },
        []
    );

    const getDefaultValidation = useCallback((inputType: string) => {
        switch (inputType) {
            case 'name':
                return Yup.string();
            case 'email':
                return Yup.string().email('Email is invalid');
            case 'phoneNumber':
                return Yup.string().matches(
                    /^\d{10}$/,
                    'Phone number is not valid'
                );
            case 'password':
                return Yup.string()
                    .min(8, 'Password must be at least 8 characters')
                    .matches(
                        /[a-z]/,
                        'Password must contain at least one lowercase letter'
                    )
                    .matches(
                        /[A-Z]/,
                        'Password must contain at least one uppercase letter'
                    )
                    .matches(/\d/, 'Password must contain at least one number');
            default:
                return Yup.string();
        }
    }, []);

    const validationSchema = useCallback(() => {
        function buildValueSchema() {
            if (regExp) {
                return Yup.string().matches(regExp, `${label} is not valid`);
            }

            let schema = getDefaultValidation(inputType);

            if (required) {
                schema = schema.required(`${label} is required`);
            }

            return schema;
        }
        return Yup.object().shape({
            value: buildValueSchema()
        });
    }, [inputType, label, regExp, required, getDefaultValidation]);

    useEffect(() => {
        const validateInput = async (value: string) => {
            try {
                await validationSchema().validate({ value });
                setError(null);
                onValidationChange(true, null, touched);
            } catch (validationError: any) {
                setError(validationError.message);
                onValidationChange(false, validationError.message, touched);
            }
        };
        if (touched) {
            validateInput(value);
        }
    }, [value, touched, onValidationChange, validationSchema]);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
            setTouched(true);
        },
        []
    );

    const getInputType = useCallback((inputType: string) => {
        switch (inputType) {
            case 'name':
                return 'text';
            case 'email':
                return 'email';
            case 'password':
                return 'password';
            case 'phoneNumber':
                return 'tel';
            default:
                return 'text';
        }
    }, []);

    return (
        <>
            {inputType === 'password' ? (
                <TextField
                    type={showPassword ? 'text' : 'password'}
                    variant={variant}
                    placeholder={placeholder}
                    label={label}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge='end'
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    value={value}
                    required={required}
                    fullWidth
                    onChange={handleChange}
                    error={!!error && touched}
                    helperText={touched && error}
                    {...props}
                />
            ) : (
                <TextField
                    type={getInputType(inputType)}
                    variant={variant}
                    placeholder={placeholder}
                    label={label}
                    required={required}
                    value={value}
                    fullWidth
                    onChange={handleChange}
                    error={!!error && touched}
                    helperText={touched && error}
                    {...props}
                />
            )}
        </>
    );
};

export default BasicInput;
