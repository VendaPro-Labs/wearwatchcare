import React from 'react';

import Row from 'react-bootstrap/Row';
import AppRoutes from './AppRoutes';
import './App.css';

const App = () => {
  return (
    <div className="App">
         <Row>
             <AppRoutes></AppRoutes>
         </Row>
     </div>
  );
}

export default App;
