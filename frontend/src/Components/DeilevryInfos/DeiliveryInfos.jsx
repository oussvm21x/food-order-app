import React from "react";

const DeiliveryInfos = () => {
  return (
    <div className="max-w-lg mx-auto ">
      <h2 className="text-2xl font-bold mb-6">Delivery Information</h2>
      <form className="grid grid-cols-1 gap-2">
        <div className="flex grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:border-indigo-500"
              placeholder="First name"
            />
          </div>

          <div>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:border-indigo-500"
              placeholder="Last name"
            />
          </div>
        </div>

        <div>
          <input
            type="email"
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:border-indigo-500"
            placeholder="Email address"
          />
        </div>

        <div>
          <input
            type="text"
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:border-indigo-500"
            placeholder="Street"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:border-indigo-500"
              placeholder="City"
            />
          </div>

          <div>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:border-indigo-500"
              placeholder="State"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:border-indigo-500"
              placeholder="Zip code"
            />
          </div>

          <div>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:border-indigo-500"
              placeholder="Country"
            />
          </div>
        </div>

        <div>
          <input
            type="tel"
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:border-indigo-500"
            placeholder="Phone"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DeiliveryInfos;
