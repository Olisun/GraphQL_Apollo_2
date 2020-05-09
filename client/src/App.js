import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Card } from 'react-bootstrap';

import './App.css';

// GQL query for fetching data
const GET_USERS = gql`
  {
    users {
      id
      login
      avatar_url
    }
  }
`;

//User component
const User = ({ user: { login, avatar_url } }) => (
  <div className='mb-3 px-0'>
    <Card style={{ width: '54rem', margin: 'auto' }}>
      <Card.Img
        variant="top"
        src={avatar_url}
        style={{ width: '300px', margin: 'auto' }}
      />
      <Card.Body>
        <Card.Title>{login}</Card.Title>
        <Card.Link href={`https://github.com/${login}`}>See Profile</Card.Link>
      </Card.Body>
    </Card>
  </div>
)

function App() {
  const { loading, error, data } = useQuery(GET_USERS)

  if (error) return <h1>Error</h1>
  if (loading) return <h1>Loading...</h1>

  console.log(data)

  return (
    <main
      className="App" className='container'>
      <h1>Github | Users</h1>
      {data.users.map(user => (
        <User key={user.id} user={user} />
      ))}
    </main>
  );
}

export default App;
