import React, { useState } from "react";

const API_BASE_URL = "http://localhost:5000/numbers"; // Replace with actual backend URL

const NumberFetcher = () => {
  const [numberType, setNumberType] = useState("p");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchNumbers = async () => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/${numberType}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Average Calculator</h2>
      <select
        className="p-2 border rounded"
        value={numberType}
        onChange={(e) => setNumberType(e.target.value)}
      >
        <option value="p">Prime</option>
        <option value="f">Fibonacci</option>
        <option value="e">Even</option>
        <option value="r">Random</option>
      </select>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={fetchNumbers}
      >
        Fetch Numbers
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <p><strong>Previous State:</strong> {JSON.stringify(data.windowPrevState)}</p>
          <p><strong>Current State:</strong> {JSON.stringify(data.windowCurrState)}</p>
          <p><strong>Numbers Fetched:</strong> {JSON.stringify(data.numbers)}</p>
          <p><strong>Average:</strong> {data.avg.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default NumberFetcher;
