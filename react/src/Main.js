import React, { useState } from 'react';

const Main = () => {
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const jsonInput = JSON.parse(inputData);
      const res = await fetch('https://your-backend-url.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonInput),
      });
      const data = await res.json();
      setResponse(data);
      setError('');
    } catch (err) {
      setError('Invalid JSON format or failed to fetch');
      setResponse(null);
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    }
  };

  const filteredResponse = response ? {
    alphabets: selectedOptions.includes('alphabets') ? response.alphabets : [],
    numbers: selectedOptions.includes('numbers') ? response.numbers : [],
    highest_lowercase_alphabet: selectedOptions.includes('highest_lowercase_alphabet') ? response.highest_lowercase_alphabet : [],
  } : {};

  return (
    <div>
      <h1>BFHL Frontend</h1>
      <textarea
        rows="4"
        cols="50"
        value={inputData}
        onChange={handleInputChange}
        placeholder='Enter JSON input here'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <h3>Response:</h3>
          <label>
            <input
              type="checkbox"
              value="alphabets"
              onChange={handleOptionChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="numbers"
              onChange={handleOptionChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="highest_lowercase_alphabet"
              onChange={handleOptionChange}
            />
            Highest Lowercase Alphabet
          </label>
          <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Main;