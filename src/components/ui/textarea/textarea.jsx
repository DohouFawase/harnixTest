import React from 'react';

export default function Textarea({ label, onChange, name, className = '', ...props }) {
  return (
    <div className='space-y-2 flex flex-col'>
      {label && (
        <label htmlFor={name} className="font-bold  mt-3">
          {label}
        </label>
      )}
      <textarea
        className={` ${className}`}
        name={name}
        id={name}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}
