import React from "react";
import Header from "../components/Header";
import PageLocation from "../components/PageLocation";

const About = () => {
  return (
    <div>
      <PageLocation page="About" />
      <div className="w-full px-4 lg:px-16 py-10 bg-gray-50">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              About Our Furniture Store
            </h1>
            <p className="text-gray-600 text-lg leading-7">
              Welcome to{" "}
              <span className="font-semibold text-brown-600">FurniMart</span>,
              your one-stop destination for premium furniture. Our mission is to
              bring comfort, style, and functionality to your home with expertly
              designed furniture that stands the test of time.
            </p>
            <p className="text-gray-600 text-lg leading-7 mt-4">
              Whether you're looking for modern, traditional, or custom pieces,
              we ensure every product meets the highest standards of quality and
              craftsmanship.
            </p>
          </div>
          <div className="lg:w-1/2">
            <img
              src="https://via.placeholder.com/600x400" // Replace with your furniture store image
              alt="Furniture showcase"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>

        {/* Highlights Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Highlight 1 */}
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl text-brown-600 mb-4">🛋️</div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Our furniture is crafted with the finest materials to ensure
                durability and elegance.
              </p>
            </div>
            {/* Highlight 2 */}
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl text-brown-600 mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">
                We prioritize sustainable practices and use eco-friendly
                materials whenever possible.
              </p>
            </div>
            {/* Highlight 3 */}
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl text-brown-600 mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Enjoy quick and hassle-free delivery to your doorstep with every
                purchase.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 text-lg leading-7 text-center">
            At <span className="font-semibold text-brown-600">FurniMart</span>,
            we aim to redefine how you experience furniture. Our goal is to
            provide furniture that not only beautifies your space but also
            enhances your lifestyle. With a passion for design and a commitment
            to excellence, we strive to make every piece a masterpiece.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
