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
import Profile from './components/Profile';

function App() {
  const [idxMethod, setidxMethod] = useState(null);
  const [idxId, setidxId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState([]);

  const ceramicPromise = createCeramic();

  const authenticate = async () => {
    const [ceramic, provider] = await Promise.all([ceramicPromise, getProvider()])
    await ceramic.setDIDProvider(provider)
    const idx = createIDX(ceramic)

    setidxMethod(idx)

    window.did = ceramic.did
    setidxId(idx.id)

    const data = await idx.get('basicTranscript', idx.id)
    console.log(data)

    loadNotes(idx.id)
    //setName(data.name)
    //setDescription(data.description)
  }

  const updateProfile = async (newName) => {
    const description = "coding"
    await window.idx?.set('basicProfile', { name: newName, description })
    const data = await window.idx?.get('basicProfile')
    setName(data.name)
    setDescription(data.description)
  }

  const loadNotes = async (idxId) => {
    if(idxId && !idxId.startsWith('did')){
      return
    }
    const record = await window.idx?.get('basicTranscript', idxId);
  
    record?.notes.map(async (encryptedNote, mapindex) => {
      try {
        const { recipient, note } = await window.did?.decryptDagJWE(encryptedNote);
        if(recipient){
          return
        }
        const newNote = {
          name: note[0],
          description: note[1],
          issuanceDate: note[2]
        }

        setNotes([...notes, newNote]);
      } catch (e) {}
    })
  }

  return (
    <Router>
      <Navbar />

      <Switch>
        <Route path="/login">
          <Login
            authenticate={authenticate}
            />
        </Route>
        <Route path="/profile">
          <Profile
            updateProfile={updateProfile}
            idxId={idxId}
            name={name}
            description={description}
            notes={notes}
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
