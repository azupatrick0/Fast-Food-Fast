const cartSystem = (val, cart, userid) => {
    return (cart.push({
        menuid: val,
        meal: document.querySelector(`.td2-cart${val}`).innerHTML,
        imgurl: document.querySelector(`.img${val}`).getAttribute('src'),
        userid,
        name,
        quantity: document.querySelector(`.td4-cart${val}`).innerHTML,
        amount: document.querySelector(`.td3-cart${val}`).innerHTML,
    }))
}

export default cartSystem;