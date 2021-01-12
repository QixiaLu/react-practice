import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import { DISHES } from '../shared/Dishes';
import { Component } from 'react';

class Main extends Component {
  constructor(props){
    super(props);
    this.state= {
      dishes: DISHES,
      selectedDish: null
    };
  }

onDishSelect(dishId){
    this.setState( {selectedDish: dishId} );
}

render(){
  return (
    <div>
     <Navbar dark color="primary">
       <div className="container">
          <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
        </div>
    </Navbar>
    {/* onclick is used to pass onDishSelect to menu componenet */}
    <Menu dishes={this.state.dishes} 
        onClick={(dishId) => this.onDishSelect(dishId)}/>
    
    {/* filter can create a new array */}
    {/* To pass the selected dish info to dishdetail by using id */}
    <DishDetail dish = {this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>
    </div>
    )
  }
} 

export default Main;
