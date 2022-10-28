import { Fragment, PropsWithChildren } from "react";
import DashBoardNav from "./DashBoardNav";

const DashboardContainer: React.FC<PropsWithChildren> = (props) => {
  return (
    <Fragment>
      <div className="w-full h-full border-2 flex justify-center p-8 items-start overflow-auto">
        {props.children}
      </div>
    </Fragment>
  );
};

export default DashboardContainer;
