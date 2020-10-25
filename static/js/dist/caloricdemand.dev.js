"use strict";

var btn = document.querySelector('#btn');
btn.addEventListener("click", function (e) {
  e.preventDefault();
  var gender = document.getElementsByName('gender');
  var weight = document.querySelector('#weight');
  var height = document.querySelector('#height');
  var age = document.querySelector('#age');
  var life_style = document.querySelector('#life-style');
  var somatype = document.querySelector('#somatype');
  var purpose = document.getElementsByName('purpose');
  var p_output = document.querySelector('#p-output');
  var alert = document.querySelector('.alert-error');
  var gender_value;
  gender.forEach(function (sex) {
    if (sex.checked) {
      gender_value = sex.value;
    }
  });
  var weight_value = parseFloat(weight.value);
  var height_value = parseInt(height.value);
  var age_value = parseInt(age.value);
  var life_style_value = parseFloat(life_style.value);
  var somatype_value = somatype.value;
  var purpose_value;
  purpose.forEach(function (element) {
    if (element.checked) {
      purpose_value = element.value;
    }
  });
  var validation = 0;
  var sum_;
  var daily_caloric_demand;

  if (gender_value) {
    gender.forEach(function (element) {
      element.classList.remove('form-div-input-wrong');
    });
    validation++;
  } else {
    gender.forEach(function (element) {
      element.classList.add('form-div-input-wrong');
    });
  }

  if (weight_value > 0) {
    weight.classList.remove('form-div-input-wrong');
    validation++;
  } else {
    weight.classList.add('form-div-input-wrong');
  }

  if (height_value > 0) {
    height.classList.remove('form-div-input-wrong');
    validation++;
  } else {
    height.classList.add('form-div-input-wrong');
  }

  if (age_value > 0) {
    age.classList.remove('form-div-input-wrong');
    validation++;
  } else {
    age.classList.add('form-div-input-wrong');
  }

  if (validation === 4) {
    if (gender_value === 'mezczyzna') {
      sum_ = 66.5 + 13.7 * weight_value + 5 * height_value - 6.8 * age_value;
      daily_caloric_demand = sum_ * life_style_value;

      if (somatype_value != 'nie-znam' && purpose_value) {
        if (somatype_value === 'Ektomorfik') {
          if (purpose_value === 'masa') {
            daily_caloric_demand += daily_caloric_demand * 0.2;
          } else {
            daily_caloric_demand -= daily_caloric_demand * 0.1;
          }
        } else if (somatype_value === 'Mezomorfik') {
          if (purpose_value === 'masa') {
            daily_caloric_demand += daily_caloric_demand * 0.15;
          } else {
            daily_caloric_demand -= daily_caloric_demand * 0.15;
          }
        } else {
          if (purpose_value === 'masa') {
            daily_caloric_demand += daily_caloric_demand * 0.1;
          } else {
            daily_caloric_demand -= daily_caloric_demand * 0.2;
          }
        }
      }
    } else {
      sum_ = 665 + 9.6 * weight_value + 1.85 * height_value - 4.7 * age_value;
      daily_caloric_demand = sum_ * life_style_value;

      if (somatype_value != 'nie-znam' && purpose_value) {
        if (somatype_value === 'Ektomorfik') {
          if (purpose_value === 'masa') {
            daily_caloric_demand += daily_caloric_demand * 0.2;
          } else {
            daily_caloric_demand -= daily_caloric_demand * 0.1;
          }
        } else if (somatype_value === 'Mezomorfik') {
          if (purpose_value === 'masa') {
            daily_caloric_demand += daily_caloric_demand * 0.15;
          } else {
            daily_caloric_demand -= daily_caloric_demand * 0.15;
          }
        } else {
          if (purpose_value === 'masa') {
            daily_caloric_demand += daily_caloric_demand * 0.1;
          } else {
            daily_caloric_demand -= daily_caloric_demand * 0.2;
          }
        }
      }
    }

    daily_caloric_demand = Math.ceil(daily_caloric_demand);
    p_output.innerHTML = "Twoje dzienne zapotrzebowanie kaloryczne wynosi <span> ".concat(daily_caloric_demand, " kcal</span>");
  } else {
    var y = document.querySelector('.huh');
    y.classList.remove('huh');
    y.classList.add('alert');
    y.classList.add('alert-error');
    setTimeout(function () {
      y.classList.add('alert-hide');
      setTimeout(function () {
        y.classList.remove('alert');
        y.classList.remove('alert-error');
        y.classList.remove('alert-hide');
        y.classList.add('huh');
      }, 1000);
    }, 3000); // alert.classList.add('alert');
    // setTimeout(function(){ alert.classList.add("alert-hide");}, 3000);
    // setTimeout(function(){ alert.classList.remove("alert"); }, 4000);
    // setTimeout(function(){ alert.classList.remove("alert-hide"); }, 4000);

    p_output.innerHTML = '';
  }
});