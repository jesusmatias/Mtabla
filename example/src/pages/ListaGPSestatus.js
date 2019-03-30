import React, { Component } from "react";
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
  constructor() {
    super();
    this.state = {
      gpsStatus: [],
      nombre: "",
      estatus: "",
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/users").then(res => {
      const gpsStatus = res.data;
      this.setState({ gpsStatus });
    });
  }

  handleChange = event => {
    this.setState({ nombre: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("https://jsonplaceholder.typicode.com/users", {
        nombre: this.state.nombre,
      })
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
                <Table.Row onClick={this.openModal}>
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
            contentLabel="ejemplo Modal"
          >
            <h2 ref={subtitle => (this.subtitle = subtitle)} />
            <Button color="red" aling="right" onClick={this.closeModal}>
              x
            </Button>
            <Page.Card title="Tipo de Plataforma">
              <Grid.Row>
                <Grid.Col md={12}>
                  <Card>
                    <Card.Body>
                      <Grid.Row>
                        <Grid.Col md={12}>
                          <Form.Input
                            type="text"
                            id="nombre"
                            name="nombre"
                            label="Nombre"
                            placeholder="Nombre"
                          />
                        </Grid.Col>
                        <Grid.Col md={12}>
                          <Form.Checkbox
                            label="Option 1"
                            name="example-radios"
                            value="option1"
                          />
                        </Grid.Col>
                      </Grid.Row>
                    </Card.Body>
                    <Card.Footer>
                      <Button.List aling="right">
                        <Button color="green" onClick={this.handleSubmit}>
                          Guardar
                        </Button>
                        <Button color="red">BorrarAhora</Button>
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
