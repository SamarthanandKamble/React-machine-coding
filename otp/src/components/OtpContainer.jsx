import React, { useState, useRef, useEffect } from "react";

const OtpContainer = ({ length, sendOtpToBackend = () => {} }) => {
  const inputRef = useRef([]);
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const handleOnChange = (e, index) => {
    const { value } = e.target;
    if (!Number(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (index < newOtp.length - 1) {
      const isPresent = newOtp.indexOf("");
      if (isPresent) {
        inputRef.current[isPresent].focus();
      } else {
        inputRef.current[index + 1].focus();
      }
    }

    if (index+1 === length) {
      const finalOtp = newOtp.join("");
      console.log("final otp:", finalOtp);
      sendOtpToBackend(finalOtp);
    }
  };

  const handleOnKeyPress = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0 && !newOtp[index] && inputRef.current[index - 1]) {
        inputRef.current[index - 1].focus();
      }
    }
  };

  const handleOnClick = (index) => {
    inputRef.current[index].setSelectionRange(1, 1);

    const isPresent = otp.indexOf("");
    if (isPresent) {
      inputRef.current[isPresent].focus();
    }
  };

  useEffect(() => {
    if (inputRef.current[0]) inputRef.current[0].focus();
  }, []);

  // console.log("inputRef:", inputRef);
  // console.log("otp Array:", otp);

  return (
    <>
      <h1>Enter the otp sent on your number</h1>
      <div>
        {otp.map((value, index) => {
          return (
            <input
              ref={(ref) => (inputRef.current[index] = ref)}
              key={index}
              value={value}
              onChange={(e) => handleOnChange(e, index)}
              onKeyDown={(e) => handleOnKeyPress(e, index)}
              onClick={(e) => handleOnClick(index)}
            />
          );
        })}
      </div>
    </>
  );
};
export default OtpContainer;
