import React, {Component} from 'react'

import './SortingVisualizer.css'
import {getMergeSortAnimations} from '../SortingAlgorithms/MergeSortAlgorithm.js'
import {getBubbleSortAnimations} from '../SortingAlgorithms/BubbleSortAlgorithm.js'
import {getHeapSortAnimations} from '../SortingAlgorithms/HeapSortAlgorithm'

// animation speed
const ANIMATION_SPEED_MS = 5;

// number of values in array
const NUMBER_OF_ARRAY_BARS = 100;

const MIN_HEIGHT = 10;
const MAX_HEIGHT = 500; // 530

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const COMPARE_COLOR = 'yellow';

const FINAL_COLOR = 'lightgreen';

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
            newArray.push(generateRandomNumber(MIN_HEIGHT, MAX_HEIGHT));
        }
        // console.log("newArray: ", newArray);
        this.setState({
            array: newArray,
        })
    }

    componentDidMount() {
        this.resetArray();
    }

    heapSort(){
        const {animations, sortedArray} = getHeapSortAnimations(this.state.array);
    }

    bubbleSort(){
        const {animations, sortedArray} = getBubbleSortAnimations(this.state.array);
        const javaScriptSortedArray = this.state.array.slice().sort((a, b) => a - b);
        console.log(areArraysEqual(sortedArray, javaScriptSortedArray));
        console.log(animations.length);
        for(let i = 0; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');

            const isColorChange = i % 3 !== 1;
            if (isColorChange){
                // const [barOneInd, barTwoInd] = animations[i];
                const [barOneInd, barTwoInd, color] = animations[i];
                const barOneStyle = arrayBars[barOneInd].style;
                const barTwoStyle = arrayBars[barTwoInd].style;
                // const SEC_COLOR = barOneStyle.height <= barTwoStyle.height? 'green' : SECONDARY_COLOR;
                
                // const color = i % 3 === 0? SEC_COLOR : PRIMARY_COLOR;

                // console.log(barOneStyle.height <= barTwoStyle.height);
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * 0.5 * ANIMATION_SPEED_MS);
            }
            else{
                setTimeout(() => {
                    const [[barOneInd, barHeight1], [barTwoInd, barHeight2]] = animations[i];
                    const barOneStyle = arrayBars[barOneInd].style;
                    const barTwoStyle = arrayBars[barTwoInd].style;
                    barOneStyle.height = `${barHeight1}px`;
                    barTwoStyle.height = `${barHeight2}px`;
                }, i * 0.5 * ANIMATION_SPEED_MS);
            }
        }
    }

    mergeSort(){
        const {animations, sortedArray} = getMergeSortAnimations(this.state.array);
        const javaScriptSortedArray = this.state.array.slice().sort((a, b) => a - b);
        console.log(areArraysEqual(sortedArray, javaScriptSortedArray));
        
        for(let i = 0; i < animations.length; i++){

            console.log(i, animations.length);
            // Here key acts as index, when accessing an array-bar.
            const arrayBars = document.getElementsByClassName('array-bar');
            // When Comparing we need to change color twice and once for changing value
            const isColorChange = i % 3 !== 2;
            
            if (isColorChange){
                const [barOneInd, barTwoInd] = animations[i];
                const barOneStyle = arrayBars[barOneInd].style;
                const barTwoStyle = arrayBars[barTwoInd].style;
                const color = i % 3 === 0? SECONDARY_COLOR : PRIMARY_COLOR;
                
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                setTimeout(() => {
                    const [barOneInd, barHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneInd].style;
                    barOneStyle.height = `${barHeight}px`;
                }, i * ANIMATION_SPEED_MS)
            }
        }
    }

    // // Didn't Use, Some Bugs are arriving.
    // final_coloring(){
    //     const arrayBars = document.getElementsByClassName('array-bar');
    //     for(let i = 0; i < arrayBars.length; i++){
    //         const barStyle = arrayBars[i].style;
    //         const color = FINAL_COLOR;
    //         setTimeout(() => {
    //             barStyle.backgroundColor = color;
    //         }, 500)
    //     }
    // }

    render() {
        const {array} = this.state;
      
        return (
            <div>
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort(Work In Progess)</button>
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
    // console.log(array1, array2);
    if (array1.length !== array2.length) return false;
    for (let i = 0; i < array2.length; i++){
        if (array1[i] !== array2[i]){
            console.log(i);
            return false;
        }
    }
    return true;
}

function speed(i){
    console.log(i);
    if (i <= 1000) return i;
    else if (i <= 2000) return 1500;
    else return 3000;
}
// export default SortingVisualizer;
