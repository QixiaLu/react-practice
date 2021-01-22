import React, {Component} from 'react';
import { Card, CardImg, CardText, CardTitle, CardBody, Breadcrumb, BreadcrumbItem, 
    Button, ModalBody, ModalHeader, Modal, Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val;
const maxLength = (len) => (val) => !(val) || (val.length<=len);
const minLength = (len) => (val) => (val) && (val.length > len);

    class CommentForm extends Component {
        constructor(props){
            super(props);

            this.state = {
                isModalOpen: false
            };

            this.handleSubmit=this.handleSubmit.bind(this);
            this.toggleModal=this.toggleModal.bind(this);
        }

        handleSubmit(values) {
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
        }

        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        render () {
            return(
                <div>
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg"></span> Submit Comment
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={12}>Rating</Label>
                                    <Col md={{size: 3}}>
                                        <Control.select model=".rating" id="rating" name="rating"
                                            className="form-control" >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author" md={12}>Your Name</Label>
                                    <Col md={10}>
                                        <Control.text model=".author" id="author" name="author"
                                            placeholder="Your Name" className="form-control" 
                                            validators = {{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }} />
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment" md={12}>Comment</Label>
                                    <Col md={10}>
                                        <Control.textarea model=".comment" id="comment" name="comment"
                                            rows="6"
                                            className="form-control" />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size:10}}>
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
                                    </Col>

                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
    }

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

    function RenderComments ({comments, addComment, dishId}) {
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
                    <CommentForm dishId={dishId} addComment = {addComment}/>
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
                    <Breadcrumb>
                        <BreadcrumbItem> <Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        {/* a break */}
                        <hr />
                    </div>
                </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className = "row col-12 col-md-5 m-1">
                            <RenderComments comments={props.comments} 
                                addComment = {props.addComment}
                                dishId = {props.dish.id} />
                        </div>
                    </div>
                </div>
            );
        }else{
            return <div></div>
        }
    }



export default DishDetail;