import React from "react";
import Header from "../components/Header";
import PageLocation from "../components/PageLocation";
import FormForContacts from "../components/FormForContacts";
import Footer from "../components/Footer";
import { ClockCircleFilled, PhoneFilled } from "@ant-design/icons";
import "../components/Components.css";

const Contact = () => {
  return (
    <div>
      <PageLocation page="Contact" />
      <div className="max-w-[644px] text-center m-auto mt-8">
        <h1 className="text-4xl font-bold">Get In Touch With Us</h1>
        <p>
          For More Information About Our Product & Services. Please Feel Free To
          Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
          Hesitate!
        </p>
      </div>

      <div className="flex flex-row">
        <p className="border">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
          ullam voluptas voluptates!
        </p>
        <p className="border">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
          ullam voluptas voluptates!
        </p>
        <p className="border">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
          ullam voluptas voluptates!
        </p>
      </div>

      <div className="flex w-3/4 mt-16 m-auto gap-32 lg:flex-row contactsHeroSection md:flex-row sm:borderTalha">
        <div className="flex flex-col mt-4 gap-5 borderTalha">
          <div className="flex gap-6">
            <PhoneFilled style={{ fontSize: "24px" }} />
            <div>
              <h2 className="text-xl font-bold">Address</h2>
              <p>
                236 5th SE Avenue,
                <br /> New York NY10000, United States
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <PhoneFilled style={{ fontSize: "24px" }} />
            <div>
              <h2 className="text-xl font-bold">Phone</h2>
              <p>
                Mobile: +(84) 546-6789
                <br />
                Hotline: +(84) 456-6789
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <ClockCircleFilled style={{ fontSize: "24px" }} />

            <div>
              <h2 className="text-xl font-bold">Working Time</h2>
              <p>
                Monday-Friday: 9:00 - 22:00
                <br />
                Saturday-Sunday: 9:00 - 21:00
              </p>
            </div>
          </div>
        </div>
        <div className="borderTalha">
          <FormForContacts />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
