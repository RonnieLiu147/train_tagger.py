var $ = function(param) {
  return document.querySelector(param);
};
function fillTopBtn() {
  var userId = window.localStorage.getItem('_id');
  var putTopArr = document.querySelectorAll('.putTop');
  var channelTopArr = document.querySelectorAll('.channelTop');
  for (var i = 0; i < putTopArr.length; i++) {
    var text = putTopArr[i].getAttribute('href') + '&localId=' + userId;
    putTopArr[i].setAttribute('href',text);
  }

  var hiddenUser = document.getElementById('hiddenUserId');
  hiddenUser.value = userId;

  for (var i = 0; i < channelTopArr.length; i++) {
    var textChannel = channelTopArr[i].getAttribute('href') + '&localId=' + userId;
    channelTopArr[i].setAttribute('href',textChannel);
  }
}

window.onload = function() {

  var page = parseInt($('#currentPage').innerHTML);
  var userId = window.localStorage.getItem('_id');
  var nextBtn = $('#next');
  var len = parseInt($('#userBody').getAttribute('data-count'));
  var searchName = document.getElementById('searchName').value;
  nextBtn.onclick = function() {
    if (len == 0) {
      return;
    }
    window.location.href = 'http://localhost:3000/articleList?page=' + (page + 1) + '&userId=' + userId + '&searchName=' + searchName;;
  }

  var preBtn = $('#pre');
  preBtn.onclick = function() {
    if (page == 1) {
      return ;
    }
    window.location.href = 'http://localhost:3000/articleList?page=' + (page - 1) + '&userId=' + userId + '&searchName=' + searchName;;
  }

  fillTopBtn();
};
