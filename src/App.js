import React, { Component } from 'react';
import MainPage from "./Containers/MainPageContainer/MainPage";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/jquery/dist/jquery.slim";

class App extends Component {
  render() {
    return (
      <div>
        <MainPage />
      </div>
    );
  }
}

export default App;
