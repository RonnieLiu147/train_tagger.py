var $ = function(param) {
  return document.querySelector(param);
};

window.onload = function() {
  var methodArr = JSON.parse($('#method').getAttribute('data-source'));
  var participantsArr = JSON.parse($('#participants').getAttribute('data-source'));

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

  for (var x = 0; x < participantsArr.length; x++) {
    if (participantsArr[x] == 'Undergraduate Students') {
      $('#methodUndergraduate').setAttribute('checked','');
    } else if (participantsArr[x] == 'Postgraduate Students') {
      $('#methodPostgraduate').setAttribute('checked','');
    } else if (participantsArr[x] == 'Practioners') {
      $('#methodPractioners').setAttribute('checked','');
    }
  }

};
