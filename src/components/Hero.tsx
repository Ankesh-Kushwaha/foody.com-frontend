import React from 'react'
import hero from '../assets/hero.png'

export const Hero = () => {
  return (
    <div>
      <img src={hero} alt="hero image" className='w-full max-h-[600px] object-cover' />
    </div>
  )
}
