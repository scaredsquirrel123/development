import { useState } from "react";

function SquishItem(prop) {

    // setting props variables names so don't have to keep writing prop. ____
    const item = prop.item;
    const setFavProducts = prop.setFavProducts;
    const favProducts = prop.favProducts;
    const setTotal = prop.setTotal;
    // state to keep track of if favorite button is on or off
    const [like, setLike] = useState(false); //false is empty heart
    

    const handleClick = () => {
    
        // if item is unfavorited prior to button click, then add the item to favProducts list and store in variable updatedFavorites
        if(like === false){ 
            var updatedFavorites = [...favProducts, item]; 
        // if item is favorited prior to button click, then check if the item is in the favProducts/updatedFavorites list and filter it out if so
        } else if(like === true){ 
            var updatedFavorites = [...favProducts];
            var filtered = updatedFavorites.filter(compare => {return item.price !== compare.price}); 
            updatedFavorites = filtered;
        }

        // set the state of favProducts to updatedFavorites to be used in App component
        setFavProducts(updatedFavorites);

        // set like to the opposite of what is was prior to the button click
        setLike((prevState) => !prevState)

        // recalculate the total price of all the items in updatedFavorites and set total to that value
        var sum = 0;
        updatedFavorites.forEach(i => sum += i.price);
        setTotal(sum);
    }


    return (
        <div class ="items" style={{
            backgroundColor: item.color}}>
            <img src={item.image}></img>
            <h4><strong>{item.name}</strong></h4>
            <h5>${item.price}</h5>
            <p>{item.type} &amp; {item.rare}</p>
            <button class="button-style" role="button" onClick={handleClick}>
                Favorite: {like ? "♥": "♡"}
            </button>
        </div>
    );
  }
  
export default SquishItem;
  
