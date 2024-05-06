import { useEffect, useState } from 'react';

function ExcelData() {

    const demoData = [
        ['John Doe', 'Software Engineer', 'johndoe@example.com', '555-1234'],
        ['Jane Smith', 'Project Manager', 'janesmith@example.com', '555-5678'],
        ['Bob Johnson', 'UI/UX Designer', 'bobjohnson@example.com', '555-9012'],
        ['Alice Williams', 'Data Analyst', 'alicewilliams@example.com', '555-3456'],
        ['Tom Davis', 'DevOps Engineer', 'tomdavis@example.com', '555-7890'],
        // Add more rows as needed
      ];
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assign the demo data to the state
        setData(demoData);
      } catch (error) {
        console.error('Error fetching Excel data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Excel Data</h2>
      <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            <th>Column 4</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
              <td>{row[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExcelData;