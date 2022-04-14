import React from "react";
import { rootNavArr } from "../utils/rootNavArr";
import { Link } from "gatsby";
import Icon, { Search } from "./Icon";

const MobileNav = ({ additionalLinks }) => {
  return (
    <div className="bg-dvrpcBlue text-white border-t xnav">
      <div className="xnav-wrapper">
        <form
          className="relative md:w-min md:pr-32 px-4 py-4"
          action="https://www.dvrpc.org/Search/"
        >
          <div>
            <div className="w-16 pt-1 h-1/2 flex absolute items-center justify-center pointer-events-none">
              <Icon
                use={Search}
                className="h-6 inline-block flex-shrink-0 select-none text-gray-600 z-10"
              />
            </div>
            <input
              name="q"
              placeholder="Search..."
              aria-label="Search"
              className="border-0 border-none m-0 p-2 pl-16 focus:outline-none placeholder-gray-600 opacity-90"
            />
          </div>
        </form>
        {rootNavArr.map((item, index) => {
          return (
            <div key={index} className="pl-4 py-4 flex-auto text-3xl">
              <Link
                className="no-underline hover:underline my-12"
                to={item.href}
                dangerouslySetInnerHTML={{ __html: item.link }}
              />
            </div>
          );
        })}
        {rootNavArr.map((item, index) => {
          return (
            <div key={index} className="pl-4 py-4 flex-auto text-3xl">
              <Link
                className="no-underline hover:underline my-12"
                to={item.href}
                dangerouslySetInnerHTML={{ __html: item.link }}
              />
            </div>
          );
        })}
      </div>
    </div>

    // <div class="xnav">
    //   <div class="xnav-wrapper">
    //     <ul class="sf-menu">
    //       <li>
    //         <a href="#">Home</a>
    //       </li>
    //       <li>
    //         <a href="#">Cupcakes</a>
    //         <ul>
    //           <li>
    //             <a href="#">1.1 Cupcakes</a>
    //           </li>
    //           <li>
    //             <a href="#">1.2 Cupcakes</a>
    //           </li>
    //           <li>
    //             <a href="#">1.3 Cupcakes</a>
    //             <ul>
    //               <li>
    //                 <a href="#">2.1 Cupcakes</a>
    //               </li>
    //               <li>
    //                 <a href="#">2.2 Cupcakes</a>
    //               </li>
    //               <li>
    //                 <a href="#">2.3 Cupcakes</a>
    //               </li>
    //             </ul>
    //           </li>
    //         </ul>
    //       </li>
    //       <li>
    //         <a href="#">Doughnuts</a>
    //       </li>
    //       <li>
    //         <a href="#">Icecream</a>
    //       </li>
    //       <li>
    //         <a href="#">Banana Split</a>{" "}
    //       </li>
    //       <li>
    //         <a href="#">Brownies</a>
    //       </li>
    //       <li>
    //         <a href="#">Lollipop</a>
    //       </li>
    //       <li>
    //         <a href="#">Pixie Stix</a>
    //       </li>
    //       <li>
    //         <a href="#">Bubble Gum</a>
    //       </li>
    //       <li>
    //         <a href="#">Chocolate Chips</a>
    //       </li>
    //       <li>
    //         <a href="#">Cherries</a>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
  );
};
export default MobileNav;
