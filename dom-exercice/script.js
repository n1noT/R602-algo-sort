let borderDOM = function(elt){
    elt.style.border = "2px solid red";
    for(let i = 0; i < elt.children.length; i++){
        borderDOM(elt .children[i]);
    }
}

borderDOM(document.body)