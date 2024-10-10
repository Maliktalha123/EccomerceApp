import React from "react";
import Logo from "../assets/company.png";
import backgroundImage1 from "../assets/Rectangle1.png";

const PageLocation = (props) => {
  return (
    <div
      className="h-[316px] flex items-center content-center "
      style={{ backgroundImage: `url(${backgroundImage1})` }}
    >
      <div className="m-auto mt-16">
        <img src={Logo} />
        <h1 className="text-4xl font-bold">{props.page}</h1>
        <h3 className="m-auto text-1xl">
          <span className="font-bold">Home &gt; </span>
          {props.page}
        </h3>
      </div>
    </div>
  );
};

export default PageLocation;
