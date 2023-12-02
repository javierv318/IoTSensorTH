import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Container } from "reactstrap";
import { useAuth } from "../auth/AuthProvider";


var newData = new Array();
function data() {
  fetch("http://20.84.65.85:3000/datos/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    newData=data.reverse();
  })
}
data();

export default function App() {
  const auth = useAuth();
  const [node, setNode] = useState(auth.user.nodo);
  const [data, setData] = useState(newData);

  useEffect(() => {
    actualizar();
  }, [node]);

  const actualizar = async () => {
    try {
      const response = await fetch(`http://20.84.65.85:3000/datos/${node}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const fetchedData = await response.json();
      setData(fetchedData.reverse());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const timestamp_to_iso_date = (timestamp: number) => {
    if (!timestamp || isNaN(timestamp)) {
      return "Invalid Timestamp";
    }
  
    const date = new Date(0);
    date.setUTCSeconds(timestamp);
  
    const dayComplete = date.toISOString().substring(0, 19);
  
    return dayComplete;
  }

  return (
    <>
      <Container>
        <br />
        <Button color="success" onClick={() => actualizar()}>
          Actualizar
        </Button>
        <br />
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Fecha y hora</th>
              <th>Nodo</th>
              <th>Temperatura</th>
              <th>Humedad</th>
              <th>Sensación termica</th>
              <th>¿Criadero?</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dato) => (
              <tr key={dato.id}>
                <td>{dato.id}</td>
                <td>{timestamp_to_iso_date(dato.timestamp)}</td>
                <td>{dato.sensorId}</td>
                <td>{dato.temperature}</td>
                <td>{dato.humidity}</td>
                <td>{dato.thermalSensation}</td>
                <td>{dato.criadero}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <br />
      </Container>
    </>
  );
}