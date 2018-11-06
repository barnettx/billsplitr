import React, { Component } from 'react';

import './receipt.css'

export default class ReceiptScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            entry: {
                itemName: '',
                price: 0
            },
            items: [],
        }
    }

    componentDidMount() {
        //take from local storage
        if (localStorage.hasOwnProperty('items')) {

            let value = localStorage.getItem('items');
            try {
                value = JSON.parse(value);
                this.setState({ items: value });
            } catch (e) {
            }
        } else {
            console.log('no go')
        }

        window.addEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        )
    }

    componentWillUnmount() {
        window.removeEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );

        this.saveStateToLocalStorage();
    }

    saveStateToLocalStorage() {
        console.log('saving')
        localStorage.setItem('items', JSON.stringify(this.state.items));
    }
    render() {
        return (
            <div className="container">
                {          
                    this.state.items.map((item, index) => {
                        return (
                            <div className="item">
                                <label><input type="text"
                                    value={item.itemName}
                                    onChange={(e) => {
                                        let newItems = this.state.items.slice()
                                        newItems[index] = { ...newItems[index], itemName: e.target.value }
                                        this.setState({
                                            items: newItems
                                        })
                                    }} /></label>

                                <label><input type="number" step="0.1"
                                    value={item.price}
                                    onChange={(e) => {
                                        let newItems = this.state.items.slice()
                                        newItems[index] = { ...newItems[index], price: parseFloat(e.target.value) }
                                        this.setState({
                                            items: newItems

                                        })
                                    }} /></label>

                                <button onClick={() => {

                                    let newItems = [...this.state.items]
                                    newItems.splice(index, 1)
                                    this.setState({
                                        items: newItems
                                    })
                                }}>X</button>
                            </div>
                        )
                    })
                }

                <p style={{ fontSize: '10px' }}>{JSON.stringify(this.state)}</p>
                <button id="gradientButton">TEST</button>

                <div className="footer">

                    <h2>Total: ${
                        this.state.items.reduce((acc, curr) => {
                            return acc + curr.price || 0
                        }, 0)
                    }</h2>


                    <hr />

                    <div style={{ display: 'flex' }}>
                        <div className="itemInput">
                            <label htmlFor="amount">Item</label>
                            <div>
                                <input type="text"
                                    value={this.state.entry.itemName}
                                    onChange={(e) => {
                                        this.setState({
                                            entry: {
                                                ...this.state.entry,
                                                itemName: e.target.value,
                                            }
                                        })
                                    }} />
                            </div>
                        </div>

                        <div className="priceInput">
                            <label htmlFor="price">Price</label>
                            <div>
                                <span className="currency">$</span>
                                <input type="number" step="0.1"
                                value={this.state.entry.price}
                                onChange={(e) => {
                                    this.setState({
                                        entry: {
                                            ...this.state.entry,
                                            price: parseFloat(e.target.value)
                                        }
                                    })
                                }} />                            </div>
                        </div>

                        <button onClick={() => {
                            this.setState({

                                items: [...this.state.items, {
                                    itemName: this.state.entry.itemName,
                                    price: this.state.entry.price
                                }],
                                entry: {
                                    itemName: '',
                                    price: 0
                                }

                            })
                        }}>+</button>
                    </div>

                </div>


            </div >
        )
    }
}
