import React from "react";
import {Card,Page,Button,Form,Grid} from "tabler-react";
import "tabler-react/dist/Tabler.css";

import SiteWrapper from '../SiteWrapper.react';

class FormCliente extends React.Component {
    
    
  render() {
    return (
          <SiteWrapper>
            <Page.Card
            title="Cliente"
            >

            <Grid.Row>
                <Grid.Col>
                  <Card>
                     <Card.Header>
                       <Card.Title>Clientes</Card.Title>
                       <Card.Options>
                       
                       </Card.Options>
                     </Card.Header>
                     <Form>
                       <Card.Body>
                         <Grid.Col md={6}>
                            <Form.Input type="text" id="nombre" name='nombre'
                            label='Nombre' placeholder='Nombre' 
                            />
                         </Grid.Col>
                         <Grid.Col md={6}>
                            <Form.Input type="text" id="extension" name='extension'
                            label ="Extension" placeholder='extension'
                            />
                         </Grid.Col>
                       </Card.Body>
                     </Form>
                   </Card>
                 </Grid.Col>
               </Grid.Row>
            </Page.Card>
          </SiteWrapper>
      
      
        

    );
  }
}
export default FormCliente;
