import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Container } from "reactstrap";


var newData = new Array();
function data() {
  fetch("http://localhost:3000/datos/", {
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
    newData=data;
  })
}
data();

export default function App() {
  const [data, setData] = useState(newData);

  const actualizar = () => {
    fetch("http://localhost:3000/datos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const timestamp_to_iso_date = (timestamp: any) => {
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
            {data.reverse().map((dato) => (
              <tr key={dato.id}>
                <td>{dato.id}</td>
                <td>{timestamp_to_iso_date(dato.fechahora)}</td>
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