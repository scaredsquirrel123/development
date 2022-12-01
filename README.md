# Development
Rubric:
- At least 2 filtering categories: "Filter By Type" and "Filter By Rarity"
- At least 1 sorting feature: "Sort By"
- Combinations of sorting/filtering work together: yes can do all three together
- Ways to add and remove items: Toggle "Favorite: ♡" and "Favorite: ♥"
- Way to reset the items: Under "Filter By Type" and "Filter By Rarity," click
the option "All" to see all items and filter none out.
- An aggregator Component showing the items and aggregated value: When the user
checks the "Favorites" checkbox, only the favorited items are displayed
because App.js can tell if an item is favorited or not due to the favProducts
list state we created. Then, below the "Favorites" checkbox, the aggregated
value, which is the sum of the prices of all the favorited items, is displayed.
- Uses Components for the items: App.js is the main component that displays
the other features and components called SquishItem that we created in
SquishItem.js to display the cards for each Squishmallow.
- Uses props to pass item data to the Components: Passed data using props from
App.js to SquishItem.js <SquishItem item={item} key={item.name} setTotal={setTotal} favProducts={favProducts} setFavProducts={setFavProducts}/>
- Uses state for the list of items, and the UI is reactive to the state: 
favProducts is a state that we created for the list of favProducts, and whenever
we click on the favorite button with the heart, the UI alternates between an
empty (♡) and filled heart (♥). Also, the list of items is sorted and filtered
using state and items are arranged/removed in the UI based on what is selected.

### Link to Deployed Website
https://scaredsquirrel123.github.io/development/

### Goal and Value of the Application
This application is a Squishmallow collection webpage. The goal is for the user
to be able to be able to sort and filter their Squishmallows and also favorite
their favorite Squishmallows and display them accordingly. (Sorting is based on
either name or price, and filtering is based on type or rarity). The value of my
application is for Squishmallow fans like myself! I would find it convenient to
view my Squishmallows digitally, especially since I can't carry all of them
on the plane with me :'( This could also be replicated for other collectible
items too like Pokemon cards, coins, etc. so that collectors can have their
items organized with them wherever they go.


### Usability Principles Considered
I considered the usability principles of learnability, efficiency,
and memorability.

Learnability: I felt that nav bars are intuitive and if they have an arrow,
that implies a dropdown menu. Also, I thought that the checkbox is also 
intuitive in the navbar because if you click it, you expect the favorites to
be displayed. Also, I tried to use clear terms such as Sort By, Filter By Type,
and Filter By Rarity and also in the dropdowns too, also including the filtering
conditions.

Efficiency: Having all the sorting/filters in a line at the top with dropdown 
menus makes it easy for the user to access since they do not have to scroll 
around.

Memorability: The color palette and fonts were inspired by the ones that the
Squishmallow brand uses. Also, I feel like once the user uses the page at least
once, it is pretty simple to understand where everything is since the 
functionality is all concentrated at the top with dropdowns and a checkbox.


### Organization of Components
The App Component is the main component (created in App.js file) that acts as a 
container or parent for the other component that we created called SquishItem 
(created in SquishItem.js file). App is the parent component and it contains the
data for the page and the sorting and filtering functionalities. App 
communicates with its child SquishItem through props which I will go over in 
my next answer. SquishItem is a child component that returns the display card  
for each Squishmallow and handles when the favorite button is clicked
and the corresponding functionality. 


### How Data is Passed Down Through Components
Data is passed down from the App component (App.js) to the SquishItem component
(SquishItem.js) using props. In App.js we have filteredData.map((item) => ( 
 <SquishItem item={item} key={item.name} setTotal={setTotal} favProducts={favProducts} setFavProducts={setFavProducts}/>))
In this case, we are calling the child component of SquishItem and displaying
on screen what is in the return statement from SquishItem for each item in
filteredData. Regarding how to get the data to fill each component, the data
from App.js is in the curly braces "{}" after the equals sign, and the 
name of the prop is before the equals sign. Then, in SquishItem, we are able
to access the data from App.js using the prop name. For example, if we
want to access the favProducts list in SquishItem, we can use prop.favProducts.


### How the User Triggers State Changes
Declaring the state for sort: const [sort, setSort] = useState("AtoZ");
Initially, sort is set to the default "A to Z". Then, whenever the user clicks
an option in the "Sort By" navbar dropdown, an eventKey that corresponds
to the selected option is passed into setSort, and then sort is set to that
value. Then, the items displayed on the screen are sorted based on that option
that sort has been set to (A to Z, Price: Low to High, and Price: High to Low)
using the .sort() filter outlined in the gear up slides.

Declaring the state for type: const [type, setType] = useState("All"); 
Next, the filters are set to their default "All," which does not filter out any
items. For the "Filter By Type" filter, if a user clicks on an option
in the "Filter By Type" navbar dropdown, an eventKey that corresponds to the
selected option is passed into setType, and then type is set to that value.
Then, the items are checked individually in the matchesFilterType function, and
return true if the item's type is equal to the type that was just set and false 
if not (or always return true if "All" is selected). Then, the items that have
false returned are filtered out, and the ones that have true returned are
displayed on the screen.

Declaring the state for rare: const [rare, setRare] = useState("All");
Similar to above, just replace type with rare! I created a "Filter By Rarity"
navbar dropdown that each filter option has an eventKey which when the user
clicks on the option, then the eventKey is passed into setRare that sets rare 
to that value. Then, the items are returned either true or false depending 
whether the item's rare value match the rare value that was set, and are removed
from the screen if false.

Clicking the favorite button with the heart at the bottom of each item triggers 
multiple state changes. First, in SquishItem.js, I declared a state for the like
setting: const [like, setLike] = useState(false);. False is when the item is not 
favorited and true is when it is favorited. When the user clicks the heart, the
opposite of what like is set to is passed into setLike, which is what triggers
whether the empty heart (false) or the filled heart (true) is displayed on the
button. 

Also, favProduct is changed when the user clicks the button, and this
state (declared as const [favProducts , setFavProducts] = useState([]);)
was passed from App.js to SquishItem.js as a prop. When like is true, the item
is added to the favProducts list, and if it is false, then the item (if it
exists) is removed from the list. Also, whenever this happens, the total cost of
all the favorited items is calculated and using setTotal (which is another state
that we declared: const [total, setTotal] = useState(0);), the total is updated
on the screen. 

This favProducts list is then used in App.js when the Favorites checkbox 
is checked. This is the final state that the user can trigger: 
const [favChecked, setFavChecked] = useState(false);. Initially,
the checkbox is unchecked/false and this leaves the screen unchanged, but
when the checkbox gets checked, then favChecked turns to true. Then,
similar to how we filtered, the items that aren't in the favProducts list are
filtered out, and only the favProducts or items with the like button true are
displayed.