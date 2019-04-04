import React, {Component} from "react";
import { Table, Page, Button, Grid, Card, Form } from "tabler-react";
import axios from "axios";
import SiteWrapper from "../SiteWrapper.react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

class ListaGPSestatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gpsStatus: [],
      id: "",
      nombre: "",
      estatus: "",
    };
   
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    
  }

  
  openModal(id,nombre,estatus) {
    console.log(nombre);
    this.setState({modalIsOpen: true,id: id,nombre: nombre,estatus: estatus
    });
  }

  afterOpenModal() {
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleChangeId = event =>{
    this.setState({id : event.target.value})
  }

  handleChange = event => {
    this.setState({ nombre: event.target.value });
  };

  handleChangeEstatus = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log("estatus" + value);
    this.setState({ 
      [name]:value 
    });
  }

  componentDidMount() {
    axios.get("http://34.228.130.148:8080/skyone/gpsEstatus/").then(res => {
      const gpsStatus = res.data;
      this.setState({ gpsStatus });
    });
  }
    
  
  handleSubmit = event => {
    event.preventDefault();
    var estadoEstatus = 0;
    if(this.state.estatus === true){
      estadoEstatus = 1;
    }
    console.log(this.state.nombre);
    axios.post("http://34.228.130.148:8080/skyone/gpsEstatus/", {
        nombre: this.state.nombre,
        estatus: estadoEstatus,
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };
 
  handleSubmitEditar = event => {
    event.preventDefault();
    var editaEstatus = 0;
    if(this.state.estatus === false){
      editaEstatus = 0;
    }else{
      editaEstatus = 1;
    }
    axios.put("http://34.228.130.148:8080/skyone/gpsEstatus/", {
        id: this.state.id,
        nombre: this.state.nombre,
        estatus: editaEstatus,
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  handleSubmitDelete = event => {
    event.preventDefault();
    axios.delete("http://34.228.130.148:8080/skyone/gpsEstatus/" + this.state.id) 
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  render() {
    return (
      <SiteWrapper>
        <Page.Card>
          <Table>
            <Table.Header>
              <Table.ColHeader>Id-gps-estatus</Table.ColHeader>
              <Table.ColHeader>Nombre</Table.ColHeader>
              <Table.ColHeader>Estatus</Table.ColHeader>
            </Table.Header>
            <Table.Body>
              {this.state.gpsStatus.map(gps => (
                <Table.Row onClick={this.openModal.bind(this,gps.id,gps.nombre,gps.estatus)}>
                  <Table.Col>{gps.id}</Table.Col>
                  <Table.Col>{gps.nombre}</Table.Col>
                  <Table.Col>{gps.estatus}</Table.Col>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
          >
            <h2 ref={subtitle => (this.subtitle = subtitle)} />
            <Button color="red" aling="right" onClick={this.closeModal}>x</Button>
            <Page.Card title="Tipo de Plataforma">
            
              <Grid.Row>
                <Grid.Col md={12}>
                  <Card>
                    <Card.Body>
                    <Grid.Row>
                        <Grid.Col md={3}>
                          <Form.Input
                            type="text"
                            id="id"
                            name="id"
                            label="ID"
                            disabled
                            onChange={this.handleChangeId}
                            value={this.state.id}
                          />
                        </Grid.Col>
                        
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Col md={12}>
                          <Form.Input
                            type="text"
                            id="nombre"
                            name="nombre"
                            label="Nombre"
                            placeholder="Nombre"
                            onChange={this.handleChange}
                            value={this.state.nombre}
                          />
                        </Grid.Col>
                        <Grid.Col md={12}>
                          <Form.Checkbox
                            id="estatus"
                            name="estatus"
                            label="estatus"
                            checked={this.state.estatus}
                            onChange={this.handleChangeEstatus}
                          />
                        </Grid.Col>
                      </Grid.Row>
                    </Card.Body>
                    <Card.Footer>
                      <Button.List aling="right">
                        <Button color="green" onClick={this.handleSubmit}>Guardar</Button> 
                        <Button color="blue" onClick={this.handleSubmitEditar}>Editar</Button>
                        <Button color="red" id ="eliminar" onClick={this.handleSubmitDelete}>Borrar</Button>
                      </Button.List>
                    </Card.Footer>
                  </Card>
                </Grid.Col>
              </Grid.Row>
            </Page.Card>
          </Modal>
        </Page.Card>
      </SiteWrapper>
    );
  }
}
export default ListaGPSestatus;
