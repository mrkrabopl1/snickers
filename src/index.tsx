import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import App from './app'
import Profile from './app'
import { setupStore } from './store/store';
import 
{Route,BrowserRouter as Router,Routes,
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

if (module && module.hot) {
    module.hot.accept();
}


class About extends React.Component{
    render(){
        return <h2>О сайте</h2>;
    }
}
class NotFound extends React.Component{
    render(){
        return <h2>Ресурс не найден</h2>;
    }
}
   
class Main extends React.Component{
    render(){
        return <h2>Главная</h2>;
    }
}


const store = setupStore()

ReactDOM.render(
    <Provider store={store}>
             <App />
        </Provider>,


    document.querySelector('#root')
);