import '../routes/Dashboard.css'
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

var newData = new Array();
function data() {
  fetch("http://20.42.107.153:3000/parqueadero/camara", {
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

var vehiculo = new Array();

  class App extends React.Component {
    state = {
      modalInsertar: false,
      data:newData,
      form: {
        id: "",
        fechahora: "",
        placa: ""
      },
      dataVehiculo:vehiculo,
      formVehiculos:{
        nombre_titular:"",
        apellido_titular:"",
        color_vehiculo:"",
        marcha_vehiculo:"",
        placa_vechiulo:""
      }
    };

    actualizar() {
      fetch("http://20.42.107.153:3000/camara", {
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

    agregarVehiculo = (datos:any) => {
      var enviar = JSON.stringify(datos);
      console.log(enviar);
      return fetch('http://20.42.107.153:3000/parqueadero/camara/2', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: enviar
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('HTTP error! Status: ${response.status}');
          }
          console.log(response.status);
          var exito = window.alert("Vehiculo insertado con éxito");
          exito;
        })
        .catch((error) => {
          throw error;
        })
    }

    modalInsertar = () => {
      this.setState({
        modalInsertar: true,
        formVehiculos:{
          ...this.state.formVehiculos
        }
      });
    }

    cerrarModalInsertar = () => {
      this.setState({modalInsertar:false})
    }

    verificar(dato:any) {
      var ulr = "http://20.42.107.153:3000/parqueadero/camara/"+dato.placa;
      fetch(ulr, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then((response) => {
          if(response.status == 200){
            var ver = window.alert("Verificado con éxito");
            ver;
          }
          else{
            var ver = window.alert("No se ha podido verificar");
            ver;
          }
        })
        .catch((error) => {
          throw error;
        });
    }
    
    handleChange = (e: { target: { name: any; value: any; }; }) => {
      this.setState({
        form: {
          ...this.state.form,
          [e.target.name]: e.target.value,
        },
      });
    };

    handleChangeVehiculo = (e: { target: { name: any; value: any; }; }) => {
      this.setState({
        formVehiculos: {
          ...this.state.formVehiculos,
          [e.target.name]: e.target.value,
        },
      });
    };

    timestamp_to_iso_date(timestamp: any) {

      var date = new Date(0);

      date.setUTCSeconds(timestamp);

      var dayComplete = (date.toISOString())
      dayComplete = dayComplete.substring(0, 19);

      return dayComplete;
    };

    render() {
      
      return (
        <>
          <Container>
            <br />
            <Button color="primary" onClick={()=>this.actualizar()}>Actualizar</Button>     <Button color="success" onClick={()=>this.modalInsertar()}>Agregar Vehiculo</Button>
            <br />
            <Table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Fecha y Hora</th>
                  <th>Placa</th>
                  <th>¿Verificado?</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.reverse().map((dato) => (
                  <tr key={dato.id}>
                    <td>{dato.id}</td>
                    <td>{this.timestamp_to_iso_date(dato.fechahora)}</td>
                    <td>{dato.placa}</td>
                    <td><Button color="info" onClick={() => {this.verificar(dato);}}>Verificar</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>

          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader>
              <div><h3>Agregar vehiculo</h3></div>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <label>Nombre:</label>
                <input
                  className="form-control"
                  name="nombre_titular"
                  type="text"
                  onChange={this.handleChangeVehiculo}
                />
              </FormGroup>
              <FormGroup>
                <label>Apellido:</label>
                <input
                  className="form-control"
                  name="apellido_titular"
                  type="text"
                  onChange={this.handleChangeVehiculo}
                />
              </FormGroup>
              <FormGroup>
                <label>Marca</label>
                <input
                  className="form-control"
                  name="marcha_vehiculo"
                  type="text"
                  onChange={this.handleChangeVehiculo}
                />
              </FormGroup>
              <FormGroup>
                <label>Color</label>
                <input
                  className="form-control"
                  name="color_vehiculo"
                  type="text"
                  onChange={this.handleChangeVehiculo}
                />
              </FormGroup>
              <FormGroup>
                <label>Placa</label>
                <input
                  className="form-control"
                  name="placa_vechiulo"
                  type="text"
                  onChange={this.handleChangeVehiculo}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                color='primary'
                onClick={() => {this.agregarVehiculo(this.state.formVehiculos);this.setState({modalInsertar:false})}}
              >Insertar</Button>
              <Button
                className='danger'
                onClick={() => {this.setState({modalInsertar:false})}}
              >Cancel</Button>
            </ModalFooter>
          </Modal>
        </>
      );
    }
  }
  export default App;
  