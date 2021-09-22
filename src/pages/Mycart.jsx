import React, { Component } from 'react'
import { products } from "../database/products"
export default class Mycart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mycart: [],
            total:0
        }
    }
    componentDidMount = async () => {
        const mycarts = products
        const mycart = []
        mycarts.forEach((cart) => {
            cart["amount"] = 100
            cart["quantity"] = 1
            mycart.push(cart)
        })
        const total = this.totalAmount(mycart)
        this.setState({ mycart,total })
    }
    decrement = (e, id) => {
        const { mycart } = this.state
        const selectedCartIndex = mycart.findIndex((cart) => cart.id === id)
        const selectedCart = mycart[selectedCartIndex]
        const myquantity = selectedCart.quantity - 1
        if (myquantity !== 0) {
            selectedCart["quantity"] = myquantity
            mycart[selectedCartIndex] = selectedCart
            const total = this.totalAmount(mycart)
            this.setState({ mycart,total })
        }

    }
    increment = (e, id) => {
        const { mycart } = this.state
        const selectedCartIndex = mycart.findIndex((cart) => cart.id === id)
        const selectedCart = mycart[selectedCartIndex]
        const myquantity = selectedCart.quantity + 1
        selectedCart["quantity"] = myquantity
        mycart[selectedCartIndex] = selectedCart
        const total = this.totalAmount(mycart)
        this.setState({ mycart,total })
    }
    totalAmount = (cart) => {
        const total = cart.reduce((a, b) => {
            return a + b["amount"] * b["quantity"]
        }, 0)
        return total
    }
    render() {
        const { mycart,total } = this.state
        return (
            <div className='container'>
                <h3>My Carts</h3>
                <div className="row mt-5">
                    <div className="col-md-6" style={{height:"558px",overflowY:"scroll"}}>
                        {
                            mycart.length !== 0 ? mycart.map((cart, index) => (
                                <div className="card mb-3" style={{ maxWidth: 540 }} key={index}>
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img src={cart.image} className="img-fluid rounded-start" alt={cart.title} />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{cart.title}</h5>
                                                <p>₹ {cart.amount}</p>
                                                <label className="form-label">Quantity</label>
                                                <input className='form-control mb-3' type="text" value={cart.quantity} readOnly />
                                                <button className='btn btn-info' style={{ marginRight: "5px" }} onClick={(e) => this.decrement(e, cart.id)} >-</button>
                                                <button className='btn btn-info' onClick={(e) => this.increment(e, cart.id)} >+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : <div>Loading....</div>
                        }
                    </div>
                    <div className="col-md-6">
                        <div className="card mb-3" style={{ maxWidth: 540 }} >
                            <div className="row g-0">
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title mb-3">Total ₹ {total} </h5>
                                        <button className='btn btn-info' >Confirm Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
