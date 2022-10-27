import { Fragment, PropsWithChildren } from "react";

const AdminLayout: React.FC<PropsWithChildren> = (props) => {
  return (
    <Fragment>
      <div className="grid overflow-hidden h-screen w-screen grid-cols-1 grid-rows-layout md:justify-items-center">
        {props.children}
      </div>
    </Fragment>
  );
};

export default AdminLayout;
