import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardTitle, CardBody } from 'reactstrap';


class Menu extends Component {
   
    constructor(props){
        super(props);
        this.state={

        }
    }

    // render is needed in every component to lay out in the view. It needs to return something.
    render(){
        const menu = this.props.dishes.map((dish) => {
            return (
                <div className={"col-12 col-md-5 m-1"}>
                    <Card key={dish.id} 
                    onClick={() => this.props.onClick(dish.id)}>
                        <CardImg width="100%" src={dish.image} alt = {dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        
        return(
            <div className="container">
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }
}


// Every components needs to export this one, in order to be used by other class
export default Menu;
