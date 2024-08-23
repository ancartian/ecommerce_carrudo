import React from 'react'
import ReactDOM from 'react-dom/client'
import { initializeApp } from "firebase/app";
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'



const firebaseConfig = {
  apiKey: "AIzaSyB4hmIcjEAK-Y1T1-q8xfEm-r89dmm2Syw",
  authDomain: "probando-25951.firebaseapp.com",
  projectId: "probando-25951",
  storageBucket: "probando-25951.appspot.com",
  messagingSenderId: "904651445000",
  appId: "1:904651445000:web:5580c12b83fa50c2fc12bd"
};

 initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
