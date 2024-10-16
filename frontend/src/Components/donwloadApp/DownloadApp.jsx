import React from "react";
import { assets } from "../../frontend_assets/assets";
import { Link } from "react-router-dom";

const DownloadApp = () => {
  return (
    <>
      <div className="flex items-center justify-center flex-col bg-slate-100 py-16 my-4 rounded-lg">
        <h1 className="text-5xl font-semibold mb-3">
          For better experience, Download
        </h1>
        <h1 className="text-5xl font-semibold">
          <span className="text-orange-500">Tomato </span>App
        </h1>
        <div className="flex justify-end items-end text-center mt-5 gap-20 align-bottom">
          <Link to="/play-store" className="w-48">
            <img src={assets.play_store} className="w-full h-full" />
          </Link>
          <Link to="/app-store" className="w-48">
            <img src={assets.app_store} className="w-full h-full" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default DownloadApp;
