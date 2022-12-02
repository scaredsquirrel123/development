import { useState } from "react";
import SquishItem from './components/SquishItem';
import Nav from 'react-bootstrap/Nav';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";



function App() {

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

  // declaring states
  const [sort, setSort] = useState("AtoZ");
  const [type, setType] = useState("All"); 
  const [rare, setRare] = useState("All");
  const [total, setTotal] = useState(0);
  const [favProducts , setFavProducts] = useState([]);
  const [favChecked, setFavChecked] = useState(false);

  // set sort to what is selected in navbar
  const selectSortType = eventKey => {
    setSort(eventKey);
  }

  // set type to what is selected in navbar
  const selectFilterType = eventKey => {
    setType(eventKey);
  };

  // filtering condition to return true if item should be on page, false if not
  const matchesFilterType = item => {
    // all items should be shown when no filter is selected
    if(type === "All") { 
      return true
    } else if (type === item.type) { // if type is item's type, then show it on page
      return true
    } else { // else do not show it on page
      return false
    }
  }

  // this is the filtering condition for the favorites section 
  const matchesFavItems = item => {
    if(favChecked === false) { // if checkbox is unchecked, all items regardless of favorite status are on page
      return true
    } else if (favProducts.some((element) => item.name === element.name)) { // if checkbox is checked and favProducts item list contains the item, then display on page
      return true
    } else { // else if checkbox is checked, and item is not in list, then not on page
      return false
    }
  }

  // set rare to what is selected in navbar
  const selectFilterRare = eventKey => {
    setRare(eventKey);
  };

  // filtering condition to return true if item should be on page, false if not
  const matchesFilterRare = item => {
    // all items should be shown when no filter is selected
    if(rare === "All") { 
      return true
    } else if (rare === item.rare) { // if rare is item's rare, then show it on page
      return true
    } else { // else do not show it on page
      return false
    }
  }

  // sorting conditions
  if(sort === "AtoZ"){ // A to Z selected (sort alphabetically)
    filteredData = filteredData.sort((a, b) => {
      return a.name - b.name;
      })
  } else if(sort === "lowtohigh"){ // Price: Low to High selected (sort from $ to $$$)
    filteredData = filteredData.sort((a, b) => {
      return a.price - b.price;
      })
  } else if(sort === "hightolow"){ // Price: High to Low selected (sort from $$$ to $)
    filteredData = filteredData.sort((a, b) => {
      return b.price - a.price;
      })
  }

  // filtering the data based on the matches functions return values (type, rare, favorite)
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
            <SquishItem item={item} key={item.name} setTotal={setTotal} favProducts={favProducts} setFavProducts={setFavProducts}/>
          ))}
          </div>

        </div>
  );
}

export default App;
