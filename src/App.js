import React from 'react';

import Row from 'react-bootstrap/Row';
import AppRoutes from './AppRoutes';
import './App.css';

import Container from 'react-bootstrap/Container';

const App = () => {
  return (
    <div className="App">
      <Container>
         <Row>
             <AppRoutes></AppRoutes>
         </Row>
         </Container>
     </div>
  );
}

export default App;
