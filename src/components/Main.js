import React, { useState } from 'react';
import { DID } from 'dids'
import { IDX } from '@ceramicstudio/idx'
import { CeramicApi } from '@ceramicnetwork/common'

import { createCeramic } from './ceramic/ceramic.ts'
import { createIDX } from './ceramic/idx.ts'
import { getProvider } from './ceramic/wallet.ts'

function Main() {
    const [idxMethod, setidxMethod] = useState(null)
    const [idxId, setidxId] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const ceramicPromise = createCeramic()

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
    <div className="App">
        <button onClick={authenticate}>Login</button>
        <p>{idxId}</p>
        <p>{name}</p>
        <p>{description}</p>

        <button onClick={updateProfile}>Update</button>
    </div>
  );
}

export default Main;
