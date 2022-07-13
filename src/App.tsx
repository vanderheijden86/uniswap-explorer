import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import PoolsOverview from "./pools-overview";

function App() {
  return (
    <Container fluid>
      <PoolsOverview />
    </Container>
  );
}

export default App;
