import React, { useState } from "react";

const DeiliveryInfos = ({ onFormChange, formData }) => {
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFormChange({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName?.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName?.trim())
      newErrors.lastName = "Last name is required";
    if (!formData.email?.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.street?.trim())
      newErrors.street = "Street address is required";
    if (!formData.city?.trim()) newErrors.city = "City is required";
    if (!formData.state?.trim()) newErrors.state = "State is required";
    if (!formData.zipCode?.trim()) newErrors.zipCode = "Zip code is required";
    if (!formData.country?.trim()) newErrors.country = "Country is required";
    if (!formData.phone?.trim()) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="max-w-lg mx-auto ">
      <h2 className="text-2xl font-bold mb-6">Delivery Information</h2>
      <form
        className="grid grid-cols-1 gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:border-indigo-500 ${
                errors.firstName ? "border-red-500" : ""
              }`}
              placeholder="First name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:border-indigo-500 ${
                errors.lastName ? "border-red-500" : ""
              }`}
              placeholder="Last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:border-indigo-500 ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="Email address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="street"
            value={formData.street || ""}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:border-indigo-500 ${
              errors.street ? "border-red-500" : ""
            }`}
            placeholder="Street"
          />
          {errors.street && (
            <p className="text-red-500 text-sm mt-1">{errors.street}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              name="city"
              value={formData.city || ""}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:border-indigo-500 ${
                errors.city ? "border-red-500" : ""
              }`}
              placeholder="City"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="state"
              value={formData.state || ""}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:border-indigo-500 ${
                errors.state ? "border-red-500" : ""
              }`}
              placeholder="State"
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode || ""}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:border-indigo-500 ${
                errors.zipCode ? "border-red-500" : ""
              }`}
              placeholder="Zip code"
            />
            {errors.zipCode && (
              <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="country"
              value={formData.country || ""}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:border-indigo-500 ${
                errors.country ? "border-red-500" : ""
              }`}
              placeholder="Country"
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ""}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:border-indigo-500 ${
              errors.phone ? "border-red-500" : ""
            }`}
            placeholder="Phone"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default DeiliveryInfos;
