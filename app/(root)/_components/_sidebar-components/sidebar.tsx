import Image from "next/image";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="h-full">
      <div className="h-full border-r flex flex-col bg-white overflow-y-auto shadow-sm">
        <div className="p-6 flex items-center">
          <Image src="/logo.png" width={30} height={30} alt="" />
          <p className="px-2 text-blue-600 text-xl font-semibold">Renux</p>
        </div>
        <div className="flex flex-col w-full">
          <SidebarRoutes />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
