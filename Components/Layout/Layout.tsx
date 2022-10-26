import { Fragment, PropsWithChildren } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: React.FC<PropsWithChildren> = (props) => {
  return (
    <Fragment>
      <div className="grid overflow-hidden h-screen w-screen grid-cols-1 grid-rows-layout md:justify-items-center">
        <Navbar />
        {props.children}
        <Footer />
      </div>
    </Fragment>
  );
};

export default Layout;
