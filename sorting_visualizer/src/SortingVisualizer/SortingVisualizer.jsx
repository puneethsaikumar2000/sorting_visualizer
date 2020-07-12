import React, {Component} from 'react'

import './SortingVisualizer.css'
import {getMergeSortAnimations} from './../SortingAlgorithms/SortingAlgorithms.js'

// animation speed
const  ANIMATION_SPEED_MS = 5;

// number of values in array
const NUMBER_OF_ARRAY_BARS = 120;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: []
        }
    }

    resetArray(){
        let newArray = []
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++){
            newArray.push(generateRandomNumber(10, 530));
        }
        console.log("newArray: ", newArray);
        this.setState({
            array: newArray,
        })
    }

    componentDidMount() {
        this.resetArray();
    }

    mergeSort(){
        const {animations, sortedArray} = getMergeSortAnimations(this.state.array);
        const javaScriptSortedArray = this.state.array.slice().sort((a, b) => a - b);
        console.log(areArraysEqual(sortedArray, javaScriptSortedArray));
        // for(let i = 0; i < animations.length; i++){
        //     // console.log("i: ", i, animations[i]);
        //     const arrayBars = document.getElementsByClassName('array-bar');
        //     const isColorChange = i % 3 !== 2;
        //     if (isColorChange){
        //         const [barOneInd, barTwoInd] = animations[i];
        //         // console.log(barOneInd, barTwoInd, animations[i]);
        //         const barOneStyle = arrayBars[barOneInd].style;
        //         const barTwoStyle = arrayBars[barTwoInd].style;
        //         const color = i % 3 === 0? SECONDARY_COLOR : PRIMARY_COLOR;
        //         setTimeout(() => {
        //             barOneStyle.backgroundColor = color;
        //             barTwoStyle.backgroundColor = color;
        //         }, i * ANIMATION_SPEED_MS)
        //     }
        //     else {
        //         setTimeout(() => {
        //             const [barOneInd, barHeight] = animations[i];
        //             const barOneStyle = arrayBars[barOneInd].style;
        //             barOneStyle.height = `${barHeight}px`;
        //         }, i * ANIMATION_SPEED_MS)
        //     }
        // }
    }

    render() {
        const {array} = this.state;
      
        return (
            <div>
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <br></br>
                <br></br>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div className="array-bar" 
                             key={idx}
                             style={{height: `${value}px`}}>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}


function generateRandomNumber(a, b){
    return Math.floor((Math.random() * (b - a)) + a)
}

function areArraysEqual(array1, array2){
    console.log(array1, array2);
    if (array1.length !== array2.length) return false;
    for (let i = 0; i < array2.length; i++){
        if (array1[i] !== array2[i]){
            console.log(i);
            return false;
        }
    }
    return true;
}

// export default SortingVisualizer;
