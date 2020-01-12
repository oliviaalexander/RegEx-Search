fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=c')
    .then(response => response.json())
    .then(drinkData => {
        let drinkList = drinkData.drinks;
        drinkList.forEach(element => {
            new appendResults(
                element.strDrink,
                element.strInstructions,
                element.strDrinkThumb
            );
        });

        onKeyUp = () => {
            var userSearch = event.target.value.toLowerCase();
            var regExUserSearch = new RegExp(`${userSearch}`, 'i');

            var result = drinkList.filter(function(element) {
                var searchName = element.strDrink;
                return regExUserSearch.test(searchName);
            });

            if (result.length) {
                $('.drinkContainer').empty();
                result.forEach(element => {
                    new appendResults(
                        element.strDrink,
                        element.strInstructions,
                        element.strDrinkThumb
                    );
                });
                console.log(result);
            } else {
                $('#apiResults').hide();
                $errorMessaging.show();
            }
        };
    });

//*********************** Declarations ****************************** */

const $errorMessaging = $('.errorMessaging');

function appendResults(name, instructions, thumbnail) {
    return $('.drinkContainer').append(
        `<div class="drinkItem">
          <div class="drinkName">  
              ${name}
          </div>
          <div class="drinkRecipe">
              ${instructions}
          </div>
          <img class="drinkThumbnail" src="
              ${thumbnail}
          ">
      </div>`
    );
}
