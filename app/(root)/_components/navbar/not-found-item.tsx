"use client"
import Image from "next/image";
import React from "react";

interface NotFoundItemProps {
  title: React.ReactNode;
}

const NotFoundItem = ({ 
  title
}: NotFoundItemProps) => {

  return (
    <div className='flex md:px-0 px-4 text-center items-center justify-center w-full text-slate-500'>
      <div>
        <Image src="/nav-contents/empty-cart.svg" alt="" height={350} width={350} />
        <p className="hidden last:block font-semibold text-center text-muted-foreground">
          {title}
        </p>
      </div>
    </div>
  );
};

export default NotFoundItem;
