import React from 'react'

interface NoItemsFoundProps {
  title: string
}

const NoItemsFound: React.FC<NoItemsFoundProps> = ({
  title
}) => {
  return (
    <div className='flex items-center justify-center h-full w-full text-slate-500'>
      {title}
    </div>
  )
}

export default NoItemsFound