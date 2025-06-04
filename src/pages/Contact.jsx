import Header from "../components/Header";
import PageLocation from "../components/PageLocation";
import FormForContacts from "../components/FormForContacts";
import Footer from "../components/Footer";
import { ClockCircleFilled, PhoneFilled } from "@ant-design/icons";
import "../components/Components.css";
import React from "react";
import { Button, Form, Input, InputNumber } from "antd";

const Contact = () => {
  return (
    <div className="flex flex-col lg:flex-row w-3/4 mt-16 m-auto gap-8">
      <div className="flex flex-col mt-4 gap-5  w-full lg:w-1/2">
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

      <div className="w-full lg:w-1/2">
        <FormForContacts />
      </div>
    </div>
  );
};

export default Contact;
