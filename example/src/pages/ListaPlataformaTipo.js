import React, {Component} from 'react';
import { Table, Page,Button,Grid,Card,Form } from "tabler-react";
import axios from "axios";
import SiteWrapper from '../SiteWrapper.react';
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
  
class ListaPlataformaTipo extends Component{
    constructor(){
        super();
        this.state={
          modalIsOpen:false,
          pfTipos :[],
          id:'',
          nombre:'',
        };
        
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleChange = event =>{
      this.setState({nombre:event.target.value});
    }

    openModal(id,nombre){
        this.setState({modalIsOpen:true,id:id,nombre:nombre});
      }
      
      afterOpenModal(){
        this.subtitle.style.color='#f00';
      }
  
      closeModal(){
        this.setState({modalIsOpen:false});
      }
  
    componentDidMount() {
        axios.get("http://34.228.130.148:8080/skyone/plataformatipo")
        .then(res => {
          const pfTipos = res.data;
          this.setState({ pfTipos });
        });
      }

    handleSubmit = event =>{
        event.preventDefault();
        axios.post("http://34.228.130.148:8080/skyone/plataformatipo",{nombre:this.state.nombre})
        .then(res=>{
            console.log(res);
            console.log(res.data);
        })
      }

    handleSubmitEditar = event =>{
        event.preventDefault(); 
        axios.put("http://34.228.130.148:8080/skyone/plataformatipo",{id: this.state.id, nombre: this.state.nombre})
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
      }  
    
    handleSubmitDelete = event =>{
      console.log(this.state.id);
      event.preventDefault();
      axios.delete("http://34.228.130.148:8080/skyone/plataformatipo/"+this.state.id)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }

    render(){
        return(
            <SiteWrapper>
              <Page.Card>
                <Table>
                    <Table.Header>
                        <Table.ColHeader>ID</Table.ColHeader>
                        <Table.ColHeader>Nombre</Table.ColHeader>
                    </Table.Header>
                    <Table.Body>
                       {this.state.pfTipos.map(pfTipo=>(
                        <Table.Row onClick={this.openModal.bind(this,pfTipo.id, pfTipo.nombre)}>
                        <Table.Col>{pfTipo.id}</Table.Col>
                        <Table.Col>{pfTipo.nombre}</Table.Col>
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
                      title="Tipo de Plataforma"
                      >
                        <Grid.Row>
                            <Grid.Col md={22}>
                            <Card>
                            <Card.Body>
                            <Grid.Row>
                                <Grid.Col md={12}>
                                <Form.Input type="text" id="nombre" name='nombre' onChange={this.handleChange} value={this.state.nombre}
                                label='Nombre' placeholder='Nombre'
                                />
                                </Grid.Col>
                                </Grid.Row> 
                            </Card.Body>
                            <Card.Footer>
                                <Button.List aling="right">
                                <Button color="green" onClick={this.handleSubmit.bind(this)}>Guardar</Button>
                                <Button color="primary" onClick={this.handleSubmitEditar.bind(this)}>Editar</Button>
                                <Button color="red" onClick={this.handleSubmitDelete.bind(this)}>Borrar</Button>
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
export default ListaPlataformaTipo;