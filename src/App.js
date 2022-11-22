import logo from './logo.svg';
import "./App.css";
import { useEffect, useState } from "react";
import BakeryItem from './components/BakeryItem';
import Nav from 'react-bootstrap/Nav';

function App() {
  const squishData = [
    { name: "Abby", type: "sea animal", price: 12, rare: "not rare", image: "../abby.png",},
    { name: "Archie", type: "land animal", price: 18, rare: "rare",image: "archie.png",},
    { name: "Austin", type: "food", price: 45, rare: "very rare", image: "austin.png",},
    { name: "Avery", type: "land animal", price: 50, rare: "very rare", image: "avery.png",},
    { name: "Carl", type: "food", price: 14, rare: "not rare", image: "carl.png",},
    { name: "Eric", type: "sea animal", price: 40, rare: "very rare", image: "eric.png",},
    { name: "Gordon", type: "sea animal", price: 21, rare: "rare", image: "gordon.png",},
    { name: "Hans", type: "land animal", price: 30, rare: "rare", image: "hans.png",},
    { name: "Karina", type: "land animal", price: 16, rare: "not rare", image: "karina.png",},
    { name: "Miles", type: "land animal", price: 24, rare: "rare", image: "miles.png",},
    { name: "Silvina", type: "land animal", price: 15, rare: "not rare", image: "silvina.png",},
    { name: "Tex", type: "food", price: 26, rare: "rare", image: "tex.png",},
   ]
   
  const [type, setType] = useState("All"); 
  const [rare, setRare] = useState("All");
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const updatePrice = () => {
    let sum = 0;
    
    cart.forEach(i => sum += i.price);

    setTotal(sum);
  }

  useEffect(() => {
      updatePrice();
  })



  const selectFilterType = eventKey => {
    setType(eventKey);
  };

  const matchesFilterType = item => {
  // all items should be shown when no filter is selected
    if(type === "All") { 
      return true
    } else if (type === item.type) {
      return true
    } else {
      return false
    }
  }



  const selectFilterRare = eventKey => {
    setRare(eventKey);
  };

  const matchesFilterRare = item => {
  // all items should be shown when no filter is selected
    if(rare === "All") { 
      return true
    } else if (rare === item.rare) {
      return true
    } else {
      return false
    }
  }

  //on change, call function
  //make new onclick fucntion that passes in what clicked
  //onClick={() => changeFilter(“chocolate”)}
  //if rare then .filter(rare)

  const filteredData = squishData.filter(myFilterFunction)
   
  return (
    <div className="App">
      <h1>Squishmallow Shop</h1>

      {/* how to set up nav */}

      <Nav onSelect={selectFilterType}>
      <Nav.Item><Nav.Link eventKey="All">All</Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link eventKey="land animal">Land Animal</Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link eventKey="sea animal">Sea Animal</Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link eventKey="food">Food</Nav.Link></Nav.Item>
      </Nav>

      <Nav onSelect={selectFilterRare}>
      <Nav.Item><Nav.Link eventKey="All">All</Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link eventKey="not rare">Not Rare</Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link eventKey="rare">Rare</Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link eventKey="very rare">Very Rare</Nav.Link></Nav.Item>
      </Nav>


      <h2>Sort by:</h2>
      {/* how to set up radio buttons */}
      {/* A to Z */}
      {/* item.name.sort(); */}
      {/* Price: Low to High */}
      {/* item.price.sort(function(a, b){return a - b}); */}
      {/* Price: High to Low */}
      {/* item.price.sort(function(a, b){return b - a}); */}

      <div class="wrapper">
      {squishData.map((item, index) => ( 
        <BakeryItem item={item} key={index} cart={cart} updateCart={setCart} total={total} setTotal={setTotal}/>
      ))}
      </div>

      <div class="cart">
        <h2>Favorites</h2>
        {/* TODO: render a list of items in the cart */}
            {cart.map((e, i) => <p key={i}>{e.name}</p>)}
            <h4>Total: ${total}</h4>
      </div>
    </div>
  );
}

export default App;
