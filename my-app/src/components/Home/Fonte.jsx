import React, { Component } from 'react';
import FontSizeChanger from 'react-font-size-changer';

 
class App extends Component {
  render() {
    return (
      <div className="app">
        <FontSizeChanger
          targets={['h1, p, a, h3, h2, h4 ']}
          onChange={(element, newValue, oldValue) => {
            console.log(element, newValue, oldValue);
          }}
          options={{
            stepSize: 2,
            range: 2
          }}
          customButtons={{
            up: <span style={{'fontSize': '30px'}}>+ A</span>,
            down: <span style={{'fontSize': '20px'}}>- A</span>,
            
            style: {
              border: "none",
              color: '#EAE8DB',
              width: '60px',
              heigth: "100%",
              font: "titulo",
              cursor: "Pointer",
              
              display: "flex",
              justifyContent: "center",
              alignItems: "center"

            },
            buttonsMargin: -1
          }}          
        />
      </div>
    );
  }
}

export default App