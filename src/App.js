import React from "react";
import RouteCompo from "./Routes/RouteCompo";
import { Provider } from 'react-redux'
import store from './redux/store'



function App() {

  React.useEffect(()=>{

    // localStorage.setItem('baseUrl','http://192.168.1.123:4000')
    localStorage.setItem('baseUrl','http://3.111.246.225:4000')

    console.log('baseUrl',localStorage.getItem('baseUrl'))
  },[])

  return (
    <div>
      
      <Provider store={store}>
        <RouteCompo />
      </Provider>

    </div>
  );
}

export default App;
