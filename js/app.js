'use strict'

let allElements = []
//Construvtor function to share properties with all store locations
function CookieStore(location, minCustomers, maxCustomers, avgCookie) {
    this.location = location
    this.minCustomers = minCustomers
    this.maxCustomers = maxCustomers
    this.avgCookie = avgCookie
    allElements.push(this)
}

//Return random num of customers btw(min-max) customers each hour
CookieStore.prototype.getrandomNumOfCustomer = function () {
    return randomNumber(this.minCustomers, this.maxCustomers)
}


//Return avg each hour based on returned value from getrandomNumOfCustomer()*total Avg for each location
CookieStore.prototype.getAvgCookiePerHour = function (randomNumOfCustomer, avgCookie) {
    return Math.floor(randomNumOfCustomer * avgCookie)
}

//Random number execution to use when execute getrandomNumOfCustomer() prototype
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}


//Global variables
const parent = document.getElementById('parent')
const table = document.createElement('table')
let avgForAllstoresContainer = []
let numOfLocations = 5 //number of initial stores in different locations
const Workinghours = 14 //number of working hours per day
const workHour = [ // Time from 6am-7pm
'6 am', '7 am', '8 am', '9 am', '10 am',
'11 am', '12 pm', '1 pm', '2 pm', '3 pm',
'4 pm', '5 pm', '6 pm', '7 pm']

CookieStore.prototype.getValues = function () {
    
    let rand,avgPerHour,total = 0

    let row = document.createElement('tr') 
    table.appendChild(row)
    let location = document.createElement('td')
    table.appendChild(location)
    location.textContent = this.location // print location name on the first td.


    for (let i = 0; i < Workinghours; i++) {
        rand = this.getrandomNumOfCustomer() // get random num of customers
        avgPerHour = this.getAvgCookiePerHour(rand, this.avgCookie) //calc Avg based on the random num of customers
        /*Calling each row function to print each value on seperate ceil(while looping through all hours)*/
        eachrow(avgPerHour)
        total += avgPerHour//save avg for each hour to get the total per day 
        avgForAllstoresContainer.push(avgPerHour)// this handles all avg hours for all locations and all time 
    }

    eachrow(total)
    avgForAllstoresContainer.push(total)//Adding total as well for each location
}



//Header of table
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

//VAriables for footer and total values
let footerRow = '' 

function footer(sum) {

  
let allTotal =0
let total =0 
let priceCursor = 0

    let row = document.createElement('tr')
    table.appendChild(row)

    footerRow = document.createElement('td')
    table.appendChild(footerRow)
    footerRow.textContent = 'Total'

    for (let i = 0; i < Workinghours; i++) {
        //Calculate all avg for all hours each time  from openinng hour till closing hour
        for (let j = 0; j < numOfLocations; j++) {

            total = total + sum[priceCursor]
            priceCursor += Workinghours + 1//to jumb to the new raw
        }
        allTotal = allTotal + total

        priceCursor = i + 1 // re init to jumb from (x) element from the previous row to (x) element to the next row

        footerRow = document.createElement('td')
        table.appendChild(footerRow)
        footerRow.textContent = total // total for each location daily. (hortizantal)
        total = 0 // to calculate the total avg for all locations for the next hour

    }

    alltotal(allTotal)// to print total hours for all locations and all hours

}
function alltotal(sumOfAll) {
    footerRow = document.createElement('td')
    table.appendChild(footerRow)
    footerRow.textContent = sumOfAll
}

//this will create ceil for each row after and before (header:beffore&footer:After)
function eachrow(avgPerHour) {
    let ceil = document.createElement('td')
    table.appendChild(ceil)
    ceil.textContent = avgPerHour
}

//Static Data
const Seattle = new CookieStore('Seattle', 3, 5, 1)
const Tokyo = new CookieStore('Tokyo', 3, 24, 1.2)
const Dubai = new CookieStore('Dubai', 11, 38, 3.7)
const Paris = new CookieStore('Paris', 20, 38, 2.3)
const Lima = new CookieStore('Lima', 2, 16, 4.6)

let rePrint = allElements.length
header(parent, table)
for (let i = 0; i < rePrint; i++) {
    allElements[i].getValues()
}
footer(avgForAllstoresContainer)

let newelement=document.getElementById('newelement')

newelement.addEventListener('submit', newstore)

function newstore(event) {
    table.textContent = ''
    event.preventDefault()
    numOfLocations++
    let location = event.target.Location.value
    let minCustomer = parseInt(event.target.minCustomers.value)
    let maxCustomer = parseInt(event.target.maxCustomers.value)
    let avgCookies = parseFloat(event.target.avgCookie.value)

    const amman=new CookieStore(location,minCustomer,maxCustomer,avgCookies)


    rePrint=allElements.length
    avgForAllstoresContainer=[]
   header(parent,table)
    for (let i = 0; i < rePrint; i++) {
        allElements[i].getValues()

    }

    footer(avgForAllstoresContainer)

}
