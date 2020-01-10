

fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=c')
.then(response => response.json()) 
.then(drinkData => {
    let drinkList = drinkData.drinks;
    console.log(drinkList)

    drinkList.forEach((element) => {
        let drinkName = element.strDrink,
            drinkRecipe = element.strInstructions,
            drinkThumbnail = element.strDrinkThumb;
        
        drinkArray.push({
            'name': drinkName, 
            'recipe': drinkRecipe,
            'thumbnail': drinkThumbnail});
        })   
    
        drinkArray.forEach((element) => {
            $('.drinkContainer').append(
                '<div class="drinkItem"> ' + 
                    '<div class="drinkName">' + element.name + '</div>' + 
                    '<div class="drinkRecipe">' + element.recipe + '</div>' + 
                    '<img class="drinkThumbnail" src="' + element.thumbnail + '">'
                + '</div>'
            );
        });
});


onKeyUp = () => {
    let str = event.target.value.toLowerCase().substring(0, 3)
    
    let filteredArr = drinkArray.filter((x)=>{
        let xSub = x.substring(0, 3).toLowerCase()
        return x.toLowerCase().includes(str) || checkName(xSub, str)
    })
    if (filteredArr.length > 0){
        $listItems.empty();
        filteredArr.forEach((element, index) => {
            $listItems.append('<div>' + element + '</div>');
            $errorMessaging.hide();
            
        })
    } else {
        $listItems.empty();
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


//*********************** Declarations ****************************** */

const drinkArray = [];
const $listItems = $('#apiResults');
const $errorMessaging = $('.errorMessaging');

console.log(drinkArray);