function init(){
    getDrinkData();
}
init()

const drinkArray = [];

function getDrinkData (){
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b')
    .then(response => response.json()) 
        .then(drinkData => {
            var drinkList = drinkData.drinks;
            
            drinkList.forEach(element => {
                var drinkName = element.strDrink;
                drinkArray.push(drinkName);
                console.log(drinkName);
                $('#apiResults ul').append('<li>' + drinkName + '</li>');
            })
    });
}

onKeyUp = () => {
    var str = event.target.value.toLowerCase().substring(0, 10)
    
    var filteredArr = drinkArray.filter((x)=>{
        var xSub = x.substring(0, 10).toLowerCase()
        return x.toLowerCase().includes(str) || checkName(xSub, str)
    })
    if (filteredArr.length > 0){
        console.log(filteredArr)
    } else {
        console.log("no results")
    }
}

checkName = (name, str) => {
    var pattern = str.split("").map((x)=>{
        return `(?=.*${x})`
    }).join("");
    var regex = new RegExp(`${pattern}`, "g")
    return name.match(regex);
}

// const office = ['Kelly', 'Creed', 'Stanley', 'Oscar', 'Michael', 'Jim', 'Darryl', 'Phyllis', 'Pam', 'Dwight', 'Angela', 'Andy', 'William', 'Ryan', 'Toby', 'Bob']


// appendNodes = (filteredOffice) => {
//     var container = document.getElementById('nameContainer');

//     if (filteredOffice != "no results"){
//          container.innerText = ""
//          filteredOffice.map((name)=>{
//             var p = document.createElement("P")
//             p.innerText = name
//             container.appendChild(p)
//          })
//      } else {
//          container.innerText = "no results"
//      }
//     }

//     document.addEventListener("DOMContentLoaded", () => {
//         appendNodes(office)
//     });