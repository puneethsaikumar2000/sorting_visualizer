export function getBubbleSortAnimations(array){
    const animations = [];

    let swapped = 1;
    let times = 0;
    while(swapped !== 0){
        swapped = 0;
        for (let i = 0; i < array.length - 1 - times; i++){
            if (array[i] > array[i + 1]){
                var temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped += 1;
                animations.push([i, i + 1, "red"]);
                // animations.push([i, i + 1]);
                animations.push([[i, array[i]], [i + 1, array[i + 1]]]);
            }
            else {
                animations.push([i, i + 1, "green"]);
                // animations.push([i, i + 1]);
                animations.push([[i, array[i]], [i + 1, array[i + 1]]]);
            }
            animations.push([i, i + 1, "turquoise"]);
        }
        times += 1;
    }

    return {animations: animations, sortedArray: array};
}