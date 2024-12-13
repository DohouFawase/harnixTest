import React from 'react'

export default function Button({type='', children, className=""}) {
  return (
    <div>
      <button type={type} className={`${className}`}>
        {children}
      </button>
    </div>
  )
}
