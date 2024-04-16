import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import Link from "next/link";
import { Cart } from "./cart";
import UserProfileButton from "./user-profile-button";

const Actions = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  const routes = [
    {
      label: "Sign In",
      href: "/sign-in",
    },
    {
      label: "Create account",
      href: "/sign-up",
    },
  ];

  return (
    <div className="flex items-center justify-end lg:gap-x-2 ml-4 lg:ml-0">
      <p>{/* TODO: Letter add search functionality */}</p>
      <div className="flex items-center gap-x-4">
        {user ? (
          <>
            <UserProfileButton user={user} />
          </>
        ) : (
          <>
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="text-slate-500 lg:flex hidden hover:text-black"
              >
                {route.label}
              </Link>
            ))}
          </>
        )}
      </div>
      <div className="gap-x-4 lg:mr-0 mr-3">
        <Cart />
      </div>
    </div>
  );
};

export default Actions;
