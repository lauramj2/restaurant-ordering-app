import { menuArray } from "./data.js"


const orderBtn = document.getElementById("order-btn")
// const paymentForm = document.getElementById("payment-form")
// const payBtn = document.getElementById("pay-btn")


function getMenuHtml(){
    let menuHtml = ""
    menuArray.forEach(function(items){
        menuHtml += `
                <div class="menuItem">
                    <div class="menuList">
                        <span id="emoji">${items.emoji}</span>
                        <div class="subMenuItems">
                            <h2 class="itemName" data-item="${items.id}">${items.name}</h2>
                            <p class="itemDescription" data-item="${items.id}">${items.ingredients}</p>
                            <h3 class="itemPrice" data-item="${items.id}">$${items.price}</3>
                        </div>
                        <button class="addToOrderBtns" id="${items.id}"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                `
    })
    return menuHtml
}


// const list = document.getElementById("list")
// orderList = []
function getOrderHtml(){
    let orderHtml = ""
    menuArray.forEach(function(items){
        orderHtml += `
                    <ul class="list" type="list">
                        <div class="orderItemInner">
                            <div class="orderInnerLeft">
                                <p class="orderItemName" data-item="${items.id}">${items.name}</p>
                                <button class="itemRemoveBtn" data-item="${items.name}">Remove</button>
                            </div>
                            <div class="orderItemPrice">
                                <p data-item="${items.id}">$${items.price}</p>
                            </div>
                        </div>
                    </ul>
                `
    })
    return orderHtml
}

document.addEventListener("click", function(e){
    if (e.target.dataset.item){
        getOrderHtml(e.target.dataset.item)
    }
})

function render(){
    document.getElementById("menu").innerHTML = getMenuHtml()
    document.getElementById("orderSummary").innerHTML = getOrderHtml()
}


render()



// On click (add item) Button, add to list - use data attributes to tie each button to their item?


// const list = document.getElementById("list")

// addItemBtn.addEventListener("click", function(){
//     orderList = []
    
//     orderList.push()
// })

// Complete order button and payment form appear

orderBtn.addEventListener("click", function(){
    // don't allow oder button to be clicked unless there are items in cart

    // if (list.length.value === 0){
    //     orderBtn.disabled = true
    // }
    
    const paymentModal = document.getElementById("payment-modal")

    paymentModal.style.display="flex"
})


const payBtn = document.getElementById("pay-btn")

payBtn.addEventListener("click", function(){

    const orderName = document.getElementById("orderName")
    const thankYouModal = document.getElementById("thank-you-modal")

    thankYouModal.style.display="flex"
    
    const thankYouName = orderName.value
    thankYouModal.innerHTML += `thank you, ${thankYouName}. Your order is on the way.`

    // Hides modal upon submit....not sure if this should be how thats done. need to make it not appear until all fields are filled in 

    const paymentModal = document.getElementById("payment-modal")
    paymentModal.style.display="none"
})


// // event listener for form that prevents default behaviors and get name input to use in thank you modal

// paymentForm.addEventListener("submit", function(e){
//     e.preventDefault()
// }
