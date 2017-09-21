var $ = function(param) {
  return document.querySelector(param);
};
var reter = 0;

function fillRaterStar (count) {
  var star = document.querySelectorAll('.star');
  for (var i = 0; i < star.length; i++) {
    star[i].innerHTML = '☆';
  }
  for (var i = 0; i < count; i++) {
    star[i].innerHTML = '★';
  }
}

function bindRater() {
  var star = document.querySelectorAll('.star');
  var reterInput = $('#inputRater');
  for (var i = 0; i < star.length; i++) {
    (function(count) {
      star[count].onclick = function() {
        switch (count) {
          case 0:
            fillRaterStar(1);
            reter = 1;
            reterInput.value = 1;
            break;
          case 1:
            fillRaterStar(2);
            reter = 2;
            reterInput.value = 2;
            break;
          case 2:
            fillRaterStar(3);
            reter = 3;
            reterInput.value = 3;
            break;
          case 3:
            fillRaterStar(4);
            reter = 4;
            reterInput.value = 4;
            break;
          case 4:
            fillRaterStar(5);
            reter = 5;
            reterInput.value = 5;
            break;
        }
      };
    })(i);
  }
}

window.onload = function() {
  bindRater();
  var hiddenIdInput = document.querySelector('#idHidden');
  var _id = window.localStorage.getItem('_id');
  hiddenIdInput.value = _id;

  var uploadForm = document.querySelector('#uploadArticleFile');
  var uploadInput = document.querySelector('#uploadArticleInput');
  uploadInput.onchange = function() {
    uploadForm.submit();
  };
};
