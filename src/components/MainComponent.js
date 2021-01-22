import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';
import { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';

// to make the state availible to main components
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())}
})

class Main extends Component {

  constructor(props){
    super(props);
  }

componentDidMount(){
  this.props.fetchDishes();
}

onDishSelect(dishId){
    this.setState( {selectedDish: dishId} );
}

render(){

  const HomePage = () =>{
    return(
      // need to change state into props
      <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
    );
  }

  const DishWithId = ({match}) => {
    return (
      <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]} 
        isLoading = {this.props.dishes.isLoading}
        errMess = {this.props.dishes.errMess} 
        comments = {this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
        addComment = {this.props.addComment}
      />
    );
  }

  return (
    <div>
    <Header />
    <Switch>
      <Route path = '/home' component ={HomePage} />
      <Route path = '/aboutus' component = {() => <About leaders ={this.props.leaders} />} />
      {/* exact will use to referto the exat menu page isntead of the following two */}
      <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes}/>} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));