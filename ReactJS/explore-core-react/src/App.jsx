
import './App.css'

function App() {
  return (
    <>    
      <h1>Explore Core React</h1>
      <h2>Hi</h2>
      <Person />
      <Products />
      <Button />
    </>
  )
}

function Person() {
  const name = 'John Doe';
  const age = 25;
  return (
    <p>I am a {name} age = {age}</p>
  )
}

function Products() {
  return (
    <div>
      <h2>Products</h2>
      <ul>
        <li>Product 1</li>
        <li>Product 2</li>
        <li>Product 3</li>
      </ul>
    </div>
  )
}

function Button() {
  return (
    <button>Click Me</button>
  )
}

export default App
