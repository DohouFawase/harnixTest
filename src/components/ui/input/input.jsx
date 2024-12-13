import React from 'react'

export default function Input({label, className="", type="", value,onChange , name,placeholder="" }) {
  return (
    <div>
      <div className="flex flex-col">
        <label htmlFor={name} className='mb-2 font-bold text-sm'>{label}</label>
        <input type={type} name={name} id="" value={value} onChange={onChange} placeholder={placeholder} className={`${className}`} />
      </div>
    </div>
  )
}
