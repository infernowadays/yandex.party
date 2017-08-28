var MyForm = {
  validate: function(Object) {
    document.getElementById("submitButton").disabled = false;

    var obj = {
      isValid: true,
      errorFields: [],
    };

    //validate fio
    var fio = Object.fio;
    if (fio.value.length != 0) {
      var stringText = fio.value.replace(/\n/, " ").replace(/[^а-яА-ЯёЁA-Za-z_]/gi, " ").replace(/\s{2,}/gi, " ").replace(/ $/, "").replace(/^ /, "");
      var text_array = stringText.split(" ");
      if (text_array.length != 3) {
        $("#fio").addClass("error");
        obj.isValid = false;
        obj.errorFields.push("fio");
      } else $("#fio").removeClass("error");
    }

    //validate email
    var email = Object.email.value;
    if (email.length != 0) {
      var emailPattern_1 = /[0-9a-z_]+@(ya.ru||yandex.ru||yandex.ua||yandex.by||yandex.kz||yandex.com)$/i;
      var prov = emailPattern_1.test(email);
      if (prov != true) {
        $("#email").addClass("error");
        obj.isValid = false;
        obj.errorFields.push("email");
      } else $("#email").removeClass("error");
    }

    //validate phone
    var phone = Object.phone;
    if (phone.value.length != 0) {
      var sum = 0;
      for (var i = 0; i < 15; i++) {
        if (!isNaN(phone.value.charAt(i))) sum += parseInt(phone.value.charAt(i));
      }
      if (sum > 30 || isNaN(sum)) {
        $("#phone").addClass("error");
        obj.isValid = false;
        obj.errorFields.push("phone");
      } else $("#phone").removeClass("error");
    }

    //check fileds're null
    if (fio.value.length == 0 || email.length == 0 || phone.value.length == 0) obj.isValid = false;
    return obj;
  },

  getData: function() {
    var obj = {
      fio: null,
      email: null,
      phone: null
    };

    for (var key in obj) {
      if (key == 'fio') {
        obj[key] = document.getElementsByName('fio').item(0).value;
      } else if (key == 'email') {
        obj[key] = document.getElementsByName('email').item(0).value;
      } else if (key == 'phone') {
        obj[key] = document.getElementsByName('phone').item(0).value;
      }
    }

    return obj;
  },

  testSetData: function() {
    ////test for setData
    var obj = {
      smth_value: 0,
      fio: "Jack Sparrow QQ",
      email: "pirat@yandex.com",
      phone: "+7(000)00-00-00"
    }
    MyForm.setData(obj);
  },

  setData: function(Object) {
    document.getElementById("fio").value = Object.fio;
    document.getElementById("email").value = Object.email;
    document.getElementById("phone").value = Object.phone;
  },

  submit: function(obj) {
    //MyForm.testSetData();////to activate setData press "Отправить" in the form

    ///calling validate() function
    var valid = MyForm.validate(obj);

    //using ajax
    if (valid.isValid == true) {
      document.getElementById("submitButton").disabled = true;
      Ajax(obj);
    } else return false;

    //MyForm.getData();
  }
};

function Ajax(Object) {
  $.ajax({
    type: "POST",
    url: "mail.php",
    data: $(Object).serialize(),

    complete: function(xhr, txt_status) {
      ///xhr.status - code, xhr.statusText - reason(description)
      switch (txt_status) {
        case 'success':
          $("#resultContainer").text("Success");
          $("#resultContainer").addClass("success");
          break;
        case 'error':
          $("#resultContainer").text(xhr.statusText);
          $("#resultContainer").addClass("error");
          break;
        case 'progress':
          $("#resultContainer").addClass("progress");
          setTimeout(Ajax, xhr.timeout);
          break;
      }
    }
  });
}

///testing json files
function Json() {
  $.getJSON('success.json', function(data) {
    switch (data.status) {
      case 'success':
        $("#resultContainer").text("Success");
        $("#resultContainer").addClass("success");
        break;
      case 'error':
        $("#resultContainer").text(data.reason);
        $("#resultContainer").addClass("error");
        break;
      case 'progress':
        $("#resultContainer").addClass("progress");
        setTimeout(Json, data.timeout);
        break;
    }
  });
}
