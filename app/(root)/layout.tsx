import React from "react";
import { Navbar } from "./_components/navbar";

const Rootlayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Rootlayout;
