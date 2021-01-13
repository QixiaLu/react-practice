import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

    // one way of writing function, dish and onClick are coming from porps
    function RenderMenuItem ({dish, onClick}){
        return(
            // <Card onClick={() => onClick(dish.id)}>
            <Card>
                        <CardImg width="100%" src={dish.image} alt = {dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
            </Card>
        );
    }
   
    // another way of writing function
    const Menu = (props) => {
        const menu = props.dishes.map((dish) => {
            return (
                <div className="col-12 col-md-5 m-1" key = {dish.id}>
                    <RenderMenuItem dish={dish} onClick={props.onClick} />
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


// Every components needs to export this one, in order to be used by other class
export default Menu;
