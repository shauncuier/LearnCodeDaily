
import './App.css'

function App() {
  return (
    <>    
      <h1>Explore Core React</h1>
      <h2>Hi</h2>
      <Person />
      <Products />
      <Button />

      <Developer name="John Doe" tech="React" />
      <Developer name="Jane Doe" tech="Angular" />
      <Developer name="Alice" tech="Vue" />
      <Developer name="Bob" tech="Svelte" />
      <Developer name="Charlie" tech="Ember" />
      

    </>
  )
}

function Developer(props) {
  return (
    <div className='button' style={{border: '2px solid #646cffaa', margin: '10px', padding: '10px', borderRadius: '15px'}}>
      <h3>Developer: {props.name}</h3>
      <p> Tecnology: {props.tech}</p>
    </div>
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
