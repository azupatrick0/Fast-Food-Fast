const removeDuplicate = (cart, val) => {
    const duplicateItem = cart.find(obj => obj.menuid === val);
    delete (duplicateItem.menuid);
    delete (duplicateItem.meal);
    delete (duplicateItem.imgurl);
    delete (duplicateItem.userid);
    delete (duplicateItem.name);
    delete (duplicateItem.quantity);
    delete (duplicateItem.amount);
    delete (duplicateItem.location);
}

export default removeDuplicate;