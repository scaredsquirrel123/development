import { useEffect, useState } from "react";

function BakeryItem(prop) {

    const item = prop.item;
    const setFavProducts = prop.setFavProducts;
    const favProducts = prop.favProducts;
    const setTotal = prop.setTotal;
    const [like, setLike] = useState(true); //true is empty heart
    
    const handleClick = () => {
    
        console.log(prop.item.name);

        if(like === true){
            var updatedFavorites = [...favProducts, item]; 
        } else if(like === false){
            var updatedFavorites = [...favProducts];
            var filtered = updatedFavorites.filter(compare => {return item.price !== compare.price}); 
            updatedFavorites = filtered;
        }
        setFavProducts(updatedFavorites);

        setLike((prevState) => !prevState)
        console.log(like);

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
                Favorite: {like ? "♡" : "♥"}
            </button>
        </div>
    );
  }
  
export default BakeryItem;
  
