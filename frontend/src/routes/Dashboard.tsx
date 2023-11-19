import '../routes/Dashboard.css'
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
} from "reactstrap";
import { useAuth } from "../auth/AuthProvider";

const auth = useAuth();

var newData = new Array();
function data() {
  fetch("http://localhost:3000/datos/"+auth.user.nodo, {
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

  class App extends React.Component {
    state = {
      data:newData,
      modalInsertar: false,
      form: {
        id: "",
        timestamp:"",
        sensorId: "",
        temperature: "",
        humidity: "",
        thermalSensation: "",
        criadero: ""
      }
    };
    
    actualizar() {
      fetch("http://localhost:3000/datos", {
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
          this.setState({
            data: data,
          });
        })
        .catch((error) => {
          throw error;
        });
    }
    
    timestamp_to_iso_date(timestamp: any) {

      var date = new Date(0);

      date.setUTCSeconds(timestamp);

      var dayComplete = (date.toISOString())
      dayComplete = dayComplete.substring(0, 19);

      return dayComplete;
    };

    handleChange = (e: { target: { name: any; value: any; }; }) => {
      this.setState({
        form: {
          ...this.state.form,
          [e.target.name]: e.target.value,
        },
      });
    };

    render() {
      
      return (
        <>
          <Container>
            <br />
            <Button color="success" onClick={()=>this.actualizar()}>Actualizar</Button>
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
                {this.state.data.reverse().map((dato) => (
                  <tr key={dato.id}>
                    <td>{dato.id}</td>
                    <td>{this.timestamp_to_iso_date(dato.fechahora)}</td>
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
  }
  export default App;