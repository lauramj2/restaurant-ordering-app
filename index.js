import { menuArray } from "./data.js"



const menu = document.getElementById("menu")
const orderSummary = document.getElementById("orderSummary")
const priceSummary = document.getElementById("totalPriceSection")
const orderBtnDiv = document.getElementById("orderBtnDiv")
const orderBtn = document.getElementById("order-btn")
const payBtn = document.getElementById("pay-btn")
const paymentModal = document.getElementById("payment-modal")
const thankYouModal = document.getElementById("thank-you-modal")

let cart = []
let totalPrice = 0


document.addEventListener("click", function(e){
    if (e.target.dataset.add){
        addToOrder(e.target.dataset.add)
        orderSummary.classList.remove("displayNone")
        // thankYouModal.classList.remove("thankYouShow")
        thankYouModal.style.display="none"
        if (orderBtn.classList.contains("displayNone")){
            orderBtn.classList.remove("displayNone")
        }
    }
    else if (e.target.dataset.remove){
        removeFromOrder(e.target.dataset.remove)
    }
    else if (e.target.id === "order-btn"){
        orderBtn.addEventListener("click", function(){
            if (cart.length > 0) {
                paymentModal.style.display="flex"
                paymentModal.classList.add("paymentShow")
            }
        })
    }
    else if (e.target.id === "pay-btn"){
        e.preventDefault()
        clearCart()
        submitPayment()
        renderThankYou()
        document.getElementById("payment-form").reset()
    }
})

function submitPayment(){
    orderSummary.classList.add("displayNone")
    orderBtn.classList.add("displayNone")
    priceSummary.classList.add("displayNone")
    paymentModal.style.display = "none"
}

function clearCart(){
    cart.length = 0
    totalPrice = 0
    renderPriceSection()
    renderOrderSection()
}

function renderThankYou() {
    thankYouModal.style.display="flex"
    thankYouModal.classList.add("thankYouShow")

    const orderName = document.getElementById("orderName")

    const thankYouName = orderName.value
    thankYouModal.innerHTML = `Thanks, ${thankYouName}! Your order is on its way!`
}

function addToOrder(itemId){
    const targetMenuObj = menuArray.filter(function(item) {
        return item.id === itemId
    })[0]
    // if (!cart.includes(targetMenuObj)) {
    //     cart.push(targetMenuObj)
    //     renderOrderSection()
    // }
    cart.push(targetMenuObj)
    totalPrice += targetMenuObj.price
    renderOrderSection()
    renderPriceSection()
}

function removeFromOrder(itemId){
    const targetMenuObj = menuArray.find(obj => obj.id === itemId)

    if (cart.includes(targetMenuObj)) {
        const index = cart.indexOf(targetMenuObj)
        cart.splice(index, 1)

        totalPrice -= targetMenuObj.price
        renderOrderSection()
        renderPriceSection()
    }
}

function getPriceHtml() {
    let priceHtml = ""
    priceHtml += `<div>$${totalPrice}</div>`
    return priceHtml
}

function getOrderHtml(){
    let orderHtml = ""
    cart.map(function(cartItem) {
        const {name, price, id} = cartItem
        orderHtml +=  `<div class="orderItemInner">
                            <p class="orderItemName">${cartItem.name}</p>
                            <button class="itemRemoveBtn" data-remove="${cartItem.id}">remove</button>
                            <p class="orderItemPrice" data-price="${cartItem.id}">$${cartItem.price}</p>
                        </div>` 
    })
    return orderHtml
}

function getMenuHtml(menuArr){
    //menuArr is stand in parameter for array that will be mapped over
    return menuArr.map(item => {
    //.map -> mapping over array to produce html string
    //item parameter reps each object inside of the array
        const {name,
                ingredients,
                price,
                emoji,
                id} = item
        //deconstructing object so can get each individual item to use in html template below
        return `<div class="menuItem">
                    <div class="menuList">
                        <span id="emoji">${item.emoji}</span>
                        <div class="subMenuItems">
                            <h2 class="itemName" data-name="${item.id}">${item.name}</h2>
                            <p class="itemDescription">${item.ingredients}</p>
                            <h3 class="itemPrice" data-price="${item.id}">$${item.price}</h3>
                        </div>
                        <button class="addToOrderBtns" data-add="${item.id}"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>`         
    }).join("")
    //join removes commas between objects in array    
}

function renderOrderSection(){
    document.getElementById("orderItems").innerHTML = getOrderHtml()
}

function renderPriceSection(){
    document.getElementById("totalPrice").innerHTML = getPriceHtml()
}

function render(){
    document.getElementById("menu").innerHTML = getMenuHtml(menuArray)
    // document.getElementById("orderSummary").innerHTML = getMenuHtml()
}

render()
