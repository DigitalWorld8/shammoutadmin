import React from 'react';

// Define an interface for the props
interface LoaderProps {
    width?: number;  // Optional width in pixels
    height?: number; // Optional height in pixels
}

const Loader: React.FC<LoaderProps> = ({ width = 7, height = 7 }) => {
    return (
        <span
            className="animate-spin border-8 border-[#f1f2f3] border-l-primary rounded-full inline-block align-middle m-auto mb-10"
            style={{
                width: `${width}px`,
                height: `${height}px`,
            }}
        ></span>
    );
};

export default Loader;
