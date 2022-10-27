import { Fragment, PropsWithChildren } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
const DashBoardNav: React.FC = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    await signOut();
    router.replace("/");
  };
  return (
    <Fragment>
      <div className=" w-56 h-full  shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <div className="md:block text-left md:pb-2  mr-0 inline-block whitespace-nowrap text-2xl uppercase font-bold p-4 px-0">
            NhimSallyFilm
          </div>
          <div className="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-2 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded hidden">
            <hr className="my-4 md:min-w-full" />
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className="text-lg uppercase py-3 font-bold block "
                  href="/admin/dashboard/test"
                >
                  Test
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className="text-lg uppercase py-3 font-bold block "
                  href="/admin/dashboard/test"
                >
                  Test
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className="text-lg uppercase py-3 font-bold block "
                  href="/admin/dashboard/test"
                >
                  Test
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className="text-lg uppercase py-3 font-bold block "
                  href="/admin/dashboard/test"
                >
                  Test
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className="text-lg uppercase py-3 font-bold block "
                  href="/admin/dashboard/test"
                >
                  Test
                </Link>
              </li>
            </ul>
            <hr className="my-4 md:min-w-full" />

            <div onClick={logoutHandler}>Logout</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DashBoardNav;
