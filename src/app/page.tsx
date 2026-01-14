"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [includeNumber, setIncludeNumber] = useState(false);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [numLength, setNumLength] = useState<string | number>(8);
  const [result, setResult] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);

  const generateRandomString = () => {
    let finalChar = "";
    let chars = "abcdefghijklmnopqrstuvwxyz";

    if (includeNumber) chars += "0123456789";
    if (includeSymbols) chars += "!@£$%^&*()_+=-[]{}:;,.<>/?";
    if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < Number(numLength); i++) {
      const randomIdex = Math.floor(Math.random() * chars.length);
      finalChar += chars[randomIdex];
    }
    setResult(finalChar);
    setShowError(true);
  };

  const calculatePasswordStrength = () => {
    let strength: "Weak" | "Medium" | "Strong" = "Weak";

    if (includeNumber || includeUppercase) {
      if (Number(numLength) <= 8) {
        strength = "Medium";
      }
      if (includeSymbols) {
        strength = "Strong";
      }
    }

    return strength;
  };

  const copyToClipboard = async () => {
    await alert(result);
    await navigator.clipboard.writeText(result);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-3">
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e?.target?.checked)}
          />
          <p className="text-xs">Include Uppercase</p>
        </div>
        <div className="flex flex-row gap-3">
          <input
            type="checkbox"
            checked={includeNumber}
            onChange={(e) => setIncludeNumber(e?.target?.checked)}
          />
          <p className="text-xs">Include Numbers</p>
        </div>
        <div className="flex flex-row gap-3">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e?.target?.checked)}
          />
          <p className="text-xs">Include Symbols</p>
        </div>
      </div>
      <div className="mt-3">
        <input
          type="range"
          min="8"
          max="32"
          value={numLength}
          onChange={(e) => setNumLength(e?.target?.value)}
          step="1"
        />
      </div>
      <div>
        <div className="flex flex-row gap-3">
          <div className="border border-solid border-black/40 flex flex-row items-center justify-center">
            <p className="min-w-40 text-xs p-2">{result}</p>
            <button
              className="bg-gray p-4 text-xs rounded"
              onClick={copyToClipboard}
            >
              copy
            </button>
          </div>
          <button
            className="bg-blue-950 text-white p-2 text-xs rounded"
            onClick={generateRandomString}
          >
            Generate
          </button>
        </div>
        {/* <p>{showError && `Password ${calculatePasswordStrength()}`}</p> */}
      </div>
    </div>
  );
}
