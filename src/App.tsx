import React, { useEffect, useState } from 'react';
import './App.css';
import { AlbumsModel, PostsModel, UsersModel } from './App.model';
import { GetlifeTable } from './components/getlife-table/getlife-table.component';
import {serviceFetch} from './services/services-interfaces.model'

function App() {

  const [users, setUsers] = useState<UsersModel[]>();
  const [posts, setPosts] = useState<PostsModel[]>();
  const [albums, setAlbums] = useState<AlbumsModel[]>();

  const callService = async(url: string, type: string) => {
    const response = await serviceFetch(url)
    switch (type) {
      case 'users':
    }

  }
  useEffect(() => {
    callService('https://jsonplaceholder.typicode.com/users', "users");
    callService('https://jsonplaceholder.typicode.com/posts', "posts");
    callService('https://jsonplaceholder.typicode.com/albums', "albums");

  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <GetlifeTable name="pepe"></GetlifeTable>
      </header>
    </div>
  );
}

export default App;
