import React from 'react';
import { Card, CardImg, CardText, CardTitle, CardBody } from 'reactstrap';

    function RenderDish({ dish }) {
        if(dish!=null){
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt = {dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                       <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }else{
            return(
                <div></div>
            );
        }
    }

    function RenderComments ({comments}) {
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


    const DishDetail = (props) => {
        const dish = props.dish;
        // const c = [dish.comments];
        // Add this to prevent null pointer
        if (dish) {
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className = "row col-12 col-md-5 m-1">
                            <RenderComments comments={props.dish.comments} />
                        </div>
                    </div>
                </div>
            );
        }else{
            return <div></div>
        }
    }



export default DishDetail;