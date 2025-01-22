// SORT 

// size est la taille du tableau à trier et max est la valeur maximale des éléments du tableau
let createRandomArray = function(size, max) {
    let data = [];

    for( let i = 0; i < size; i++ ){
        data.push(Math.round(Math.random() * max));
    }

    return data;
}

let sort = function (data) {
    let cost = 0;
    for (let i = 0; i < data.length-1; i++) {
        let imax = i; 
        for(let j = i+1; j < data.length; j++){
            cost++
            if ( data[imax] < data[j]) {
                imax = j;
            }
        }
        let max = data[imax];
        data.splice(imax, 1);
        data.unshift(max);
    }

    return cost;
}

let sortBubble = function (data) {
    let proceed = true;
    let cost = 0;

    while(proceed){
        proceed = false;
        for(let i = 0; i < data.length-1; i++){
            cost++;
            if(data[i] > data[i+1]){
                [data[i], data[i+1]] = [data[i+1], data[i]];
                proceed = true;
            } 
        }
    }

    return cost
}

let sortQuick = function (data) {
    let stack = [];
    stack.push(0);
    stack.push(data.length - 1);

    let cost = 0;

    while (stack.length > 0) {
        let end = stack.pop();
        let start = stack.pop();

        if (start < end) {
            let pivotIndex = partition(data, start, end);
            cost += end - start;
            stack.push(start);
            stack.push(pivotIndex - 1);
            stack.push(pivotIndex + 1);
            stack.push(end);
        }
    }

    return cost;
}

let partition = function (data, start, end) {
    let pivot = data[end];
    let i = start - 1;

    for (let j = start; j < end; j++) {
        if (data[j] <= pivot) {
            i++;
            [data[i], data[j]] = [data[j], data[i]];
        }
    }

    [data[i + 1], data[end]] = [data[end], data[i + 1]];
    return i + 1;
}

let createChartSort = function () {
    let costsNaive = [];
    let costsBubble = [];
    let costsQuick = [];
    let iLabels = [];

    for(let i = 0; i < 1010; i+=10){
        let dataNaive = createRandomArray(i, 10);
        let costNaive = sort(dataNaive);
        costsNaive.push(costNaive);
            
        let dataBubble = createRandomArray(i, 10);
        let costBubble = sortBubble(dataBubble)
        costsBubble.push(costBubble);

        let dataQuick = createRandomArray(i, 10);
        let costQuick = sortQuick(dataQuick)
        costsQuick.push(costQuick);

        iLabels.push(i);
    }

    const ctx = document.getElementById("chart");

    new Chart(ctx, {
        type: 'line',
        data : {
            labels: iLabels,
            datasets: [
            {
                label: 'Naive',
                data: costsNaive,
                fill: false,
                borderColor: 'rgb(255, 0, 0)',
                tension: 0.1
            },
            {
                label: 'Bubble',
                data: costsBubble,
                fill: false,
                borderColor: 'rgb(0, 255, 0)',
                tension: 0.1  
            },
            {
                label: 'Quick',
                data: costsQuick,
                fill: false,
                borderColor: 'rgb(0, 0, 255)',
                tension: 0.1
            }
        ]
        }
    });
}
//createChartSort();

// SEARCH

// nb est le nombre à chercher dans le tableau t
let search = function (nb, t) {
    let cost = 0;

    for(let n of t){
        cost++
        if(n === nb){
            return {cost: cost, found: true};
        }
    }

    return {cost: cost, found: false};;
}

let binarySearch = function (nb, t) {
    let start = 0;
    let end = t.length - 1;
    let cost = 0;

    while (start <= end) {
        let middle = Math.floor((start + end) / 2);
        cost++;
        if (t[middle] === nb) {
            return {cost: cost, found: true};
        } else if (t[middle] < nb) {
            start = middle + 1;
        } else {
            end = middle - 1;
        }
    }

    return {cost: cost, found: false};
}

let createChartSearch = function () {
    let costsNaive = [];
    let costsBinary = [];
    let iLabels = [];

    let s = 1001;

    for(let i = 0; i < 1010; i+=10){
        let dataNaive = createRandomArray(i, 1000);
        let cost = search(s, dataNaive);
        costsNaive.push(cost.cost);

        let dataBinary = createRandomArray(i, 1000);
        dataBinary = binarySearch(s, dataBinary);
        costsBinary.push(dataBinary.cost);

        iLabels.push(i);
    }

    const ctx = document.getElementById("chart");

    new Chart(ctx, {
        type: 'line',
        data : {
            labels: iLabels,
            datasets: [
            {
                label: 'Search Naive',
                data: costsNaive,
                fill: false,
                borderColor: 'rgb(255, 0, 0)',
                tension: 0.1
            },
            {
                label: 'Binary Search',
                data: costsBinary,
                fill: false,
                borderColor: 'rgb(0, 255, 0)',
                tension: 0.1  
            }
        ]
        }
    });
}
createChartSearch();

