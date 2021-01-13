import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import DishDetail from './DishDetailComponent';
import { DISHES } from '../shared/Dishes';
import { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

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

  const HomePage = () =>{
    return(
      <Home />
    );
  }

  return (
    <div>
    <Header />
    <Switch>
      <Route path = '/home' component ={HomePage} />
      <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes}/>} />
      <Redirect to="/home" />
    </Switch>
    {/* onclick is used to pass onDishSelect to menu componenet */}
        {/* <Menu dishes={this.state.dishes} 
            onClick={(dishId) => this.onDishSelect(dishId)}/>
        */}
    {/* filter can create a new array */}
    {/* To pass the whole dish info to dishdetail by using id */}
        {/* <DishDetail dish = {this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/> */}
    <Footer />
    </div>
    )
  }
} 

export default Main;