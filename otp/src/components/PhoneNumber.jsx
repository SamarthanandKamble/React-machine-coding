import React, { useState } from "react";

const PhoneNumber = ({ handleFormSubmit, phone, setPhone }) => {
  return (
    <>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <h1>Enter your Phone Number</h1>
        <input
          type="number"
          placeholder="Enter you number here"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="phone-number"
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default PhoneNumber;
