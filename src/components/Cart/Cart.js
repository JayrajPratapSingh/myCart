import React from 'react'
import { Button, ListGroup, Row, Col, Form,Image } from 'react-bootstrap'
import { CartState } from '../../context/Context'
import { useState, useEffect } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import "./Cart.css"
const Cart = () => {
    const {state:{cart}, dispatch} =   CartState()
    const [total, setTotal] = useState();
    useEffect(()=>{
        setTotal(cart.reduce((accumulator,current)=> accumulator+ Number(current.price)*current.qty, 0))
    }, [cart])

    return (
        <div className='home'>
            <div className='item-container'>
                <ListGroup>
                    {
                        cart.map((item)=>(
                            <ListGroup.Item key ={item.id}>
                                <Row>
                                <Col md={2}>
                                    <Image src ={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={2}>
                                    <span>{item.name}</span>
                                    </Col>
                                    <Col md={2}>
                                    ₹ {item.price}
                                    </Col>
                                    <Col md={2}>
                                    Rating: {item.ratings}
                                    </Col >
                                    <Col md={2}>
                                    <Form.Control as ="select" value = {item.qty} 
                                onChange={(e)=>{
                                    dispatch({type:"CHANGE_CART_QTY",
                                payload:{
                                    id:item.id,
                                    qty:e.target.value
                                }})
                                }}
                                >
                                    {
                                        [...Array(item.inStock).keys()].map((x)=>(
                                           <option key={x+1}>{x+1}</option>
                                        ))
                                    }
                                </Form.Control>
                                    </Col>
                                <Col md={2}>
                                    <Button type = "buton" variant = "light" onClick={()=> dispatch({
                                        type:"REMOVE_FROM_CART",
                                        payload:item
                                    })}>
                                        <AiFillDelete fontSize = "20px" />
                                    </Button>
                                </Col>
                                </Row>
                                
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </div>
            <div className="filters summary">
                <div className="title"> Subtotal ({cart.length}) items</div>
                <div style = {{fontWeight:700, fontSize:20}}>Total:₹ {total}</div>
                <Button type="button" disabled={cart.length === 0} className = "proceed-btn">
                    Proceed to Pay
                </Button>
            </div>
            
        </div>
    )
}

export default Cart
