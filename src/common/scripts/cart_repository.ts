
export function changeCount(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, noOfItems: Map<string, number>, setNoOfItems: any) {
    // JSON.parse(JSON.stringify(myObj));
    var breh: Map<string, number> = new Map();
    const newArr = Array.from(noOfItems.entries());
    for( var i = 0; i < newArr.length; i ++) {
        if(newArr[i][1] > 0) {
            breh.set(newArr[i][0], newArr[i][1]);
        }
    }
    const thisID = e.currentTarget.value;
    const thisCount = noOfItems.get(thisID) ? noOfItems.get(thisID) : 0;
    if(e.currentTarget.classList.contains('addButton')) {
        breh.set(thisID, thisCount ? thisCount + 1 : 1)
    } else if(e.currentTarget.classList.contains('subtractButton')) {
        if(thisCount === 0 || thisCount === undefined) {
            // pass
        } else if(thisCount === 1) {
            breh.delete(thisID);
        } else {
            breh.set(thisID, thisCount - 1);
        }
    }
    setNoOfItems(breh);
}