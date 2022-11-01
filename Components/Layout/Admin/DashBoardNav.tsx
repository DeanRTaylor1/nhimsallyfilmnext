import { Fragment, PropsWithChildren } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { BsImage } from "react-icons/bs";
import { AiOutlineLineChart } from "react-icons/ai";
import { IconContext } from "react-icons";
import { TbLogout } from "react-icons/tb";

const DashBoardNav: React.FC = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    await signOut();
    router.replace("/");
  };
  return (
    <Fragment>
      <div className=" hidden w-56 h-full  shadow-xl bg-white md:flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <div className="md:block text-left md:pb-2  md:px-2 mr-0 inline-block whitespace-nowrap text-2xl uppercase font-bold p-4 px-0">
            NhimSallyFilm
          </div>
          <div className="  md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-2 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-start flex-1 rounded hidden">
            <hr className="my-4 md:min-w-full" />
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="dashboardNavListItem">
                <IconContext.Provider
                  value={{
                    color: "rgb(24 24 27)",
                    size: "2rem",
                    className: "global-class-name 0",
                  }}
                >
                  <AiOutlineLineChart />
                </IconContext.Provider>
                <Link className="dashboardNavItem" href="/admin/dashboard">
                  Insights
                </Link>
              </li>
              <li className="dashboardNavListItem px-3">
                <IconContext.Provider
                  value={{
                    color: "rgb(24 24 27)",
                    size: "1.75rem",
                    className: "global-class-name 0",
                  }}
                >
                  <BsImage />
                </IconContext.Provider>
                <Link
                  className="dashboardNavItem "
                  href="/admin/dashboard/albums"
                >
                  Albums
                </Link>
              </li>
            </ul>
            <hr className="my-4 md:min-w-full" />
            <div className="dashboardNavListItem">
              <IconContext.Provider
                value={{
                  color: "rgb(24 24 27)",
                  size: "1.75rem",
                  className: "global-class-name 0",
                }}
              >
                <TbLogout />{" "}
              </IconContext.Provider>

              <div className="dashboardNavItem" onClick={logoutHandler}>
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DashBoardNav;
