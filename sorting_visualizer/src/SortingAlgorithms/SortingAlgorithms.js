// import React, { Component } from 'react';

export function getMergeSortAnimations(array){
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryAray = array.slice();
    mergeSortHelper(0, array.length - 1, array, auxiliaryAray, animations);
    return {animations : animations, sortedArray: array};
}


function mergeSortHelper(
    startInd,
    endInd,
    mainArray,
    auxiliaryAray,
    animations
){
    if (startInd === endInd) return;
    let middleInd = Math.floor((startInd + endInd) / 2);
    mergeSortHelper(startInd, middleInd, mainArray, auxiliaryAray, animations);
    mergeSortHelper(middleInd + 1, endInd, mainArray, auxiliaryAray, animations);
    // doMerge(startInd, middleInd, endInd, mainArray, auxiliaryAray, animations);
    doMerge1(startInd, middleInd, endInd, mainArray, auxiliaryAray, animations);
}

function doMerge1(
    startInd, middleInd, endInd, mainArray, auxiliaryAray, animations
){
    
}




function doMerge(
    startInd,
    middleInd,
    endInd,
    mainArray,
    auxiliaryAray,
    animations
){
    let i = startInd;
    let j = middleInd + 1;
    let k = startInd;
    while (i <= middleInd && j <= endInd){
        // comparing indices i and j
        animations.push([i, j]);
        animations.push([i, j]);
        if (auxiliaryAray[i] <= auxiliaryAray[j]){
            animations.push([k, auxiliaryAray[i]]);
            mainArray[k] = auxiliaryAray[i];
            k++;
            i++;
        }
        else{
            animations.push([k, auxiliaryAray[j]]);
            mainArray[k] = auxiliaryAray[j];
            k++;
            j++;
        }
    }

    while (i <= middleInd){
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxiliaryAray[i]]);
        mainArray[k] = auxiliaryAray[i];
        k++;
        i++;
    }

    while (j <= endInd){
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxiliaryAray[j]]);
        mainArray[k] = auxiliaryAray[j];
        k++;
        j++;
    }
}