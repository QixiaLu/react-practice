import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';
import { DISHES } from '../shared/Dishes';
import { COMMENTS } from '../shared/Comments';
import { LEADERS } from '../shared/Leaders';
import { PROMOTIONS } from '../shared/Promotions';
import { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  constructor(props){
    super(props);
    this.state= {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
      selectedDish: null
    };
  }

onDishSelect(dishId){
    this.setState( {selectedDish: dishId} );
}

render(){

  const HomePage = () =>{
    return(
      <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]} 
      promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
      leader={this.state.leaders.filter((leader) => leader.featured)[0]}
      />
    );
  }

  const DishWithId = ({match}) => {
    return (
      <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]} 
        comments = {this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
      />
    );
  }

  return (
    <div>
    <Header />
    <Switch>
      <Route path = '/home' component ={HomePage} />
      <Route path = '/aboutus' component = {() => <About leaders ={this.state.leaders} />} />
      {/* exact will use to referto the exat menu page isntead of the following two */}
      <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes}/>} />
      {/* the use of :dishId*/}
      <Route path = "/menu/:dishId" component={DishWithId}></Route>
      <Route exact path='/contactus' component = {Contact}></Route>
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