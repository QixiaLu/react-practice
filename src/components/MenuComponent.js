import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

    // one way of writing function, dish and onClick are coming from porps
    function RenderMenuItem ({dish, onClick}){
        return(
            // <Card onClick={() => onClick(dish.id)}>
            <Card>
                {/* pass information to other component */}
                {/* ``is a back quote, used to be evaluated */}
                <Link to={`/menu/${dish.id}`}>
                        <CardImg width="100%" src={dish.image} alt = {dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                </Link>
            </Card>
        );
    }
   
    // another way of writing function
    const Menu = (props) => {
        const menu = props.dishes.map((dish) => {
            return (
                <div className="col-12 col-md-5 m-1" key = {dish.id}>
                    {/* <RenderMenuItem dish={dish} onClick={props.onClick} /> */}
                    <RenderMenuItem dish={dish} />
                </div>
            );
        });

        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem> 
                            <Link to='/home'>Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Menu
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        {/* a break */}
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    } 


// Every components needs to export this one, in order to be used by other class
export default Menu;
