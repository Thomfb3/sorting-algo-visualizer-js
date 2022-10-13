// Main Variables
let LOWER = 5;
// Global Variables
let UPPER = 1000;
let NUM_OF_BARS = 50;
let BAR_WIDTH = 5;
let UNSORTED_ARRAY = new Array(NUM_OF_BARS);
let sortDelay = 75;
let finalColorDelay = 30;

// Element Variables
let arrayContainer = document.getElementById("array-container");
let randomizeArrayBtn = document.getElementById("randomize-array-btn")
let bubbleSortArrayBtn = document.getElementById("bubble-sort-array-btn")
let mergeSortArrayBtn = document.getElementById("merge-sort-array-btn")

let sortedColor = "rgba(52, 216, 181, 0.6)";
let unsortedColor = "rgba(52, 216, 181, 0.3)";
let sortingColor = "tomato";
let finalColor = "rgba(52, 216, 181, 1)";

// Create Random Unsorted Array
const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateRandomArray = (array, numOfBars, lower, upper) => {
    for (let i = 0; i < numOfBars; i++) {
        array[i] = randomIntFromInterval(lower, upper);
    }
};

// Create UI from Random Array
const createBar = (value, barWidth) => {
    return `
        <div
            class='array-bar'
            style='height: ${value}px; width: ${barWidth}px'
        >
            <span class='array-bar-tooltip'>${value}</span>
        </div>
    `
};

const renderBars = (array, arrayContainer, barWidth) => {
    for (const value of array) {
        arrayContainer.innerHTML += createBar(value, barWidth);
    }
};

///// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    generateRandomArray(UNSORTED_ARRAY, NUM_OF_BARS, LOWER, UPPER);
    renderBars(UNSORTED_ARRAY, arrayContainer, BAR_WIDTH)
});

randomizeArrayBtn.addEventListener("click", () => {
    generateRandomArray(UNSORTED_ARRAY, NUM_OF_BARS, LOWER, UPPER);
    arrayContainer.innerHTML = "";
    renderBars(UNSORTED_ARRAY, arrayContainer, BAR_WIDTH)
});

bubbleSortArrayBtn.addEventListener("click", () => {
    bubbleSort(UNSORTED_ARRAY)
}, { once : true });

mergeSortArrayBtn.addEventListener("click", () => {
    mergeSort(UNSORTED_ARRAY)
}, { once : true });


const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};


////// Sorting UI 
const sortingUIRendering = async (bars, array, i) => {
    bars[i].style.height = array[i] + "px" ;
    bars[i].style.backgroundColor = sortingColor;
    bars[i].firstElementChild.innerText = array[i];

    bars[i + 1].style.height = array[i + 1] + "px" ;
    bars[i + 1].style.backgroundColor = sortingColor;
    bars[i + 1].firstElementChild.innerText = array[i + 1];

    await sleep(sortDelay);
    bars[i].style.backgroundColor = unsortedColor;
    bars[i + 1].style.backgroundColor = unsortedColor;
}

const isSortedUIRendering = (bars, array, counter) => {
    bars[array.length - counter].style.backgroundColor = sortedColor;
}

const allSortedUIRendering = async (bars) => {
    for (const el of bars) {
        el.style.backgroundColor = finalColor;
        await sleep(finalColorDelay);
    }
}



///// Sorting

// Bubble Sort
const bubbleSort = async (array) => {
    let bars = document.getElementsByClassName("array-bar")
    let sorted = false;
    let counter = 0;

    while (!sorted) {
        sorted = true;
        for (let i = 0; i < array.length - 1 - counter; i++) {
            if (array[i] > array[i + 1]) {
                swap(i, i + 1, array);
                sorted = false;
                await sortingUIRendering(bars, array, i);
            };
        };
        counter++;
        isSortedUIRendering(bars, array, counter);
        await sleep(sortDelay);
    };
    await allSortedUIRendering(bars)
}

const swap = (i, j, array) => {
    const temp = array[j];
    array[j] = array[i];
    array[i] = temp;
}



// Merge Sort
const mergeSort = (array) => {
    
    if (array.length <= 1) return array;

    const middleIdx = Math.floor(array.length / 2);
    const leftHalf = array.slice(0, middleIdx);
    const rightHalf = array.slice(middleIdx);
    return mergeSortedArrays(mergeSort(leftHalf), mergeSort(rightHalf));
}

const mergeSortedArrays = (leftHalf, rightHalf) => {
    let bars = document.getElementsByClassName("array-bar");

    const sortedArray = new Array(leftHalf.length + rightHalf.length);
    let k = 0;
    let i = 0;
    let j = 0;

    while (i < leftHalf.length && j < rightHalf.length) {
        if (leftHalf[i] <= rightHalf[j]) {
            sortedArray[k++] = leftHalf[i++];
        } else {
            sortedArray[k++] = rightHalf[j++];
        }
    }
    while (i < leftHalf.length) {
        sortedArray[k++] = leftHalf[i++];
    }
    while (j < rightHalf.length) {
        sortedArray[k++] = rightHalf[j++];
    }
    return sortedArray;
}