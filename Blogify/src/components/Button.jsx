import React from 'react'

function Button({
    childern,
    type='button',
    bgColor='bg-blue-600',
    textColor='text-white',
    className='',
    ...props
}){
  return (
    <Button className={`px-4 py-2 rounded-lg ${className} ${textColor}${bgColor}`}{...props}>
        {childern}      
    </Button>
  )
}

export default Button
