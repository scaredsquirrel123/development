import { useEffect, useState } from "react";
import BakeryItem from './components/BakeryItem';
import Nav from 'react-bootstrap/Nav';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap'; 
import "./App.css";



function App() {

  const [sort, setSort] = useState("AtoZ");

  const squishData = [
    { name: "Abby", type: "sea animal", price: 15, rare: "not rare", image: "abby.png", color:"#abdee6"},
    { name: "Archie", type: "land animal", price: 18, rare: "rare",image: "archie.png", color:"#ffffb5"},
    { name: "Austin", type: "food", price: 45, rare: "very rare", image: "austin.png", color:"#cbaacb"},
    { name: "Avery", type: "land animal", price: 50, rare: "very rare", image: "avery.png", color:"#ffccb6"},
    { name: "Carl", type: "food", price: 14, rare: "not rare", image: "carl.png", color:"#f3b0c3"},
    { name: "Eric", type: "sea animal", price: 40, rare: "very rare", image: "eric.png", color:"#cbaacb"},
    { name: "Gordon", type: "sea animal", price: 21, rare: "rare", image: "gordon.png", color:"#ffccb6"},
    { name: "Hans", type: "land animal", price: 30, rare: "rare", image: "hans.png", color:"#abdee6"},
    { name: "Karina", type: "land animal", price: 16, rare: "not rare", image: "karina.png", color:"#ffccb6"},
    { name: "Miles", type: "land animal", price: 24, rare: "rare", image: "miles.png", color:"#ffffb5"},
    { name: "Silvina", type: "land animal", price: 12, rare: "not rare", image: "silvina.png", color:"#f3b0c3"},
    { name: "Tex", type: "food", price: 26, rare: "rare", image: "tex.png", color:"#cbaacb"},
   ]
  
  var filteredData = squishData;

  const [type, setType] = useState("All"); 
  const [rare, setRare] = useState("All");
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [favProducts , setFavProducts] = useState([]);
  const [favChecked, setFavChecked] = useState(false);

  // const updatePrice = () => {
  //   let sum = 0;
    
  //   // cart.forEach(i => sum += i.price);
  //   favProducts.forEach(i => sum += i.price);

  //   setTotal(sum);

  // }

  // useEffect(() => {
  //     updatePrice();
  // })

  const selectSortType = eventKey => {
    setSort(eventKey);
  }

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

  const matchesFavItems = item => {
    if(favChecked === false) { 
      return true
    } else if (favProducts.some((element) => item.name === element.name)) {
      return true
    } else {
      return false
    }
  }

  const handleChange = () => {
    setFavChecked(!favChecked);
  };


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


  if(sort === "AtoZ"){
    filteredData = filteredData.sort((a, b) => {
      return a.name - b.name;
      })
  } else if(sort === "lowtohigh"){
    filteredData = filteredData.sort((a, b) => {
      return a.price - b.price;
      })
  } else if(sort === "hightolow"){
    filteredData = filteredData.sort((a, b) => {
      return b.price - a.price;
      })
  }

  filteredData = filteredData.filter(matchesFilterType);
  filteredData = filteredData.filter(matchesFilterRare);
  filteredData = filteredData.filter(matchesFavItems);
   

  return (
    <div className="App">
<img src="squish-logo.jpeg"></img>

<Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" onSelect={selectSortType}>
            <NavDropdown title="Sort By" id="basic-nav-dropdown">
              <NavDropdown.Item eventKey="AtoZ">A to Z</NavDropdown.Item>
              <NavDropdown.Item eventKey="lowtohigh">Price: Low to High</NavDropdown.Item>
              <NavDropdown.Item eventKey="hightolow">Price: High to Low</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="me-auto" onSelect={selectFilterType}>
            <NavDropdown title="Filter By Type" id="basic-nav-dropdown">
              <NavDropdown.Item eventKey="All">All</NavDropdown.Item>
              <NavDropdown.Item eventKey="land animal">Land Animal</NavDropdown.Item>
              <NavDropdown.Item eventKey="sea animal">Sea Animal</NavDropdown.Item>
              <NavDropdown.Item eventKey="food">Food</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="me-auto" onSelect={selectFilterRare}>
            <NavDropdown title="Filter By Rarity" id="basic-nav-dropdown">
              <NavDropdown.Item eventKey="All">All</NavDropdown.Item>
              <NavDropdown.Item eventKey="not rare">Not Rare</NavDropdown.Item>
              <NavDropdown.Item eventKey="rare">Rare</NavDropdown.Item>
              <NavDropdown.Item eventKey="very rare">Very Rare</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className="checkbox-wrapper">
            <label>
              <input type="checkbox" checked={favChecked}
                onClick={() => { setFavChecked((previous) => !previous)}}
              />  Favorites <p id="total">Total: ${total}</p>
            </label>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <div class="wrapper">
      {filteredData.map((item) => ( 
        <BakeryItem item={item} key={item.name} cart={cart} updateCart={setCart} total={total} setTotal={setTotal} favProducts={favProducts} setFavProducts={setFavProducts}/>
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
