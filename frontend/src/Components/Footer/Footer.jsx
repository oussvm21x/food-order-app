import React from "react";
import { assets } from "../../frontend_assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 text-white text-center p-5 rounded-lg">
        <div className="flex justify-between items-start text-left gap-5">
          <div className="flex justify-start items-start flex-col gap-5 text-left w-2/4 p-5">
            <div className="">
              <img src={assets.logo} alt="logo" />
            </div>

            <p>
              Welcome to our food order app, where you can explore a variety of
              delicious meals and place your orders with ease. Enjoy a seamless
              and delightful food ordering experience with us!
            </p>
            <div className="flex justify-center space-x-5">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12"
              >
                <img
                  src={assets.facebook_icon}
                  alt="Facebook"
                  className="w-full h-full"
                />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12"
              >
                <img
                  src={assets.twitter_icon}
                  alt="Twitter"
                  className="w-full h-full"
                />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12"
              >
                <img
                  src={assets.linkedin_icon}
                  alt="LinkedIn"
                  className="w-full h-full"
                />
              </Link>
            </div>
          </div>

          <div className="w-1/4 p-5">
            <h2 className="text-lg font-semibold mb-3">Company</h2>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-gray-400">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-gray-400">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-400">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-gray-400">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="w-1/4 p-5 flex justify-between flex-col gap-5">
            <h2 className="text-lg font-semibold mb-3">Contact</h2>
            <p className="text-sm">1234 Street Name, City, Country</p>
            <p className="text-sm">Email: info@company.com</p>
            <p className="text-sm">Phone: +123 456 7890</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
