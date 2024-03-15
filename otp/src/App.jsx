import { useState } from "react";
import "./App.css";
import PhoneNumber from "./components/PhoneNumber";
import OtpContainer from "./components/OtpContainer";

function App() {
  const [phone, setPhone] = useState(0);
  const [otpField, setOtpField] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setOtpField(true);
  };

  return (
    <>
      {otpField ? (
        <OtpContainer length={4} />
      ) : (
        <PhoneNumber
          handleFormSubmit={handleFormSubmit}
          phone={phone}
          setPhone={setPhone}
        />
      )}
    </>
  );
}

export default App;
