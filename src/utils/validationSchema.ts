import * as Yup from 'yup';

export const getLoginSchema = (mode: string) => {
    return Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .when([], {
                is: () => mode === '',
                then: (schema) => schema.required('Email is required'),
                otherwise: (schema) => schema.notRequired(),
            }),
        password: Yup.string()
            .min(8, 'Password must be at least 7 characters')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
            .required('Password is required'),
        confirmPassword: Yup.string().when([], {
            is: () => mode === 'password',
            then: (schema) => schema.required('Confirm Password is required').oneOf([Yup.ref('password')], 'Passwords must match'),
            otherwise: (schema) => schema.notRequired(),
        }),
    });
};
