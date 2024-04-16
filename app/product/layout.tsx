import React from 'react'
import { Navbar } from '@/app/(root)/_components/navbar'

const Rootlayout = ({
  children
}:{
  children: React.ReactNode
}) => {
  return (
    <div>
       <Navbar />
      <main className='mt-6'>
        {children}
      </main>
    </div>
  )
}

export default Rootlayout