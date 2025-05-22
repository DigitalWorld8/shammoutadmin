import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withGuard = (WrappedComponent: React.ComponentType<any>) => {
    const GuardedComponent = (props: any) => {
        const navigate = useNavigate();

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/auth/boxed-signin'); // Redirect if token is missing
            }
        }, [navigate]);

        const token = localStorage.getItem('token');
        if (!token) return null; // prevent flicker before redirect

        return <WrappedComponent {...props} />;
    };

    return GuardedComponent;
};

export default withGuard;
