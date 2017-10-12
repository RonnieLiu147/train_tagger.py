var $ = function(param) {
  return document.querySelector(param);
};
var isSend = false;
function regitster() {
  var userName = $('#inputUserName');
  var userEmail = $('#inputUserEmail');
  var userPassword = $('#inputUserPassword');
  var authority = selectAuthority();
  if (!userName.value) {
    alert('Please enter Username');
    return 0;
  } else if (!userEmail.value) {
    alert('Please enter Email');
    return 0;
  } else if (!userPassword.value) {
    alert('Please enter Password');
    return 0;
  }
  isLogin = true;
  var reqUrl = 'http://localhost:3000/registerUser';
  axios.post(reqUrl, {
    data: {
      'username': userName.value,
      'useremail': userEmail.value,
      'userpassword': userPassword.value,
      'authority': authority,
    },
  }).then((res) => {
    if (res.data.code === 0) {
      window.localStorage.setItem('_id', res.data.data._id);
      window.localStorage.setItem('_info', JSON.stringify(res.data.data));
      window.location.href = window.location.origin + '/home';
    } else {
      alert(res.data.msg);
    }
    isLogin = false;
  });
}

function selectAuthority() {
  var activeRadio = null;
  var allRadio = document.querySelectorAll('.selectAuthority');
  for (var i = 0; i < allRadio.length; i++) {
    if (allRadio[i].checked) {
      activeRadio = allRadio[i].value;
    }
  }
  return activeRadio;
}

window.onload = function () {
  var registerBtn = $('#btnSubmit');
  registerBtn.addEventListener('click', function() {
    if (isSend) return;
    regitster();
  });
};
