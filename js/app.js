'use strict'

//Construvtor function to share properties with all store locations
function CookieStore(location, minCustomers, maxCustomers, avgCookie) {
    this.location = location
    this.minCustomers = minCustomers
    this.maxCustomers = maxCustomers
    this.avgCookie = avgCookie

    
}


//Return random num of customers btw(min-max) customers each hour
CookieStore.prototype.getrandomNumOfCustomer = function () {
    return randomNumber(this.minCustomers, this.maxCustomers)
}
//Return avg each hour based on returned value from getrandomNumOfCustomer()*total Avg for each location
CookieStore.prototype.getAvgCookiePerHour = function (randomNumOfCustomer, avgCookie) {
    return Math.floor(randomNumOfCustomer * avgCookie)
}


const parent = document.getElementById('parent')
const table = document.createElement('table')

let avgForAllstores = []
let avgForAllstoresContainer = []
let callFooter = 0
let headerFlag = true

const locationNum = 5 //number of stores in different locations
const Workinghours = 14 //number of working hours
const workHour = [
    '6 am', '7 am', '8 am', '9 am', '10 am',
    '11 am', '12 pm', '1 pm', '2 pm', '3 pm',
    '4 pm', '5 pm', '6 pm', '7 pm']


CookieStore.prototype.getValues = function () {
    //condition to create the table header one time only 
    if (headerFlag) {
        header(parent, table)
        headerFlag = false
    }

    let rand = this.getrandomNumOfCustomer()
    let avgPerHour = 0;
    let total = 0;

    let row = document.createElement('tr')
    table.appendChild(row)
    let location = document.createElement('td')
    table.appendChild(location)
    location.textContent = this.location // print location name on the first td.
  //  location.setAttribute("style", "border:  1px solid; ")
    for (let i = 0; i < Workinghours; i++) {
        rand = this.getrandomNumOfCustomer() // get random num of customers
        avgPerHour = this.getAvgCookiePerHour(rand, this.avgCookie) //calc Avg based on the random num of customers
        /*Calling each row function to print each value on seperate ceil(while looping through all hours)*/
        eachrow(avgPerHour)
        total += avgPerHour//save avg for each hour to get the total per day 
        avgForAllstoresContainer.push(avgPerHour)// this handles all avg hours for all locations and all time 

    }
    avgForAllstoresContainer.push(total)//Adding total as well for each location

    let totalCeil = document.createElement('td')
    table.appendChild(totalCeil)
    totalCeil.textContent = total
    // totalCeil.setAttribute("style", "border:  1px solid;")

    callFooter++;
    //calling table footer (total) once all markets are printed on the table
    if (callFooter == locationNum) {
        callFooter++
        footer(avgForAllstoresContainer)

    }

}

//Random number execution to use when execute getrandomNumOfCustomer() prototype
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}


function header(parent, table) {
    parent.appendChild(table)
    let heading = ''
    heading = document.createElement('th')
    table.appendChild(heading)
    heading.textContent = ''

    for (let i = 0; i < Workinghours; i++) {
        heading = document.createElement('th')
        table.appendChild(heading)
        heading.textContent = workHour[i]
    }

    heading = document.createElement('th')
    table.appendChild(heading)
    heading.textContent = 'Daily location Total'
}

let footerRow = ''
let allTotal = 0
function footer(sum) {

    let total = 0
    let priceCursor = 0

    let row = document.createElement('tr')
    table.appendChild(row)
    footerRow = document.createElement('td')
   // footerRow.setAttribute("style", "border:  1px solid; ")
    table.appendChild(footerRow)
    footerRow.textContent = 'Total'


    for (let i = 0; i < Workinghours; i++) {
        //Calculate all avg for all hours each time  from openinng hour till closing hour
        for (let j = 0; j < locationNum; j++) {

            total = total + sum[priceCursor]
            priceCursor += Workinghours + 1//to jumb to the new raw
        }
        allTotal = allTotal + total

        priceCursor = i + 1 // re init to jumb from (x) element from the previous row to (x) element to the next row

        footerRow = document.createElement('td')
        table.appendChild(footerRow)
        footerRow.textContent = total
        total = 0 // to calculate the total avg for all locations for the next hour

        // footerRow.setAttribute("style", "border:  1px solid; ")
    }
    alltotal(allTotal)// to print total hours for all locations and all hours

}
function alltotal(sumOfAll) {
    footerRow = document.createElement('td')
    table.appendChild(footerRow)
    footerRow.textContent = sumOfAll
    // footerRow.setAttribute("style", "border:  1px solid; ")
}

//this will create ceil for each row after and before (header&footer)
function eachrow(avgPerHour) {
    let ceil = document.createElement('td')
    table.appendChild(ceil)
    ceil.textContent = avgPerHour
    // ceil.setAttribute("style", "border:  1px solid; ")
    
}


const Seattle = new CookieStore('Seattle', 23, 65, 6.3)
const Tokyo = new CookieStore('Tokyo', 3, 24, 1.2)
const Dubai = new CookieStore('Dubai', 38, 3.7, 6.3)
const Paris = new CookieStore('Paris', 20, 38, 2.3)
const Lima = new CookieStore('Lima', 2, 16, 4.6)

Seattle.getValues()
Tokyo.getValues()
Dubai.getValues()
Paris.getValues()
Lima.getValues()
