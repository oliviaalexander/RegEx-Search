
const drinkArray = [];

fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b')
.then(response => response.json()) 
.then(drinkData => {
    let drinkList = drinkData.drinks;
    
    drinkList.forEach((element) => {
        let drinkName = element.strDrink.replace(/[\s+)(+.']'/g,'');
        drinkArray.push(drinkName)
    })

    drinkArray.forEach((element)=> {
        $('#apiResults ul').append('<li>' + element + '</li>');
    });
    
});


onKeyUp = () => {
    let str = event.target.value.toLowerCase().substring(0, 3)
    
    let filteredArr = drinkArray.filter((x)=>{
        let xSub = x.substring(0, 3).toLowerCase()
        return x.toLowerCase().includes(str) || checkName(xSub, str)
    })
    if (filteredArr.length > 0){
        console.log(filteredArr)
    } else {
        console.log("no results")
    }

};

checkName = (name, str) => {
    var pattern = str.split("").map((x)=>{
        return `(?=.*${x})`
    }).join("");
    var regex = new RegExp(`${pattern}`, "g")
    return name.match(regex);
};