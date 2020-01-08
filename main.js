
fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b')
.then(response => response.json()) 
.then(drinkData => {
    let drinkList = drinkData.drinks;
    
    drinkList.forEach((element) => {
        let drinkName = element.strDrink.replace(/[\s+)(+.']'/g,'');
        drinkArray.push(drinkName)
    })
    
    drinkArray.forEach((element)=> {
        $UlItems.append('<li>' + element + '</li>');
    });
    
});


onKeyUp = () => {
    let str = event.target.value.toLowerCase().substring(0, 20)
    
    let filteredArr = drinkArray.filter((x)=>{
        let xSub = x.substring(0, 20).toLowerCase()
        return x.toLowerCase().includes(str) || checkName(xSub, str)
    })
    if (filteredArr.length > 0){
        $UlItems.empty();
        filteredArr.forEach((element, index) => {
            $UlItems.append('<li>' + element + '</li>');
            $errorMessaging.hide();
            
        })
    } else {
        $UlItems.empty();
        $errorMessaging.show();
    }
    
};

checkName = (name, str) => {
    var pattern = str.split('').map((x)=>{
        return `(?=.*${x})`
    }).join('');
    var regex = new RegExp(`${pattern}`, 'g')
    return name.match(regex);
};

//***************************************************** */

const drinkArray = [];
const $UlItems = $('#apiResults ul');
const $errorMessaging = $('.errorMessaging');