import React, { useEffect, useMemo, useRef } from "react";
import type { OtpInputProps } from "./OtpInput.type";

const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  length = 6,
  disabled = false,
  error,
}) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const otpArray = useMemo(() => {
    const chars = value.split("");
    return Array.from({ length }, (_, index) => chars[index] || "");
  }, [value, length]);

  const updateOtp = (index: number, digit: string) => {
    const updated = [...otpArray];
    updated[index] = digit;
    onChange(updated.join(""));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const inputValue = e.target.value;
    if (!/^\d?$/.test(inputValue)) {
      return;
    }
    updateOtp(index, inputValue);
    if (inputValue && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    switch (e.key) {
      case "Backspace": {
        if (otpArray[index]) {
          updateOtp(index, "");
          return;
        }
        if (index > 0) {
          inputsRef.current[index - 1]?.focus();
        }
        break;
      }
      case "ArrowLeft": {
        if (index > 0) {
          inputsRef.current[index - 1]?.focus();
        }
        break;
      }
      case "ArrowRight": {
        if (index < length - 1) {
          inputsRef.current[index + 1]?.focus();
        }
        break;
      }
      case "Enter":
        return;
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedValue = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (!pastedValue) {
      return;
    }
    onChange(pastedValue);
    const focusIndex = Math.min(pastedValue.length - 1, length - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  useEffect(() => {
    if (!disabled && value.length === 0) {
      inputsRef.current[0]?.focus();
    }
  }, [disabled]);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {otpArray.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputsRef.current[index] = element;
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            disabled={disabled}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className={` h-14 w-14 border-b text-center text-lg font-semibold outline-none transition-all duration-300
              ${
                error
                  ? "border-red-400 focus:border-red-500"
                  : "border-black/10 focus:border-primary"
              }
              ${
                disabled
                  ? "cursor-not-allowed bg-[#F5F5F5] opacity-60"
                  : "bg-white"
              }
            `}
          />
        ))}
      </div>

      {error && (
        <p className="mt-2 text-xs font-medium text-red-500">{error}</p>
      )}
    </div>
  );
};

export default OtpInput;
