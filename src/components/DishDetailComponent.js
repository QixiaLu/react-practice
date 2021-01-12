import React, { Component } from 'react';
import { Card, CardImg, CardText, CardTitle, CardBody } from 'reactstrap';

class DishDetail extends Component{

    constructor(props){
        super(props);
        this.state={

        }
    }

    renderDishDetail(dish){
        if(dish!=null){
            return(
                <Card key={dish.id}>
                    <CardImg width="100%" src={dish.image} alt = {dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                       <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        }else{
            return(
                <div></div>
            )
        }
    }

    renderComents(comments){
        if(comments!=null){
            const c = comments.map(comment => {
                return (
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author} ,
                        &nbsp;
                        {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit',
                        }).format(new Date(comment.date))}</p>
                    </li>
                )
            })
            return (
                <div>
                    <h4>Comments</h4>
                    <ul className='list-unstyled'>
                        {c}    
                    </ul>
                </div>
            )
        }else{
            return(
            <div></div>
            )
        }
    }


    render(){
        const dish = this.props.dish;
        // const c = [dish.comments];
        // Add this to prevent null pointer
        if (dish == null) {
            return <div></div>
        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDishDetail(dish)}
                    </div>
                    <div className = "row col-12 col-md-5 m-1">
                        {this.renderComents(dish.comments)}
                    </div>
                </div>
            </div>
        );
    }
}


export default DishDetail;