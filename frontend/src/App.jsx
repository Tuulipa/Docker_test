import { useEffect, useState } from 'react';
import './App.css';
const apiUrl = `/api/locations`;

function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try{
        const result = await fetch(apiUrl);
        const data = await result.json();
        const arr = data.map((location, index) => {
          return <li key={index}>Latitude: {location.latitude}, Longitude: {location.longitude}</li>
        });
        setLocations(arr);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [])
  return (
  <>
  <ul>
    {locations}
  </ul>
  </>)
}

export default App
