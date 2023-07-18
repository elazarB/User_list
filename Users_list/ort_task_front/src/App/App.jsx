import React from "react";
import ClientList from "../Comonents/users/UsersList";
import AddClientModal from "../Comonents/Modal/AddClientModal";
import AddMapModal from "../Comonents/Modal/AddMapModal";
// import './App.css'

function App() {
  return (
    <div className="bg-slate-800/80  min-h-screen">
      <AddClientModal />
      <AddMapModal />
      <ClientList />
    </div>
  );
}

export default App;
