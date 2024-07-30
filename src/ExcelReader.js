// src/ExcelReader.js
import React, { useEffect, useState } from 'react';

const ExcelReader = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'bulk_upload_email.xlsx'; // Replace with your Excel file                                                                                                                                                                                                          
      console.log("url", url);

      const response = await fetch(url);
      console.log("response", response);

      const arrayBuffer = await response.arrayBuffer();
      console.log("arraybuffer", arrayBuffer);

      const workbook = window.XLSX.read(arrayBuffer, { type: 'array' });
      console.log("workbook", workbook);

      // Assuming the first sheet contains the data you need
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      console.log("worksheet", worksheet);

      const jsonData = window.XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log("jsondata", jsonData);
      
      setData(jsonData);

    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Nudge showing</h1>
      <table>
        <thead>
          <tr>
            {data[0] && data[0].map((heading, index) => <th key={index}>{heading}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelReader;
