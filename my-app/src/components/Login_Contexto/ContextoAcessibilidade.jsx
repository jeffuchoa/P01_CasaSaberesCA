import React, { createContext, useState } from 'react';

const AcessContext = createContext();

const AcessProvider = ({ children }) => {
  const [acessibilidade ,SetAcessibilidade] = useState(false);
 

  return (
    <AcessContext.Provider value={{ acessibilidade, SetAcessibilidade}}>
      {children}
    </AcessContext.Provider>
  );
};


export { AcessContext, AcessProvider };


