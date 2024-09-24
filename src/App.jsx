import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Table, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, ModalTitle } from 'react-bootstrap';

const data = [
  {id: 1, nombre: "Genesis Roman", edad: "25", correo: "ejemplogenesis@gmail.com"},
  {id: 2, nombre: "Edwin Leal", edad: "26", correo: "ejemploedwin@gmail.com"},
  {id: 3, nombre: "Anghel Zambrano", edad: "26", correo: "ejemploanghel@gmail.com"},
  {id: 4, nombre: "German Balcazar", edad: "20", correo: "ejemplocapi@gmail.com"},
  {id: 5, nombre: "Jesus Canelon", edad: "24", correo: "ejemplocanela@gmail.com"},
];

class App extends React.Component {
  state = {
    data: data,
    filteredData: data,
    modalActualizar: false,
    modalInsertar: false,
    modalConfirmarEliminar: false,
    itemToDelete: null,
    form: {
      id: "",
      nombre: "",
      edad: "",
      correo: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    const arreglo = this.state.data.map((registro) =>
      registro.id === dato.id ? { ...dato } : registro
    );
    this.setState({ data: arreglo, filteredData: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    const filteredData = this.state.data.filter((item) => item.id !== dato.id);
    this.setState({ data: filteredData, filteredData, modalConfirmarEliminar: false, itemToDelete: null });
  };

  insertar = () => {
    const valorNuevo = { ...this.state.form, id: this.state.data.length + 1 };
    const lista = [...this.state.data, valorNuevo];
    this.setState({ modalInsertar: false, data: lista, filteredData: lista });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredData = this.state.data.filter(
      (item) =>
        item.nombre.toLowerCase().includes(query) ||
        item.correo.toLowerCase().includes(query)
    );
    this.setState({ filteredData });
  };

  handleDeleteConfirmation = (dato) => {
    this.setState({
      modalConfirmarEliminar: true,
      itemToDelete: dato
    });
  };

  cerrarModalConfirmarEliminar = () => {
    this.setState({ modalConfirmarEliminar: false, itemToDelete: null });
  };

  confirmarEliminar = () => {
    this.eliminar(this.state.itemToDelete);
  };

  truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  render() {
    return (
      <>
        <Container>
          <br />
          <Button color="success" onClick={this.mostrarModalInsertar}>Crear nuevo usuario</Button>
          <br />
          <br />
          <FormGroup>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre o correo"
              onChange={this.handleSearch}
            />
          </FormGroup>
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Correo</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {this.state.filteredData.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{this.truncateText(dato.nombre, 10)}</td>
                  <td>{dato.edad}</td>
                  <td>{dato.correo}</td>
                  <td>
                    <Button color="primary" onClick={() => this.mostrarModalActualizar(dato)}>Editar</Button>
                    {" "}
                    <Button color="danger" onClick={() => this.handleDeleteConfirmation(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal show={this.state.modalActualizar} onHide={this.cerrarModalActualizar}>
          <ModalHeader closeButton>
            <ModalTitle>Editor de Registro</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>ID:</label>
              <input className="form-control" readOnly type="text" value={this.state.form.id} />
            </FormGroup>
            <FormGroup>
              <label>Nombre:</label>
              <input className="form-control" name="nombre" type="text" onChange={this.handleChange} value={this.state.form.nombre} />
            </FormGroup>
            <FormGroup>
              <label>Edad:</label>
              <input className="form-control" name="edad" type="text" onChange={this.handleChange} value={this.state.form.edad} />
            </FormGroup>
            <FormGroup>
              <label>Correo:</label>
              <input className="form-control" name="correo" type="text" onChange={this.handleChange} value={this.state.form.correo} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.editar(this.state.form)}>Editar</Button>
            <Button color="danger" onClick={this.cerrarModalActualizar}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal show={this.state.modalInsertar} onHide={this.cerrarModalInsertar}>
          <ModalHeader closeButton>
            <ModalTitle>Agregar Usuario</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>ID:</label>
              <input className="form-control" readOnly type="text" value={this.state.data.length + 1} />
            </FormGroup>
            <FormGroup>
              <label>Nombre:</label>
              <input className="form-control" name="nombre" type="text" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Edad:</label>
              <input className="form-control" name="edad" type="text" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Correo:</label>
              <input className="form-control" name="correo" type="text" onChange={this.handleChange} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.insertar}>Insertar</Button>
            <Button color="danger" onClick={this.cerrarModalInsertar}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal show={this.state.modalConfirmarEliminar} onHide={this.cerrarModalConfirmarEliminar}>
          <ModalHeader closeButton>
            <ModalTitle>Confirmación de Eliminación</ModalTitle>
          </ModalHeader>
          <ModalBody>
            ¿Estás seguro de que deseas eliminar el usuario con ID {this.state.itemToDelete?.id}?
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={this.cerrarModalConfirmarEliminar}>Cancelar</Button>
            <Button variant="danger" onClick={this.confirmarEliminar}>Eliminar</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;