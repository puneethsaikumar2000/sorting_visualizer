import React, {Component} from 'react'

import './SortingVisualizer.css'

class SortingVisualizer extends Component {
    constructor() {
        super();
        this.state = {
            array: []
        }
    }

    resetArray(){
        let newArray = []
        for (let i = 0; i < 120; i++){
            newArray.push(generateRandomNumber(10, 530));
        }

        this.setState({
            array: newArray,
        })
    }

    componentDidMount() {
        this.resetArray();
    }

    render() {
        const {array} = this.state;
      
        return (
            <div>
                <button onClick={() => this.resetArray()}>Generate Array</button>
                <br></br>
                <br></br>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div 
                        className="array-bar" 
                        key={idx}
                        style={{height: `${value}px`}}></div>
                    ))}
                </div>
            </div>
        )
    }
}


function generateRandomNumber(a, b){
    return Math.floor((Math.random() * (b - a)) + a)
}

export default SortingVisualizer
