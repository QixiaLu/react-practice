import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';
import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchPromos, fetchComments, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())},
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message))
})

class Main extends Component {

  constructor(props){
    super(props);
  }

  // to fetch from server
componentDidMount(){
  this.props.fetchDishes();
  this.props.fetchComments();
  this.props.fetchPromos();
  this.props.fetchLeaders();
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
              dishErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leadersLoading = {this.props.leaders.isLoading}
              leadersErrMess = {this.props.leaders.errMess}
        />
    );
  }

  const DishWithId = ({match}) => {
    return (
      <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]} 
        isLoading = {this.props.dishes.isLoading}
        errMess = {this.props.dishes.errMess} 
        comments = {this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
        commentsErrMess = {this.props.comments.errMess} 
        postComment = {this.props.postComment}
      />
    );
  }

  return (
    <div>
    <Header />
    <TransitionGroup>
      <CSSTransition key = {this.props.location.key} classNames = "page" timeout={300}>
        <Switch>
          <Route path = '/home' component ={HomePage} />
          <Route path = '/aboutus' component = {() => <About leaders ={this.props.leaders} leaderLoading={this.props.leaders.isLoading}
                      leaderErrMess={this.props.leaders.errMess} />} />
          {/* exact will use to referto the exat menu page isntead of the following two */}
          <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes}/>} />
          {/* the use of :dishId*/}
          <Route path = "/menu/:dishId" component={DishWithId}></Route>
          <Route exact path="/contactus" component ={() => (<Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm} />)}/>
          <Redirect to="/home" />
        </Switch>
        {/* onclick is used to pass onDishSelect to menu componenet */}
            {/* <Menu dishes={this.state.dishes} 
                onClick={(dishId) => this.onDishSelect(dishId)}/>
            */}
        {/* filter can create a new array */}
        {/* To pass the whole dish info to dishdetail by using id */}
            {/* <DishDetail dish = {this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/> */}
      </CSSTransition>
    </TransitionGroup>
    <Footer />
    </div>
    )
  }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));