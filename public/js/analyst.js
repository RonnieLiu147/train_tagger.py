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


window.onload = function() {

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


  var methodArr = JSON.parse($('#method').getAttribute('data-source'));
  var participantsArr = JSON.parse($('#participants').getAttribute('data-source'));

  if (methodArr) {
    for (var i = 0; i < methodArr.length; i++) {
      if (methodArr[i] == 'Case Study') {
        $('#methodCaseStudy').setAttribute('checked','');
      } else if (methodArr[i] == 'FieId Observation') {
        $('#methodFieIdObservation').setAttribute('checked','');
      } else if (methodArr[i] == 'Experiment') {
        $('#methodExperiment').setAttribute('checked','');
      } else if (methodArr[i] == 'Interview') {
        $('#methodInterview').setAttribute('checked','');
      } else if (methodArr[i] == 'Survey') {
        $('#methodSurvey').setAttribute('checked','');
      }
    }
  }

  if (participantsArr) {
    for (var x = 0; x < participantsArr.length; x++) {
      if (participantsArr[x] == 'Undergraduate Students') {
        $('#methodUndergraduate').setAttribute('checked','');
      } else if (participantsArr[x] == 'Postgraduate Students') {
        $('#methodPostgraduate').setAttribute('checked','');
      } else if (participantsArr[x] == 'Practioners') {
        $('#methodPractioners').setAttribute('checked','');
      }
    }
  }


  var raterCount = parseInt($('#rater').getAttribute('data-count'));
  var star = document.querySelectorAll('.star');
  for (var s = 0; s < raterCount; s++) {
    star[s].innerHTML = '★';
  }

  var cancel = document.getElementById('cancelSubmit');
  cancel.onclick = function() {
    window.history.back()
  };

  var btnSubmit = document.getElementById('btnSubmit');
  btnSubmit.onclick = function() {
    document.getElementById('isSave').value = 1;
    alert('save success');
    document.getElementById('formAll').submit();
  };
};
