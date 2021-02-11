import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import { DID } from 'dids';
import { IDX } from '@ceramicstudio/idx';
import { CeramicApi } from '@ceramicnetwork/common';

import { createCeramic } from './components/ceramic/ceramic.ts';
import { createIDX } from './components/ceramic/idx.ts';
import { getProvider } from './components/ceramic/wallet.ts';

import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';

function App() {
  const [idxMethod, setidxMethod] = useState(null);
  const [idxId, setidxId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const ceramicPromise = createCeramic();

  const authenticate = async () => {
    const [ceramic, provider] = await Promise.all([ceramicPromise, getProvider()])
    await ceramic.setDIDProvider(provider)
    const idx = createIDX(ceramic)

    setidxMethod(idx)

    window.did = ceramic.did
    setidxId(idx.id)

    const data = await idx.get('basicProfile', idx.id)
    setName(data.name)
    setDescription(data.description)
  }

  const updateProfile = async () => {
    const name = "joe"
    const description = "coding"
    await window.idx?.set('basicProfile', { name, description })
    const data = await window.idx?.get('basicProfile')
    setName(data.name)
    setDescription(data.description)
  }

  return (
    <Router>
      <Navbar />

      <Switch>
        <Route path="/login">
          <Login
            authenticate={authenticate}
            idxId={idxId}
            name={name}
            description={description}
            />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
