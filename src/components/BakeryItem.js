function BakeryItem(prop) {

    const updateCart = prop.updateCart;
    const cart = prop.cart;
    const item = prop.item;
    
    const handleClick = () => {
        console.log(prop.item.name);
        updateCart([...cart, item]);
    }

    
    return (
        <div class ="items">
            <img src={item.image}></img>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{item.price}</p><button onClick={handleClick}>Add to Favorites</button>
        </div>
    );
  }
  
export default BakeryItem;
  
