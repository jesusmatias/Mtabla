import React from "react";
import { Table, Page, Button, Form, Card, Grid } from "tabler-react";
import axios from "axios";
import SiteWrapper from "../SiteWrapper.react";
import Modal from "react-modal";
import UserName from "./UsersSearch";
import UsersSearch from "./UsersSearch";

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

class ListaUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      id: "",
      name: "",
      username: "",
      email: "",
      filter: {
        name: "",
        username: "",
        email: "",
        search: "",
      },
    };

    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleOnSearch = this.handleOnSearch.bind(this);
    this.handleOnFilter = this.handleOnFilter.bind(this);
  }

  openModal(id, name, username, email) {
    console.log(name);
    this.setState({
      modalIsOpen: true,
      id: id,
      name: name,
      username: username,
      email: email,
    });
  }

  afterOpenModal() {
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleChangeId = event => {
    this.setState({ id: event.target.value });
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleChangeUsername = event => {
    this.setState({ username: event.target.value });
  };

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/users/").then(res => {
      const users = res.data;
      this.setState({ users });
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    var estadoEstatus = 0;
    if (this.state.estatus === true) {
      estadoEstatus = 1;
    }
    console.log(this.state.nombre);
    axios
      .post("https://jsonplaceholder.typicode.com/users/", {
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
    if (this.state.estatus === false) {
      editaEstatus = 0;
    } else {
      editaEstatus = 1;
    }
    axios
      .put("https://jsonplaceholder.typicode.com/users/", {
        id: this.state.id,
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  handleSubmitDelete = event => {
    event.preventDefault();
    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + this.state.id)
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  handleOnSearch = event => {
    let newFilter = Object.assign({}, this.state.filter, {
      [event.target.name]: [event.target.value],
    });
    this.setState({
      filter: newFilter,
    });
    console.log(newFilter);
  };

  handleOnFilter(filter, data) {
    let regex = new RegExp(filter.search, "i");
    return data.filter(
      q => regex.test(q.name) || regex.test(q.username) || regex.test(q.email)
    );
  }

  render() {
    return (
      <SiteWrapper>
        <Page.Card>
          <UsersSearch onSearch={this.handleOnSearch} />
          <Table>
            <Table.Header>
              <Table.ColHeader>Id</Table.ColHeader>
              <Table.ColHeader>Nombre</Table.ColHeader>
              <Table.ColHeader>UserName</Table.ColHeader>
              <Table.ColHeader>email</Table.ColHeader>
            </Table.Header>
            <Table.Body>
              {this.state.users.map(user => (
                <Table.Row
                  onClick={this.openModal.bind(
                    this,
                    user.id,
                    user.name,
                    user.username,
                    user.email
                  )}
                >
                  <Table.Col>{user.id}</Table.Col>
                  <Table.Col>{user.name}</Table.Col>
                  <Table.Col>{user.username}</Table.Col>
                  <Table.Col>{user.email}</Table.Col>
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
            <Button color="red" aling="right" onClick={this.closeModal}>
              x
            </Button>
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
                            id="name"
                            name="name"
                            label="Name"
                            placeholder="Name"
                            onChange={this.handleChange}
                            value={this.state.name}
                          />
                        </Grid.Col>
                        <Grid.Col md={12}>
                          <Form.Input
                            type="text"
                            id="username"
                            name="username"
                            label="username"
                            onChange={this.handleChangeUsername}
                            value={this.state.username}
                          />
                        </Grid.Col>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Col md={12}>
                          <Form.Input
                            type="text"
                            id="email"
                            name="email"
                            label="email"
                            placeholder="email"
                            onChange={this.handleChangeEmail}
                            value={this.state.email}
                          />
                        </Grid.Col>
                      </Grid.Row>
                    </Card.Body>
                    <Card.Footer>
                      <Button.List aling="right">
                        <Button color="green" onClick={this.handleSubmit}>
                          Guardar
                        </Button>
                        <Button color="blue" onClick={this.handleSubmitEditar}>
                          Editar
                        </Button>
                        <Button
                          color="red"
                          id="eliminar"
                          onClick={this.handleSubmitDelete}
                        >
                          Borrar
                        </Button>
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
export default ListaUser;
