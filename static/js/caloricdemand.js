const btn = document.querySelector('#btn');

btn.addEventListener("click", e => {
    e.preventDefault();
    const gender = document.getElementsByName('gender');
    const weight = document.querySelector('#weight');
    const height = document.querySelector('#height');
    const age = document.querySelector('#age');
    const life_style = document.querySelector('#life-style');
    const somatype = document.querySelector('#somatype');
    const purpose = document.getElementsByName('purpose');
    const p_output = document.querySelector('#p-output');
    const alert = document.querySelector('.alert-error');
    
    var gender_value;
    gender.forEach(sex => {
        if (sex.checked) {
            gender_value = sex.value;
        }
    });
    let weight_value = parseFloat(weight.value);
    let height_value = parseInt(height.value);
    let age_value = parseInt(age.value);
    let life_style_value = parseFloat(life_style.value);
    let somatype_value = somatype.value;
    var purpose_value;
    purpose.forEach(element => {
        if (element.checked) {
            purpose_value = element.value;
        }
    });

    let validation = 0;
    let sum_;
    let daily_caloric_demand;
    if (gender_value) {
        gender.forEach(element => {
            element.classList.remove('form-div-input-wrong');
        });
        validation++;
    } else {
        gender.forEach(element => {
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
            sum_ = 66.5 + (13.7 * weight_value) + (5 * height_value) - (6.8 * age_value);
            daily_caloric_demand = sum_ * life_style_value;
            if ((somatype_value != 'nie-znam') && purpose_value) {
                if (somatype_value === 'Ektomorfik') {
                    if (purpose_value === 'masa') {
                        daily_caloric_demand += daily_caloric_demand*0.2;
                    } else {
                        daily_caloric_demand -= daily_caloric_demand*0.1;
                    }
                } else if (somatype_value === 'Mezomorfik') {
                    if (purpose_value === 'masa') {
                        daily_caloric_demand += daily_caloric_demand*0.15;
                    } else {
                        daily_caloric_demand -= daily_caloric_demand*0.15;
                    }
                } else {
                    if (purpose_value === 'masa') {
                        daily_caloric_demand += daily_caloric_demand*0.1;
                    } else {
                        daily_caloric_demand -= daily_caloric_demand*0.2;
                    }
                }
            }
        } else {
            sum_ = 665 + (9.6 * weight_value) + (1.85 * height_value) - (4.7 * age_value);
            daily_caloric_demand = sum_ * life_style_value;
            if ((somatype_value != 'nie-znam') && purpose_value) {
                if (somatype_value === 'Ektomorfik') {
                    if (purpose_value === 'masa') {
                        daily_caloric_demand += daily_caloric_demand*0.2;
                    } else {
                        daily_caloric_demand -= daily_caloric_demand*0.1;
                    }
                } else if (somatype_value === 'Mezomorfik') {
                    if (purpose_value === 'masa') {
                        daily_caloric_demand += daily_caloric_demand*0.15;
                    } else {
                        daily_caloric_demand -= daily_caloric_demand*0.15;
                    }
                } else {
                    if (purpose_value === 'masa') {
                        daily_caloric_demand += daily_caloric_demand*0.1;
                    } else {
                        daily_caloric_demand -= daily_caloric_demand*0.2;
                    }
                }
            }     
        }
        daily_caloric_demand = Math.ceil(daily_caloric_demand);
        p_output.innerHTML = `Twoje dzienne zapotrzebowanie kaloryczne wynosi <span> ${daily_caloric_demand} kcal</span>`;
    }else{
        alert.classList.add('alert');
        setTimeout(function(){ alert.classList.add("alert-hide");}, 3000);
        setTimeout(function(){ alert.classList.remove("alert"); }, 4000);
        setTimeout(function(){ alert.classList.remove("alert-hide"); }, 4000);
        p_output.innerHTML = '';
    }

});