export function getMergeSortAnimations(array){
    const animations = [];
    
    if (array.length <= 1) return array;
    
    const auxiliaryArray = array.slice();

    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    
    return {animations : animations, sortedArray: array};
}


function mergeSortHelper(
    mainArray,
    startInd,
    endInd,
    auxiliaryArray,
    animations
){
    if (startInd === endInd) return;
    let middleInd = Math.floor((startInd + endInd) / 2);

    // auxiliary array has half sorted arrays i.e. from start to mid and mid + 1 to end.
    // For auxiliary to have half sorted arrays, I need to send it as mainarray in Recursion.
    mergeSortHelper(auxiliaryArray, startInd, middleInd, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleInd + 1, endInd, mainArray, animations);
    
    doMerge(mainArray, startInd, middleInd, endInd, auxiliaryArray, animations);
    
}


function doMerge(
    mainArray,
    startInd,
    middleInd,
    endInd,
    auxiliaryArray,
    animations
){
    let i = startInd;
    let j = middleInd + 1;
    let k = startInd;
    while (i <= middleInd && j <= endInd){
        // comparing indices i and j for changing
        animations.push([i, j]);
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]){
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k] = auxiliaryArray[i];
            k++;
            i++;
        }
        else{
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k] = auxiliaryArray[j];
            k++;
            j++;
        }
    }

    while (i <= middleInd){
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k] = auxiliaryArray[i];
        k++;
        i++;
    }

    while (j <= endInd){
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k] = auxiliaryArray[j];
        k++;
        j++;
    }
}