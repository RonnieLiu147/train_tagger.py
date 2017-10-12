function checkedLoginState() {
  var userInfo = window.localStorage.getItem('_info');
  if (userInfo) {
    return true;
  } else {
    return false;
  }
}

function fillAuthText() {
  var userInfo = JSON.parse(window.localStorage.getItem('_info'));
  var authName = document.getElementById('authName');
  var authNumber = userInfo.authority;
  if (authNumber == 0) {
    authName.innerHTML = 'User';
    document.getElementById('UploadArticle').style.display = 'block';
  } else if (authNumber == 1) {
    authName.innerHTML = 'Analyst';
  } else if (authNumber == 2) {
    authName.innerHTML = 'Administrator';
    document.getElementById('viewPushNews').style.display = 'block';
  }
}

function logoutFnc() {
  window.localStorage.removeItem('_info');
  window.localStorage.removeItem('_id');
  window.location.href = 'http://localhost:3000/';
}


function fillUserBtn() {
  var viewUserBtn = document.getElementById('viewUser');
  var viewArticleBtn = document.getElementById('viewArticle');
  var userId = window.localStorage.getItem('_id');
  var text = 'user?userId=' + userId;
  var testList = 'articleList?userId=' + userId;
  viewUserBtn.setAttribute('data-href',text);
  viewArticleBtn.setAttribute('data-href',testList);
}

window.onload = function() {
  if (!checkedLoginState()) {
    window.location.href = 'http://localhost:3000/';
    return;
  }
  var meun = document.getElementById('meun');
  var meunItem = meun.getElementsByTagName('li');
  var iframe = document.getElementById('homeIframe');
  for (var i = 0; i < meunItem.length; i++) {
    (function(count) {
      meunItem[count].onclick = function() {
        var href = meunItem[count].getAttribute('data-href');
        for (var j = 0; j < meunItem.length; j++) {
          meunItem[j].className = '';
        }
        meunItem[count].className = 'leftMenu-active';
        iframe.src = 'http://localhost:3000/' + href;
      };
    })(i);
  }

  fillAuthText();

  var logoutBtn = document.getElementById('logout');
  logoutBtn.onclick = logoutFnc;

  fillUserBtn();

  iframe.src = 'http://localhost:3000/homeNews';
};
