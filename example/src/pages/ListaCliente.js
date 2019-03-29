import React from "react";
import { Table,Page,Button,Form,Card,Grid } from "tabler-react";
import axios from "axios";
import SiteWrapper from "../SiteWrapper.react";
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class ListaCliente extends React.Component {
    constructor(){
        super();
        this.state={
          modalIsOpen:false,
          persons :[],
          id:'',
          nombre:'',
          nombreCorto:'',
          domicilio:'',
          vip:'',
          activo:'',
          contacto: '',
          telefono: '',
          extension:'',
          nota:'',
        };

        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);   
    }

    openModal(id,nombre,nombreCorto,domicilio,vip,activo,contacto,telefono,extension,nota){
      console.log(nombre);
      this.setState({
        modalIsOpen:true, 
        id:id,
        nombre:nombre,
        nombreCorto:nombreCorto,
        domicilio:domicilio,
        vip:vip,activo:activo,
        contacto:contacto,
        telefono:telefono,
        extension:extension,
        nota:nota});
    }
    
    afterOpenModal(){
      this.subtitle.style.color='#f00';
    }

    closeModal(){
      this.setState({modalIsOpen:false});
    }

  componentDidMount() {
    axios.get("http://34.228.130.148:8080/skyone/cliente/")
    .then(res => {
      const persons = res.data;
      this.setState({ persons });
    }).catch((error)=>{
       console.log(error);
    }); 
  }

  handleChange = event =>{
    this.setState({nombre:event.target.value});
  }

  handleChangeNombreCorto = event =>{
    this.setState({nombreCorto:event.target.value});
  }

  handleChangeDomicilio = event =>{
    this.setState({domicilio:event.target.value});
  }

  handleChangeContacto = event =>{
    this.setState({contacto:event.target.value});
  }

  handleChangeTelefono = event =>{
    this.setState({telefono:event.target.value});
  }

  handleChangeExtension = event =>{
    this.setState({extension:event.target.value});
  }

  handleChangeNota = event =>{
    this.setState({nota:event.target.value});
  }

  handleChangeVip = event =>{
    this.setState({nota:event.target.value});
  }

  handleChangeActivo = event =>{
    this.setState({nota:event.target.value});
  }

  handleChangeLatitud = event =>{
    this.setState({latitud:event.target.value});
  }

  handleChangeLongitud = event =>{
    this.setState({longitud:event.target.value});
  }


  handleSubmitDelete = event =>{
    console.log(this.state.id);
    event.preventDefault();
    axios.delete("http://34.228.130.148:8080/skyone/cliente/"+this.state.id)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

  }

  handleSubmitEditar = event =>{
    event.preventDefault();
    axios.put("http://34.228.130.148:8080/skyone/cliente",{
      id: this.state.id, 
      nombre: this.state.nombre, 
      nombreCorto: this.state.nombreCorto, 
      domicilio: this.state.domicilio, 
      contacto: this.state.contacto, 
      telefono: this.state.telefono, 
      extension: this.state.extension, 
      nota: this.state.nota})
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

  }

  handleSubmit = event =>{  
  event.preventDefault();
   axios.post("http://34.228.130.148:8080/skyone/cliente/",{ 
      nombre: this.state.nombre, 
      nombreCorto: this.state.nombreCorto, 
      domicilio: this.state.domicilio,
      contacto: this.state.contacto,
      telefono: this.state.telefono, 
      extension: this.state.extension, 
      nota: this.state.nota})
      .then(res=>{
      console.log(res);
      console.log(res.data);
      })
  }



  render() {
    return (
        <SiteWrapper>
          <Page.Card>
           <Table>
            <Table.Header>
              <Table.ColHeader>ID</Table.ColHeader>
              <Table.ColHeader>Nombre</Table.ColHeader>
              <Table.ColHeader>Nombre corto</Table.ColHeader>
              <Table.ColHeader>Domicilio</Table.ColHeader>
              <Table.ColHeader>vip</Table.ColHeader>
              <Table.ColHeader>Activo</Table.ColHeader>
              <Table.ColHeader>Contacto</Table.ColHeader>
              <Table.ColHeader>Telefono</Table.ColHeader>
              <Table.ColHeader>Extension</Table.ColHeader>
              <Table.ColHeader>Latitud</Table.ColHeader>
              <Table.ColHeader>Longitud</Table.ColHeader>
              <Table.ColHeader>Nota</Table.ColHeader>
            </Table.Header>
            <Table.Body>
              {this.state.persons.map(person => (
                <Table.Row onClick={this.openModal.bind(this,person.id, person.nombre,person.nombreCorto,person.domicilio,person.contacto,person.telefono,person.extension,person.nota)}>
                  <Table.Col>{person.id}</Table.Col>
                  <Table.Col>{person.nombre}</Table.Col>
                  <Table.Col>{person.nombreCorto}</Table.Col>
                  <Table.Col>{person.domicilio}</Table.Col>
                  <Table.Col>{person.contacto}</Table.Col>
                  <Table.Col>{person.telefono}</Table.Col>
                  <Table.Col>{person.extension}</Table.Col>
                  <Table.Col>{person.nota}</Table.Col>
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
          <h2 ref={subtitle => this.subtitle = subtitle}></h2>
            <Button color="red" aling="right"  onClick={this.closeModal} >x</Button>
                <Page.Card
                title="Cliente"
                >
                <Grid.Row>
                  <Grid.Col md={12}>
                  <Card>
                      <Card.Body>
                      <Grid.Row>
                        <Grid.Col md={6}>
                        <Form.Input type="text" id="nombre" name='nombre' onChange={this.handleChange} value={this.state.nombre}
                        label='Nombre' placeholder='Nombre'
                        />
                        </Grid.Col>
                        <Grid.Col md={6}>
                        <Form.Input type="text" id="extension" name='extension' onChange={this.handleChangeExtension} value={this.state.extension}
                        label='Extension' placeholder='extension'
                        />
                        </Grid.Col>
                        </Grid.Row>
                        <Grid.Row>
                        <Grid.Col md={6}>
                        <Form.Input type="text" id="nombreCorto" name='nombreCorto' onChange={this.handleChangeNombreCorto} value={this.state.nombreCorto}
                        label='Nombre corto' placeholder='nombreCorto'
                        />
                        </Grid.Col>
                        <Grid.Col md={6}>
                        <Form.Input type="text" id="Nota" name='nota' onChange={this.handleChangeNota} value={this.state.nota}
                        label='Nota' placeholder='nota'
                        />
                        </Grid.Col>
                        
                        </Grid.Row>
                        <Grid.Row>
                        <Grid.Col md={6}>
                        <Form.Input type="text" id="domicilio" name='domicilio' onChange={this.handleChangeDomicilio} value={this.state.domicilio}
                        label='Domicilio' placeholder='domicilio'
                        />
                        </Grid.Col>
                        <Grid.Col md={3}>
                        <Form.Input type="text" id="vip" name='vip' onChange={this.handleChangeVip} value={this.state.vip}
                        label='vip' placeholder='vip'
                        />
                        </Grid.Col>
                        <Grid.Col md={3}>
                        <Form.Input type="text" id="activo" name='activo' onChange={this.handleChangeActivo}
                        label='Activo' placeholder='activo'
                        />
                        </Grid.Col>
                        </Grid.Row>
                        <Grid.Row>
                        <Grid.Col md={6}>
                        <Form.Input type="text" id="contacto" name='contacto' onChange={this.handleChangeContacto} value={this.state.contacto}
                        label='Contacto' placeholder='Contacto'
                        />
                        </Grid.Col>
                        <Grid.Col md={6}>
                        <Form.Input type="text" id="latitud" name='latitud' onChange={this.handleChangeLatitud}
                        label='Latitud' placeholder='latitud'
                        />
                        </Grid.Col>
                        </Grid.Row>
                        <Grid.Row>
                        <Grid.Col md={6}>
                        <Form.Input type="text" id="telefono" name='telefono' onChange={this.handleChangeTelefono} value={this.state.telefono}
                        label='Telèfono' placeholder='telefono'
                        />
                        </Grid.Col>
                        <Grid.Col md={6}>
                        <Form.Input type="text" id="longitud" name='longitud' onChange={this.handleChangeLongitud}
                        label='Longitud' placeholder='longitud'
                        />
                        </Grid.Col>
                        </Grid.Row>
                      </Card.Body>
                      <Card.Footer>
                        <Button.List aling="right">
                          <Button color="green"   onClick={this.handleSubmit.bind(this)}>Guardar</Button>
                          <Button color="primary" onClick={this.handleSubmitEditar.bind(this)}>Editar</Button>
                          <Button color="red"     onClick={this.handleSubmitDelete.bind(this)}>Borrar</Button>
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
export default ListaCliente;
