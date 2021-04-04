
'use strict'
let arrayLoc=[]


let Seattle = {
    location: 'Seattle',
    minCustomers: 23,
    maxCustomers: 65,
    avgCookie: 6.3,
    getValues: function () {
        printResults(this.maxCustomers, this.minCustomers, this.avgCookie)
    }
}


let Tokyo = {
    location: 'Tokyo',
    minCustomers: 3,
    maxCustomers: 24,
    avgCookie: 1.2,
    getValues:  function () {

        printResults(this.maxCustomers, this.minCustomers, this.avgCookie)
  
}
}

let Dubai = {
    location: 'Dubai',
    minCustomers: 11,
    maxCustomers: 38,
    avgCookie: 3.7,
    getValues: function () {

        printResults(this.maxCustomers, this.minCustomers, this.avgCookie)
    },

   
}


let Paris = {
    location: 'Paris',
    minCustomers: 20,
    maxCustomers: 38,
    avgCookie: 2.3,
    getValues: function () {

        printResults(this.maxCustomers, this.minCustomers, this.avgCookie)
    }
}

let Lima = {
    location: 'Lima',
    minCustomers: 2,
    maxCustomers: 16,
    avgCookie: 4.6,
    getValues: function () {

        printResults(this.maxCustomers, this.minCustomers, this.avgCookie)
    }
}




function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function calcAvg(avg, randCustomer) {
    return (avg * randCustomer)
}


function printResults(maxCustomers, minCustomers, avgCookie) {
    let startHour = 6;
    let time = 'am'
    let listItem = []

    let parent = document.getElementById('parent');
    let storeLoc = document.createElement('h3')
    parent.appendChild(storeLoc)

    let locationContainer=locations[loctionCounter]
    storeLoc.textContent = locationContainer
    loctionCounter++

    let ulElement = document.createElement('ul')
    let liElement = ''
    let randCustomer =0
    let avgCookies=0
    parent.appendChild(ulElement);

    let sumOfCookies = 0;
    for (let i = 0; i < 14; i++) {
        if (startHour != 12)
            startHour = startHour % 12
        else {
            time = 'pm'
        }


        randCustomer = randomNumber(maxCustomers, minCustomers)
        avgCookies = calcAvg(avgCookie, randCustomer)

         // pront location name at the top
        listItem[i] = `${startHour}${time}: ${avgCookies} cookies`
        liElement = document.createElement('li')
        ulElement.appendChild(liElement)
        liElement.textContent = listItem[i]
        startHour++;
        sumOfCookies = sumOfCookies + avgCookies
    }
    liElement = document.createElement('li')
    ulElement.appendChild(liElement)
    liElement.textContent = `Total: ${sumOfCookies} cookies`

  
}


//Calling functions from method

let locations =[Seattle.location,Tokyo.location,Dubai.location,Paris.location,Lima.location]

let loctionCounter=0

Seattle.getValues()
Tokyo.getValues()
Dubai.getValues()
Paris.getValues()
Lima.getValues()