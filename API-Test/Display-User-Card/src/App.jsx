import { Suspense } from 'react';
import './App.css'
import Users from './components/Users/users'

function App() {

  const usersData = fetch('../public/users.json').then(res => res.json());

  return (
    <>
      <h1>User Data</h1>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Users usersData={usersData}></Users>
      </Suspense>
    </>
  )
}

export default App
