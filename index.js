import {menuArray} from "/data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

let nameForm = document.getElementById("nameForm")
let cardForm = document.getElementById("cardForm")
let cvvForm = document.getElementById("cvvForm")
const payForm = document.getElementById("pay-form")

let orders = []

document.addEventListener("click", function(e) {
    if(e.target.dataset.add) {
        document.getElementById("order-title").style.display = "block"
        document.getElementById("total-price").style.display = "flex"
        document.getElementById("order-btn").style.display = "block"
        addFood(e.target.dataset.add)
    }
    else if(e.target.dataset.remove) {
        removeFood(e.target.dataset.remove)
        if(orders.length===0) {
            document.getElementById("order-title").style.display = "none"
            document.getElementById("total-price").style.display = "none"
            document.getElementById("order-btn").style.display = "none"
        }
    }
    else if(e.target.id === "order-btn") {
        document.getElementById("form-container").style.display = "block"
        document.getElementById("pay-btn").style.display = "block"
        document.getElementById("container").style.background = "#F5F5F5"
    }
    else if(e.target.id === "pay-btn") {
        if(nameForm.value && cardForm.value && cvvForm.value) {
            document.getElementById("form-container").style.display = "none"
            document.getElementById("pay-btn").style.display = "none"
            document.getElementById("container").style.background = "white"
            thanksMsg()
        }
        
    }
})
document.getElementById("pay-form").addEventListener("submit", function(e) {
    e.preventDefault()
})
function addFood(idf) {
    let foodHtml = ""
    const foodToAdd = menuArray.filter(function(food) {
        return food.id == idf
    })[0]
   
    orders.push({
        name: foodToAdd.name,
        ingredients: foodToAdd.ingredients,
        price: foodToAdd.price,
        emoji: foodToAdd.emoji,
        id: foodToAdd.emoji,
        uuid: uuidv4()
    })
    
    for(let order of orders) {
        foodHtml += `
                <div class="order-info" id="${order.uuid}">
                    <p class="name">${order.name}</p>
                    <p class="remove-text" data-remove="${order.uuid}">remove</p>
                    <p class="price">$${order.price}</p>
                </div>
    `
    }
    
    checkPrice()
    document.getElementById("order-section").innerHTML = foodHtml
    
}

function removeFood(uid) {

    orders = orders.filter(function(order) {
        return order.uuid != uid
    })
    document.getElementById(uid).style.display = "none"
    checkPrice()
    
}

function thanksMsg() {
    const infoForm = new FormData(payForm)
    const name = infoForm.get("name")

    document.getElementById("userMesage").innerHTML = 
    `<div class="message">Thanks, ${name}! Your order is on its way!</div>`
}

function checkPrice() {
    let suma=0
    for(let order of orders) {
        suma += order.price
    }
    
    document.getElementById("price").textContent = `$${suma}`
    
}

function getFoodHtml() {
    let foodHtml = ""
    
    for(let food of menuArray) {
        foodHtml +=`       
                <div class="food">
                    <p class="emoji">${food.emoji}</p>
                    <div class="information">
                        <p class="name">${food.name}</p>
                        <p class="ingredients">${food.ingredients}</p>
                        <p class="price">$${food.price}</p>
                    </div>
                    <div class="add-container">
                        <p class="add" data-add="${food.id}">+</p>
                    </div>
                </div>
                `
    }

    return foodHtml
}


function render() {
    document.getElementById("food-section").innerHTML = getFoodHtml()
    
}

render()