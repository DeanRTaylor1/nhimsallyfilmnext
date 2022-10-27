import { Fragment, PropsWithChildren } from "react";
import DashBoardNav from "./DashBoardNav";

const AdminDashboardLayout: React.FC<PropsWithChildren> = (props) => {
  return (
    <Fragment>
      <div className="grid h-screen w-screen grid-cols-dashboard grid-rows-1 md:justify-items-center">
        <DashBoardNav />
        {props.children}
      </div>
    </Fragment>
  );
};

export default AdminDashboardLayout;
