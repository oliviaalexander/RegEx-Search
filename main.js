fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=c')
  .then(response => response.json())
  .then(drinkData => {
    let drinkList = drinkData.drinks;

    drinkList.forEach(element => {
      $('.drinkContainer').append(
        `<div class="drinkItem">
            <div class="drinkName">  
                ${element.strDrink}
            </div>
            <div class="drinkRecipe">
                ${element.strInstructions}
            </div>
            <img class="drinkThumbnail" src="
                ${element.strDrinkThumb}
            ">
        </div>`
      );
    });

    //Fix onKeyUp function to allow user to search through list

    onKeyUp = () => {
      let str = event.target.value.toLowerCase().substring(0, 3);

      let filteredArr = drinkList.filter(e => {
        let xSub = e.substring(0, 3).toLowerCase();
        return e.toLowerCase().includes(str) || checkName(xSub, str);
      });
      if (filteredArr.length > 0) {
        $('.drinkContainer').empty();
        filteredArr.forEach(element => {
          $('.drinkContainer').append('<div>' + element + '</div>');
          $errorMessaging.hide();
        });
      } else {
        $('.drinkContainer').empty();
        $errorMessaging.show();
      }
    };

    checkName = (name, str) => {
      var pattern = str
        .split('')
        .map(x => {
          return `(?=.*${x})`;
        })
        .join('');
      var regex = new RegExp(`${pattern}`, 'g');
      return name.match(regex);
    };
  });
//*********************** Declarations ****************************** */

const drinkArray = [];
const $listItems = $('#apiResults');
const $errorMessaging = $('.errorMessaging');
