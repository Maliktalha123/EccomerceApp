import React from "react";
import Header from "../components/Header";
import PageLocation from "../components/PageLocation";

const Contact = () => {
  return (
    <div>
      <PageLocation page="Contact" />
      <div className="w-[644px] text-center m-auto">
        <h1 className="text-4xl font-bold">Get In Touch With Us</h1>
        <p>
          For More Information About Our Product & Services. Please Feel Free To
          Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
          Hesitate!
        </p>
      </div>




      <div className="flex w-3/4 borderTalha m-auto">
        <div className="borderTalha">
          <div>
            <h2 className="text-2xl font-bold">Address</h2>
            <p>236 5th SE Avenue, New York NY10000, United States</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Phone</h2>
            <p>
              Mobile: +(84) 546-6789
              <br />
              Hotline: +(84) 456-6789
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Working Time</h2>
            <p>
              Monday-Friday: 9:00 - 22:00
              <br />
              Saturday-Sunday: 9:00 - 21:0
            </p>
          </div>
        </div>
        <div className="borderTalha"></div>
      </div>
    </div>
  );
};

export default Contact;
