import React from 'react';

const Input = ({id, label, onChange, value, type, onBlur, placeholder, error, required, maxLength}) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input 
                id={id} 
                name={id} 
                onChange={onChange} 
                placeholder={placeholder} 
                onBlur={onBlur} 
                type={type} 
                value={value}
                maxLength={maxLength}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                    error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                } focus:ring-2 focus:outline-none transition-all duration-200`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default Input;