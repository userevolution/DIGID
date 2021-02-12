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
import CreateFile from './components/CreateFile';

function App() {
  const [idxMethod, setidxMethod] = useState(null);
  const [idxId, setidxId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState([]);
  const [someoneNotes, setSomeoneNotes] = useState([]);

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

    await loadNotes(idx.id)
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

  async function loadNotes(idxId){
    if(idxId && !idxId.startsWith('did')){
      return
    }
    const record = await window.idx?.get('basicTranscript', idxId);
    
    record?.notes.map(async (encryptedNote, mapindex) => {
      try {
        const { recipient, note } = await window.did?.decryptDagJWE(encryptedNote);
        if(recipient){
          //return
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

  async function getSomeoneNotes(idxId){
    if(idxId && !idxId.startsWith('did')){
      idxId = await ethAddressToDID(idxId);
    }
    const record = await window.idx?.get('basicTranscript', idxId);
    
    record?.notes.map(async (encryptedNote, mapindex) => {
      try {
        const { recipient, note } = await window.did?.decryptDagJWE(encryptedNote);
        if(recipient){
          //return
        }
        const newNote = {
          name: note[0],
          description: note[1],
          issuanceDate: note[2]
        }
        setSomeoneNotes([...notes, newNote]);
      } catch (e) {}
    })
  }

  const ethAddressToDID = async (address) => {
    const caip10Doc = await window.ceramic?.createDocument('caip10-link', {
      metadata: {
        family: 'caip10-link',
        controllers: [address.toLowerCase() + '@eip155:1']
      }
    })
    return caip10Doc?.content;
  }

  const createTranscript = async(recipientDID, title, description, date) => {
    if(recipientDID && !recipientDID.startsWith('did')){
      recipientDID = await ethAddressToDID(recipientDID);
    }
    const record = await window.idx?.get('basicTranscript') || { notes : []  };
    const recipient = recipientDID;
    const degreetitle = title;
    const degreedescription = description;
    const issuancedate = date;
    const note =  [degreetitle, degreedescription, issuancedate];
    const noteData = { recipient, note };
    const recipients = [window.did?.id]; // always make ourselves a recipient

    if (recipient) recipients.push(recipient);

    const encryptedNote = await window.did?.createDagJWE(noteData, recipients);
    record.notes.push(encryptedNote);

    await window.idx?.set('basicTranscript', record);

    const newNote = {
      name: title,
      description: description,
      issuanceDate: date
    }
    await setNotes([...notes, newNote]);
  }

  const logout = async () => {
    await setidxId('');
    await setNotes([]);
    await setSomeoneNotes([]);
  }

  return (
    <Router>
      <Navbar logout={logout} idxId={idxId}/>

      <Switch>
        <Route path="/login">
          <Login
            authenticate={authenticate}
            />
        </Route>
        <Route path="/profile">
          <Profile
            updateProfile={updateProfile}
            getSomeoneNotes={getSomeoneNotes}
            idxId={idxId}
            name={name}
            notes={notes}
            someoneNotes={someoneNotes}
            />
        </Route>
        <Route path="/create-file">
          <CreateFile
            createTranscript={createTranscript}
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
