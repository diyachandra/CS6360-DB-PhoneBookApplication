var currentGlobalContactid;
var currentPhoneLength;
var currentDateLength;
var currentAddressLength;

var newPhones = 0;
var newAddr = 0;
var newDate = 0;

$(function () {
  loadContactList();
  formValidation();
  $("#leftPane").bind("scroll", function () {
    //console.log('scroll');
    var s = $("#leftPane").scrollTop(),
      d = $("#contactsList").height(),
      c = $("#leftPane").height();
    scrollPercent = (s / (d - c)) * 100;
    var position = scrollPercent;
    $("#prgBar").css("width", position + "%");
    $("#prgBar").text(Math.round(position) + "%");
  });

  $("#searchButton").on("click", function () {
    processSearchArguments($("#searchTextInput").val());
  });
  $("#createButton").on("click", function () {
    openCreateForm();
  });

  $("#saveButton").on("click", function () {
    // DATA PREPROCESS SECTION
    var nameData = $("#nameSectionDiv :input").serialize();
    nameData = nameData + "&" + "id=" + currentGlobalContactid;
    console.log(nameData);

    var phoneData = "";
    for (var i = 0; i < currentPhoneLength; ++i) {
      phoneData += $(`#phoneRow${i} :input`).serialize();
      phoneData +=
        "&" +
        "phoneid" +
        i +
        "=" +
        $("#phone" + i).attr("p_id") +
        "&" +
        `con_id${i}=` +
        currentGlobalContactid +
        "&";
    }
    console.log(phoneData);

    var dateData = "";
    for (var i = 0; i < currentDateLength; ++i) {
      dateData += $(`#dateSectionDiv${i} :input`).serialize();
      dateData +=
        "&" +
        "dateid" +
        i +
        "=" +
        $("#date" + i).attr("d_id") +
        "&" +
        `con_id${i}=` +
        currentGlobalContactid +
        "&";
    }
    //dateData += "id=" + currentGlobalContactid;
    console.log(dateData);

    var addressData = "";
    for (var i = 0; i < currentAddressLength; ++i) {
      addressData += $(`#addressSectionDiv${i} :input`).serialize();
      addressData +=
        "&" +
        "addressid" +
        i +
        "=" +
        $("#address" + i).attr("a_id") +
        "&" +
        `con_id${i}=` +
        currentGlobalContactid +
        "&";
    }
    //addressData += "id=" + currentGlobalContactid;
    console.log(addressData);

    // AJAX SECTION
    $.ajax({
      url: "update_name.php", // url where to submit the request
      type: "GET", // type of action POST || GET
      dataType: "json", // data type
      data: nameData, // post data || get data
      success: function (result) {
        // you can see the result from the console
        // tab of the developer tools

        console.log(result);
        //location.reload();
      },
      error: function (result) {
        // you can see the result from the console
        console.log(result);
      },
    });

    $.ajax({
      url: "update_phone.php", // url where to submit the request
      type: "GET", // data type
      data: phoneData, // post data || get data
      success: function (result) {
        // you can see the result from the console
        // tab of the developer tools

        console.log(result);
        //location.reload();
      },
      error: function (result) {
        // you can see the result from the console
        console.log(result);
      },
    });

    $.ajax({
      url: "update_address.php", // url where to submit the request
      type: "GET", // data type
      data: addressData, // post data || get data
      success: function (result) {
        // you can see the result from the console
        // tab of the developer tools

        console.log(result);
        //location.reload();
      },
      error: function (result) {
        // you can see the result from the console
        console.log(result);
      },
    });

    $.ajax({
      url: "update_date.php", // url where to submit the request
      type: "GET",
      // data type
      data: dateData, // post data || get data
      success: function (result) {
        // you can see the result from the console
        // tab of the developer tools

        console.log(result);
        //location.reload();
      },
      error: function (result) {
        // you can see the result from the console
        console.log(result);
      },
    });
    //location.reload();
  });

  $("#createsaveButton").on("click", function () {
    // DATA PREPROCESS SECTION
    var nameData = $("#createnameSectionDiv :input").serialize();
    nameData = nameData;
    console.log(nameData);

    var contactID = "";

    // AJAX SECTION
    $.ajax({
      url: "create_name.php", // url where to submit the request
      type: "GET", // type of action POST || GET
      dataType: "json", // data type
      data: nameData, // post data || get data
      success: function (result) {
        // you can see the result from the console
        // tab of the developer tools

        console.log(result);
        contactID = result;
        createRestDetails(contactID);
        //location.reload();
      },
      error: function (result) {
        // you can see the result from the console
        console.log(result);
      },
    });
  });
});

function createRestDetails(contactID) {
  var phoneData = "";
  for (var i = 0; i < 1; ++i) {
    phoneData += $(`#phoneRow${i} :input`).serialize();
    phoneData += `&c_id${i}=${contactID}&`;
  }
  console.log(phoneData);

  var dateData = "";
  for (var i = 0; i < 1; ++i) {
    dateData += $(`#dateSectionDiv${i} :input`).serialize();
    dateData += `&c_id${i}=${contactID}&`;
  }

  //dateData += "id=" + currentGlobalContactid;
  console.log(dateData);

  var addressData = "";
  for (var i = 0; i < 1; ++i) {
    addressData += $(`#addressSectionDiv${i} :input`).serialize();
    addressData += `&c_id${i}=${contactID}&`;
  }
  console.log(addressData);

  //addressData += "id=" + currentGlobalContactid;

  $.ajax({
    url: "create_phone.php", // url where to submit the request
    type: "GET", // data type
    data: phoneData, // post data || get data
    success: function (result) {
      // you can see the result from the console
      // tab of the developer tools

      console.log(result);
      //location.reload();
    },
    error: function (result) {
      // you can see the result from the console
      console.log(result);
    },
  });

  $.ajax({
    url: "create_address.php", // url where to submit the request
    type: "GET", // data type
    data: addressData, // post data || get data
    success: function (result) {
      // you can see the result from the console
      // tab of the developer tools

      console.log(result);
      //location.reload();
    },
    error: function (result) {
      // you can see the result from the console
      console.log(result);
    },
  });

  $.ajax({
    url: "create_dates.php", // url where to submit the request
    type: "GET",
    // data type
    data: dateData, // post data || get data
    success: function (result) {
      // you can see the result from the console
      // tab of the developer tools

      console.log(result);
      //location.reload();
    },
    error: function (result) {
      // you can see the result from the console
      console.log(result);
    },
  });
  location.reload();
}

function formValidation() {
  $("#inputFname").inputmask({
    regex: "^([a-zA-Z]+)$",
  });
  $("#inputMname").inputmask({
    regex: "^([a-zA-Z]+)$",
  });
  $("#inputLname").inputmask({
    regex: "^([a-zA-Z]+)$",
  });
  $("#inputPhoneNumber").inputmask({
    mask: "999-999-9999",
  });
  $("#inputAddress").inputmask({
    regex: "^([^@!#$%^&*()+|{}<>~=]+)$",
  });
  $("#inputCity").inputmask({
    regex: "^([a-zA-Z]+)$",
  });
  $("#inputZip").inputmask({
    mask: "99999",
  });
}

function deleteContact(itemId) {
  $("#deleteButton").on("click", function () {
    $.ajax({
      method: "GET",
      url: "delete_contact.php",
      data: {
        id: itemId,
      },
      success: function () {
        alert("Contact successfully deleted!");
        location.reload();
      },
    });
  });
}

function loadContactList() {
  $.ajax({
    method: "GET",
    url: "list_all.php",
    success: function (data) {
      $.each(data, function (key, value) {
        var record =
          value["Fname"] + " " + value["Mname"] + " " + value["Lname"];
        var listItem =
          '<li id="' +
          value["Contact_id"] +
          '" class="list-group-item list-group-item-action">' +
          record +
          "</li>";
        $("#contactsList").append(listItem);
      });
      $(".list-group-item").on("click", function () {
        // alert($(this).text());
        var itemId = $(this).attr("id");
        loadDetails(itemId);
        currentGlobalContactid = itemId;
      });
    },
  });
}

function loadDetails(itemId) {
  $.ajax({
    method: "GET",
    url: "contact_details.php",
    data: {
      id: itemId,
    },
    success: function (data) {
      loadName(data);
      loadPhone(data);
      loadAddress(data);
      loadDates(data);
      $("#updateButton").on("click", function () {
        loadUpdateForm(data);
      });

      deleteContact(itemId);
      $("#updateButton").attr("disabled", false);
      $("#deleteButton").attr("disabled", false);
    },
  });
}

function openCreateForm() {
  $("#createrestSectionDiv").empty();

  var i = 0;
  $("#createinputFname").empty();
  $("#createinputMname").empty();
  $("#createinputLname").empty();
  var phoneRow =
    "<div class='form-row' id='phoneRow" +
    i +
    "'>" +
    "<div class='form-group col-md-6' id='updatePhoneType" +
    i +
    "'>" +
    "<label for='inputPhoneType'>Phone Type</label>" +
    "<select id='inputPhoneType" +
    i +
    "' class='form-control' name='PhoneType" +
    i +
    "'>" +
    "<option selected hidden>Choose...</option>" +
    "<option value='Cellular'>Cellular</option>" +
    "<option value='Home'>Home</option>" +
    "<option value='Work'>Work</option>" +
    "<option value='Other'>Other</option>" +
    "</option>" +
    "</select>" +
    "</div>" +
    "<div class='form-group col-md-6' id='updatePhoneNum" +
    i +
    "'>" +
    "<label for='inputPhoneNumber'>Phone Number</label>" +
    "<input name='PhoneNum" +
    i +
    "' class='form-control' id='inputPhoneNumber" +
    i +
    "'>" +
    "</div>" +
    "</div>";
  $("#createrestSectionDiv").append(phoneRow);

  var addressSec =
    '<div id="addressSectionDiv' +
    i +
    '">' +
    '<div class="form-group" id="updateAddressRow1' +
    i +
    '">' +
    '<label for="inputAddress">Address</label>' +
    '<input name="Address' +
    i +
    '" class="form-control" id="inputAddress' +
    i +
    '" placeholder="1234 Main St">' +
    "</div>" +
    '<div class="form-row" id="updateAddressRow2' +
    i +
    '">' +
    '<div class="form-group col-md-3" id="updateAddressType' +
    '">' +
    '<label for="inputAddressType">Address Type</label>' +
    '<select id="inputAddressType' +
    i +
    '" class="form-control" name="AddressType' +
    i +
    '">' +
    "<option selected hidden>Choose...</option>" +
    '<option value="Home">Home</option>' +
    '<option value="Work">Work</option>' +
    '<option value="Other">Other</option>' +
    "</option>" +
    "</select>" +
    "</div>" +
    '<div class="form-group col-md-3" id="updateCity' +
    i +
    '">' +
    '<label for="inputCity">City</label>' +
    '<input name="City' +
    i +
    '" class="form-control" id="inputCity' +
    i +
    '">' +
    "</div>" +
    '<div class="form-group col-md-3" id="updateState' +
    i +
    '">' +
    '<label for="inputState">State</label>' +
    '<select id="inputState' +
    i +
    '" class="form-control" name ="State' +
    i +
    '">' +
    "<option selected hidden>Choose...</option>" +
    '<option value="Alabama">Alabama</option>' +
    '<option value="Alaska">Alaska</option>' +
    '<option value="Arizona">Arizona</option>' +
    '<option value="Arkansas">Arkansas</option>\n' +
    '                              <option value="California">California</option>\n' +
    '<option value="Colorado">Colorado</option>\n' +
    '                              <option value="Connecticut">Connecticut</option>\n' +
    '                              <option value="Delaware">Delaware</option>\n' +
    '                              <option value="District Of Columbia">District Of Columbia</option>\n' +
    '                              <option value="Florida">Florida</option>\n' +
    '                              <option value="Georgia">Georgia</option>\n' +
    '                              <option value="Hawaii">Hawaii</option>\n' +
    '                              <option value="Idaho">Idaho</option>\n' +
    '                              <option value="Illinois">Illinois</option>\n' +
    '                              <option value="Indiana">Indiana</option>\n' +
    '                              <option value="Iowa">Iowa</option>\n' +
    '                              <option value="Kansas">Kansas</option>\n' +
    '                              <option value="Kentucky">Kentucky</option>\n' +
    '                              <option value="Louisiana">Louisiana</option>\n' +
    '                              <option value="Maine">Maine</option>\n' +
    '                              <option value="Maryland">Maryland</option>\n' +
    '                              <option value="Massachusetts">Massachusetts</option>\n' +
    '                              <option value="Michigan">Michigan</option>\n' +
    '                              <option value="Minnesota">Minnesota</option>\n' +
    '                              <option value="Mississippi">Mississippi</option>\n' +
    '                              <option value="Missouri">Missouri</option>\n' +
    '                              <option value="Montana">Montana</option>\n' +
    '                              <option value="Nebraska">Nebraska</option>\n' +
    '                              <option value="Nevada">Nevada</option>\n' +
    '                              <option value="New Hampshire">New Hampshire</option>\n' +
    '                              <option value="New Jersey">New Jersey</option>\n' +
    '                              <option value="New Mexico">New Mexico</option>\n' +
    '                              <option value="New York">New York</option>\n' +
    '                              <option value="North Carolina">North Carolina</option>\n' +
    '                              <option value="North Dakota">North Dakota</option>\n' +
    '                              <option value="Ohio">Ohio</option>\n' +
    '                              <option value="Oklahoma">Oklahoma</option>\n' +
    '                              <option value="Oregon">Oregon</option>\n' +
    '                              <option value="Pennsylvania">Pennsylvania</option>\n' +
    '                              <option value="Rhode Island">Rhode Island</option>\n' +
    '                              <option value="South Carolina">South Carolina</option>\n' +
    '                              <option value="South Dakota">South Dakota</option>\n' +
    '                              <option value="Tennessee">Tennessee</option>\n' +
    '                              <option value="Texas">Texas</option>\n' +
    '                              <option value="Utah">Utah</option>\n' +
    '                              <option value="Vermont">Vermont</option>\n' +
    '                              <option value="Virginia">Virginia</option>\n' +
    '                              <option value="Washington">Washington</option>\n' +
    '                              <option value="West Virginia">West Virginia</option>\n' +
    '                              <option value="Wisconsin">Wisconsin</option>\n' +
    '                              <option value="Wyoming">Wyoming</option>\'\n' +
    "                              </option>\n" +
    "                            </select>\n" +
    "                          </div>\n" +
    '<div class="form-group col-md-3" id="updateZip' +
    i +
    '">' +
    '<label for="inputZip">Zip</label>' +
    '<input name="Zip' +
    i +
    '" class="form-control" id="inputZip' +
    i +
    '">' +
    "</div>\n" +
    "\n" +
    "                        </div>\n" +
    "                      </div>\n";
  $("#createrestSectionDiv").append(addressSec);
  var dateRow =
    '<div class="form-row" id="dateSectionDiv' +
    i +
    '">' +
    '<div class="form-group col-md-6" id="updateDateTypeRow' +
    i +
    '">' +
    '<label for="inputDateType">Date Type</label>' +
    '<select id="inputDateType' +
    i +
    '" class="form-control" name="DateType' +
    i +
    '">' +
    "<option selected hidden>Choose</option>" +
    '<option value="Birthday">Birthday</option>' +
    '<option value="Anniversary">Anniversary</option>' +
    '<option value="Other">Other</option>' +
    "</option>\n" +
    "</select>\n" +
    "</div>\n" +
    '<div class="form-group col-md-6" id="updateDateRow' +
    i +
    '">' +
    '<label for="inputDate">Date</label>' +
    '<input name="Date' +
    i +
    '" class="form-control" id="inputDate' +
    i +
    '">' +
    "</div>\n" +
    "</div>\n";
  $("#createrestSectionDiv").append(dateRow);
}

function loadUpdateForm(formData) {
  emptyUpdateForm(formData);
  $("#inputFname").val(formData["fname"]);
  $("#inputMname").val(formData["mname"]);
  $("#inputLname").val(formData["lname"]);
  var addphoneButton =
    '<button type="button" name="delete" id="addphoneButton" class="btn btn-primary">Add Phone</button>';
  var delphoneButton =
    '<button type="button" name="delete" id="delphoneButton" class="btn btn-danger">Delete Phone</button>';

  $("#restSectionDiv").append(addphoneButton);
  $("#restSectionDiv").append(delphoneButton);

  var phonelen = formData["phones"].length;
  if (phonelen == 0) {
    var phoneRow =
      "<div class='form-row' id='phoneRow'>" +
      "<div class='form-group col-md-6' id='updatePhoneType'>" +
      "<label for='inputPhoneType'>Phone Type</label>" +
      "<select id='inputPhoneType' class='form-control'>" +
      "<option selected hidden>Choose...</option>" +
      "<option value='Cellular'>Cellular</option>" +
      "<option value='Home'>Home</option>" +
      "<option value='Work'>Work</option>" +
      "<option value='Other'>Other</option>" +
      "</option>" +
      "</select>" +
      "</div>" +
      "<div class='form-group col-md-6' id='updatePhoneNum'>" +
      "<label for='inputPhoneNumber'>Phone Number</label>" +
      "<input type='text' class='form-control' id='inputPhoneNumber'>" +
      "</div>" +
      "</div>";
    $("#restSectionDiv").append(phoneRow);
    $(`#inputPhoneType option[value='Choose...'`).prop("selected", true);
    $("#inputPhoneNumber" + i).val("");
  }
  for (i = 0; i < phonelen; i++) {
    var phoneRow =
      "<div class='form-row' id='phoneRow" +
      i +
      "'>" +
      "<div class='form-group col-md-6' id='updatePhoneType" +
      i +
      "'>" +
      "<label for='inputPhoneType'>Phone Type</label>" +
      "<select id='inputPhoneType" +
      i +
      "' class='form-control' name='PhoneType" +
      i +
      "'>" +
      "<option selected hidden>Choose...</option>" +
      "<option value='Cellular'>Cellular</option>" +
      "<option value='Home'>Home</option>" +
      "<option value='Work'>Work</option>" +
      "<option value='Other'>Other</option>" +
      "</option>" +
      "</select>" +
      "</div>" +
      "<div class='form-group col-md-6' id='updatePhoneNum" +
      i +
      "'>" +
      "<label for='inputPhoneNumber'>Phone Number</label>" +
      "<input name='PhoneNum" +
      i +
      "' class='form-control' id='inputPhoneNumber" +
      i +
      "'>" +
      "</div>" +
      "</div>";
    $("#restSectionDiv").append(phoneRow);
    $(`#inputPhoneType${i} option[value='${formData["phones"][i][0]}']`).prop(
      "selected",
      true
    );
    $("#inputPhoneNumber" + i).val(formData["phones"][i][2]);
  }
  var addaddressButton =
    '<button type="button" name="delete" id="addaddressButton" class="btn btn-primary">Add Address</button>';
  var deladdressButton =
    '<button type="button" name="delete" id="deladdressButton" class="btn btn-danger">Delete Address</button>';

  $("#restSectionDiv").append(addaddressButton);
  $("#restSectionDiv").append(deladdressButton);
  var addrlen = formData["addresses"].length;
  if (addrlen == 0) {
    var addressSec =
      '<div id="addressSectionDiv">' +
      '<div class="form-group" id="updateAddressRow1">' +
      '<label for="inputAddress">Address</label>' +
      '<input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">' +
      "</div>" +
      '<div class="form-row" id="updateAddressRow2">' +
      '<div class="form-group col-md-3" id="updateAddressType' +
      '">' +
      '<label for="inputAddressType">Address Type</label>' +
      '<select id="inputAddressType" class="form-control">' +
      "<option selected hidden>Choose...</option>" +
      '<option value="Home">Home</option>' +
      '<option value="Work">Work</option>' +
      '<option value="Other">Other</option>' +
      "</option>" +
      "</select>" +
      "</div>" +
      '<div class="form-group col-md-3" id="updateCity">' +
      '<label for="inputCity">City</label>' +
      '<input type="City" class="form-control" id="inputCity">' +
      "</div>" +
      '<div class="form-group col-md-3" id="updateState">' +
      '<label for="inputState">State</label>' +
      '<select id="inputState" class="form-control">' +
      "<option selected hidden>Choose...</option>" +
      '<option value="Alabama">Alabama</option>' +
      '<option value="Alaska">Alaska</option>' +
      '<option value="Arizona">Arizona</option>' +
      '<option value="Arkansas">Arkansas</option>\n' +
      '                              <option value="California">California</option>\n' +
      '<option value="Colorado">Colorado</option>\n' +
      '                              <option value="Connecticut">Connecticut</option>\n' +
      '                              <option value="Delaware">Delaware</option>\n' +
      '                              <option value="District Of Columbia">District Of Columbia</option>\n' +
      '                              <option value="Florida">Florida</option>\n' +
      '                              <option value="Georgia">Georgia</option>\n' +
      '                              <option value="Hawaii">Hawaii</option>\n' +
      '                              <option value="Idaho">Idaho</option>\n' +
      '                              <option value="Illinois">Illinois</option>\n' +
      '                              <option value="Indiana">Indiana</option>\n' +
      '                              <option value="Iowa">Iowa</option>\n' +
      '                              <option value="Kansas">Kansas</option>\n' +
      '                              <option value="Kentucky">Kentucky</option>\n' +
      '                              <option value="Louisiana">Louisiana</option>\n' +
      '                              <option value="Maine">Maine</option>\n' +
      '                              <option value="Maryland">Maryland</option>\n' +
      '                              <option value="Massachusetts">Massachusetts</option>\n' +
      '                              <option value="Michigan">Michigan</option>\n' +
      '                              <option value="Minnesota">Minnesota</option>\n' +
      '                              <option value="Mississippi">Mississippi</option>\n' +
      '                              <option value="Missouri">Missouri</option>\n' +
      '                              <option value="Montana">Montana</option>\n' +
      '                              <option value="Nebraska">Nebraska</option>\n' +
      '                              <option value="Nevada">Nevada</option>\n' +
      '                              <option value="New Hampshire">New Hampshire</option>\n' +
      '                              <option value="New Jersey">New Jersey</option>\n' +
      '                              <option value="New Mexico">New Mexico</option>\n' +
      '                              <option value="New York">New York</option>\n' +
      '                              <option value="North Carolina">North Carolina</option>\n' +
      '                              <option value="North Dakota">North Dakota</option>\n' +
      '                              <option value="Ohio">Ohio</option>\n' +
      '                              <option value="Oklahoma">Oklahoma</option>\n' +
      '                              <option value="Oregon">Oregon</option>\n' +
      '                              <option value="Pennsylvania">Pennsylvania</option>\n' +
      '                              <option value="Rhode Island">Rhode Island</option>\n' +
      '                              <option value="South Carolina">South Carolina</option>\n' +
      '                              <option value="South Dakota">South Dakota</option>\n' +
      '                              <option value="Tennessee">Tennessee</option>\n' +
      '                              <option value="Texas">Texas</option>\n' +
      '                              <option value="Utah">Utah</option>\n' +
      '                              <option value="Vermont">Vermont</option>\n' +
      '                              <option value="Virginia">Virginia</option>\n' +
      '                              <option value="Washington">Washington</option>\n' +
      '                              <option value="West Virginia">West Virginia</option>\n' +
      '                              <option value="Wisconsin">Wisconsin</option>\n' +
      '                              <option value="Wyoming">Wyoming</option>\'\n' +
      "                              </option>\n" +
      "                            </select>\n" +
      "                          </div>\n" +
      '<div class="form-group col-md-3" id="updateZip">' +
      '<label for="inputZip">Zip</label>' +
      '<input type="Zip" class="form-control" id="inputZip">' +
      "</div>\n" +
      "\n" +
      "                        </div>\n" +
      "                      </div>\n";
    $("#restSectionDiv").append(addressSec);
    $("#inputAddress" + i).val("");
    $(`#inputAddressType option[value='Choose...']`).prop("selected", true);
    $("#inputCity" + i).val("");
    $(`#inputState option[value='Choose...']`).prop("selected", true);
    $("#inputZip" + i).val("");
  }
  for (i = 0; i < addrlen; i++) {
    var addressSec =
      '<div id="addressSectionDiv' +
      i +
      '">' +
      '<div class="form-group" id="updateAddressRow1' +
      i +
      '">' +
      '<label for="inputAddress">Address</label>' +
      '<input name="Address' +
      i +
      '" class="form-control" id="inputAddress' +
      i +
      '" placeholder="1234 Main St">' +
      "</div>" +
      '<div class="form-row" id="updateAddressRow2' +
      i +
      '">' +
      '<div class="form-group col-md-3" id="updateAddressType' +
      '">' +
      '<label for="inputAddressType">Address Type</label>' +
      '<select id="inputAddressType' +
      i +
      '" class="form-control" name="AddressType' +
      i +
      '">' +
      "<option selected hidden>Choose...</option>" +
      '<option value="Home">Home</option>' +
      '<option value="Work">Work</option>' +
      '<option value="Other">Other</option>' +
      "</option>" +
      "</select>" +
      "</div>" +
      '<div class="form-group col-md-3" id="updateCity' +
      i +
      '">' +
      '<label for="inputCity">City</label>' +
      '<input name="City' +
      i +
      '" class="form-control" id="inputCity' +
      i +
      '">' +
      "</div>" +
      '<div class="form-group col-md-3" id="updateState' +
      i +
      '">' +
      '<label for="inputState">State</label>' +
      '<select id="inputState' +
      i +
      '" class="form-control" name ="State' +
      i +
      '">' +
      "<option selected hidden>Choose...</option>" +
      '<option value="Alabama">Alabama</option>' +
      '<option value="Alaska">Alaska</option>' +
      '<option value="Arizona">Arizona</option>' +
      '<option value="Arkansas">Arkansas</option>\n' +
      '                              <option value="California">California</option>\n' +
      '<option value="Colorado">Colorado</option>\n' +
      '                              <option value="Connecticut">Connecticut</option>\n' +
      '                              <option value="Delaware">Delaware</option>\n' +
      '                              <option value="District Of Columbia">District Of Columbia</option>\n' +
      '                              <option value="Florida">Florida</option>\n' +
      '                              <option value="Georgia">Georgia</option>\n' +
      '                              <option value="Hawaii">Hawaii</option>\n' +
      '                              <option value="Idaho">Idaho</option>\n' +
      '                              <option value="Illinois">Illinois</option>\n' +
      '                              <option value="Indiana">Indiana</option>\n' +
      '                              <option value="Iowa">Iowa</option>\n' +
      '                              <option value="Kansas">Kansas</option>\n' +
      '                              <option value="Kentucky">Kentucky</option>\n' +
      '                              <option value="Louisiana">Louisiana</option>\n' +
      '                              <option value="Maine">Maine</option>\n' +
      '                              <option value="Maryland">Maryland</option>\n' +
      '                              <option value="Massachusetts">Massachusetts</option>\n' +
      '                              <option value="Michigan">Michigan</option>\n' +
      '                              <option value="Minnesota">Minnesota</option>\n' +
      '                              <option value="Mississippi">Mississippi</option>\n' +
      '                              <option value="Missouri">Missouri</option>\n' +
      '                              <option value="Montana">Montana</option>\n' +
      '                              <option value="Nebraska">Nebraska</option>\n' +
      '                              <option value="Nevada">Nevada</option>\n' +
      '                              <option value="New Hampshire">New Hampshire</option>\n' +
      '                              <option value="New Jersey">New Jersey</option>\n' +
      '                              <option value="New Mexico">New Mexico</option>\n' +
      '                              <option value="New York">New York</option>\n' +
      '                              <option value="North Carolina">North Carolina</option>\n' +
      '                              <option value="North Dakota">North Dakota</option>\n' +
      '                              <option value="Ohio">Ohio</option>\n' +
      '                              <option value="Oklahoma">Oklahoma</option>\n' +
      '                              <option value="Oregon">Oregon</option>\n' +
      '                              <option value="Pennsylvania">Pennsylvania</option>\n' +
      '                              <option value="Rhode Island">Rhode Island</option>\n' +
      '                              <option value="South Carolina">South Carolina</option>\n' +
      '                              <option value="South Dakota">South Dakota</option>\n' +
      '                              <option value="Tennessee">Tennessee</option>\n' +
      '                              <option value="Texas">Texas</option>\n' +
      '                              <option value="Utah">Utah</option>\n' +
      '                              <option value="Vermont">Vermont</option>\n' +
      '                              <option value="Virginia">Virginia</option>\n' +
      '                              <option value="Washington">Washington</option>\n' +
      '                              <option value="West Virginia">West Virginia</option>\n' +
      '                              <option value="Wisconsin">Wisconsin</option>\n' +
      '                              <option value="Wyoming">Wyoming</option>\'\n' +
      "                              </option>\n" +
      "                            </select>\n" +
      "                          </div>\n" +
      '<div class="form-group col-md-3" id="updateZip' +
      i +
      '">' +
      '<label for="inputZip">Zip</label>' +
      '<input name="Zip' +
      i +
      '" class="form-control" id="inputZip' +
      i +
      '">' +
      "</div>\n" +
      "\n" +
      "                        </div>\n" +
      "                      </div>\n";
    $("#restSectionDiv").append(addressSec);
    $("#inputAddress" + i).val(formData["addresses"][i][1]);
    $(
      `#inputAddressType${i} option[value='${formData["addresses"][i][0]}']`
    ).prop("selected", true);
    $("#inputCity" + i).val(formData["addresses"][i][2]);
    $(`#inputState${i} option[value='${formData["addresses"][i][3]}']`).prop(
      "selected",
      true
    );
    $("#inputZip" + i).val(formData["addresses"][i][4]);
  }
  var adddateButton =
    '<button type="button" name="delete" id="adddateButton" class="btn btn-primary">Add Date</button>';
  var deldateButton =
    '<button type="button" name="delete" id="deldateButton" class="btn btn-danger">Delete Date</button>';

  $("#restSectionDiv").append(adddateButton);
  $("#restSectionDiv").append(deldateButton);
  var datelen = formData["dates"].length;
  if (datelen == 0) {
    var dateRow =
      '<div class="form-row" id="dateSectionDiv">' +
      '<div class="form-group col-md-6" id="updateDateTypeRow">' +
      '<label for="inputDateType">Date Type</label>' +
      '<select id="inputDateType" class="form-control">' +
      "<option selected hidden>Choose</option>" +
      '<option value="Birthday">Birthday</option>' +
      '<option value="Anniversary">Anniversary</option>' +
      '<option value="Other">Other</option>' +
      "</option>\n" +
      "</select>\n" +
      "</div>\n" +
      '<div class="form-group col-md-6" id="updateDateRow">' +
      '<label for="inputDate">Date</label>' +
      '<input type="Date" class="form-control" id="inputDate">' +
      "</div>\n" +
      "</div>\n";
    $("#restSectionDiv").append(dateRow);
    $(`#inputDateType option[value='Choose...']`).prop("selected", true);
    $("#inputDate" + i).val("");
  }
  for (i = 0; i < datelen; i++) {
    var dateRow =
      '<div class="form-row" id="dateSectionDiv' +
      i +
      '">' +
      '<div class="form-group col-md-6" id="updateDateTypeRow' +
      i +
      '">' +
      '<label for="inputDateType">Date Type</label>' +
      '<select id="inputDateType' +
      i +
      '" class="form-control" name="DateType' +
      i +
      '">' +
      "<option selected hidden>Choose</option>" +
      '<option value="Birthday">Birthday</option>' +
      '<option value="Anniversary">Anniversary</option>' +
      '<option value="Other">Other</option>' +
      "</option>\n" +
      "</select>\n" +
      "</div>\n" +
      '<div class="form-group col-md-6" id="updateDateRow' +
      i +
      '">' +
      '<label for="inputDate">Date</label>' +
      '<input name="Date' +
      i +
      '" class="form-control" id="inputDate' +
      i +
      '">' +
      "</div>\n" +
      "</div>\n";
    $("#restSectionDiv").append(dateRow);
    $(`#inputDateType${i} option[value='${formData["dates"][i][0]}']`).prop(
      "selected",
      true
    );
    $("#inputDate" + i).val(formData["dates"][i][1]);
  }

  $("#addphoneButton").on("click", function () {
    var i = currentPhoneLength;
    var phoneRow =
      "<div class='form-row' id='phoneRow" +
      i +
      "'>" +
      "<div class='form-group col-md-6' id='updatePhoneType" +
      i +
      "'>" +
      "<label for='inputPhoneType'>Phone Type</label>" +
      "<select id='inputPhoneType" +
      i +
      "' class='form-control' name='PhoneType" +
      i +
      "'>" +
      "<option selected hidden>Choose...</option>" +
      "<option value='Cellular'>Cellular</option>" +
      "<option value='Home'>Home</option>" +
      "<option value='Work'>Work</option>" +
      "<option value='Other'>Other</option>" +
      "</option>" +
      "</select>" +
      "</div>" +
      "<div class='form-group col-md-6' id='updatePhoneNum" +
      i +
      "'>" +
      "<label for='inputPhoneNumber'>Phone Number</label>" +
      "<input name='PhoneNum" +
      i +
      "' class='form-control' id='inputPhoneNumber" +
      i +
      "'>" +
      "</div>" +
      "</div>";
    $(phoneRow).insertAfter("#phoneRow" + (i - 1));
    currentPhoneLength++;
  });
  $("#delphoneButton").on("click", function () {
    $("#phoneRow" + (currentPhoneLength - 1)).remove();
    currentPhoneLength--;
  });

  $("#adddateButton").on("click", function () {
    var i = currentDateLength;
    var dateRow =
      '<div class="form-row" id="dateSectionDiv' +
      i +
      '">' +
      '<div class="form-group col-md-6" id="updateDateTypeRow' +
      i +
      '">' +
      '<label for="inputDateType">Date Type</label>' +
      '<select id="inputDateType' +
      i +
      '" class="form-control" name="DateType' +
      i +
      '">' +
      "<option selected hidden>Choose</option>" +
      '<option value="Birthday">Birthday</option>' +
      '<option value="Anniversary">Anniversary</option>' +
      '<option value="Other">Other</option>' +
      "</option>\n" +
      "</select>\n" +
      "</div>\n" +
      '<div class="form-group col-md-6" id="updateDateRow' +
      i +
      '">' +
      '<label for="inputDate">Date</label>' +
      '<input name="Date' +
      i +
      '" class="form-control" id="inputDate' +
      i +
      '">' +
      "</div>\n" +
      "</div>\n";
    $(dateRow).insertAfter("#dateSectionDiv" + (i - 1));
    currentDateLength++;
  });
  $("#deldateButton").on("click", function () {
    $("#dateSectionDiv" + (currentDateLength - 1)).remove();
    currentDateLength--;
  });

  $("#addaddressButton").on("click", function () {
    var i = currentAddressLength;
    var addressRow =
      '<div id="addressSectionDiv' +
      i +
      '">' +
      '<div class="form-group" id="updateAddressRow1' +
      i +
      '">' +
      '<label for="inputAddress">Address</label>' +
      '<input name="Address' +
      i +
      '" class="form-control" id="inputAddress' +
      i +
      '" placeholder="1234 Main St">' +
      "</div>" +
      '<div class="form-row" id="updateAddressRow2' +
      i +
      '">' +
      '<div class="form-group col-md-3" id="updateAddressType' +
      '">' +
      '<label for="inputAddressType">Address Type</label>' +
      '<select id="inputAddressType' +
      i +
      '" class="form-control" name="AddressType' +
      i +
      '">' +
      "<option selected hidden>Choose...</option>" +
      '<option value="Home">Home</option>' +
      '<option value="Work">Work</option>' +
      '<option value="Other">Other</option>' +
      "</option>" +
      "</select>" +
      "</div>" +
      '<div class="form-group col-md-3" id="updateCity' +
      i +
      '">' +
      '<label for="inputCity">City</label>' +
      '<input name="City' +
      i +
      '" class="form-control" id="inputCity' +
      i +
      '">' +
      "</div>" +
      '<div class="form-group col-md-3" id="updateState' +
      i +
      '">' +
      '<label for="inputState">State</label>' +
      '<select id="inputState' +
      i +
      '" class="form-control" name ="State' +
      i +
      '">' +
      "<option selected hidden>Choose...</option>" +
      '<option value="Alabama">Alabama</option>' +
      '<option value="Alaska">Alaska</option>' +
      '<option value="Arizona">Arizona</option>' +
      '<option value="Arkansas">Arkansas</option>\n' +
      '                              <option value="California">California</option>\n' +
      '<option value="Colorado">Colorado</option>\n' +
      '                              <option value="Connecticut">Connecticut</option>\n' +
      '                              <option value="Delaware">Delaware</option>\n' +
      '                              <option value="District Of Columbia">District Of Columbia</option>\n' +
      '                              <option value="Florida">Florida</option>\n' +
      '                              <option value="Georgia">Georgia</option>\n' +
      '                              <option value="Hawaii">Hawaii</option>\n' +
      '                              <option value="Idaho">Idaho</option>\n' +
      '                              <option value="Illinois">Illinois</option>\n' +
      '                              <option value="Indiana">Indiana</option>\n' +
      '                              <option value="Iowa">Iowa</option>\n' +
      '                              <option value="Kansas">Kansas</option>\n' +
      '                              <option value="Kentucky">Kentucky</option>\n' +
      '                              <option value="Louisiana">Louisiana</option>\n' +
      '                              <option value="Maine">Maine</option>\n' +
      '                              <option value="Maryland">Maryland</option>\n' +
      '                              <option value="Massachusetts">Massachusetts</option>\n' +
      '                              <option value="Michigan">Michigan</option>\n' +
      '                              <option value="Minnesota">Minnesota</option>\n' +
      '                              <option value="Mississippi">Mississippi</option>\n' +
      '                              <option value="Missouri">Missouri</option>\n' +
      '                              <option value="Montana">Montana</option>\n' +
      '                              <option value="Nebraska">Nebraska</option>\n' +
      '                              <option value="Nevada">Nevada</option>\n' +
      '                              <option value="New Hampshire">New Hampshire</option>\n' +
      '                              <option value="New Jersey">New Jersey</option>\n' +
      '                              <option value="New Mexico">New Mexico</option>\n' +
      '                              <option value="New York">New York</option>\n' +
      '                              <option value="North Carolina">North Carolina</option>\n' +
      '                              <option value="North Dakota">North Dakota</option>\n' +
      '                              <option value="Ohio">Ohio</option>\n' +
      '                              <option value="Oklahoma">Oklahoma</option>\n' +
      '                              <option value="Oregon">Oregon</option>\n' +
      '                              <option value="Pennsylvania">Pennsylvania</option>\n' +
      '                              <option value="Rhode Island">Rhode Island</option>\n' +
      '                              <option value="South Carolina">South Carolina</option>\n' +
      '                              <option value="South Dakota">South Dakota</option>\n' +
      '                              <option value="Tennessee">Tennessee</option>\n' +
      '                              <option value="Texas">Texas</option>\n' +
      '                              <option value="Utah">Utah</option>\n' +
      '                              <option value="Vermont">Vermont</option>\n' +
      '                              <option value="Virginia">Virginia</option>\n' +
      '                              <option value="Washington">Washington</option>\n' +
      '                              <option value="West Virginia">West Virginia</option>\n' +
      '                              <option value="Wisconsin">Wisconsin</option>\n' +
      '                              <option value="Wyoming">Wyoming</option>\'\n' +
      "                              </option>\n" +
      "                            </select>\n" +
      "                          </div>\n" +
      '<div class="form-group col-md-3" id="updateZip' +
      i +
      '">' +
      '<label for="inputZip">Zip</label>' +
      '<input name="Zip' +
      i +
      '" class="form-control" id="inputZip' +
      i +
      '">' +
      "</div>\n" +
      "\n" +
      "                        </div>\n" +
      "                      </div>\n";
    console.log("Adding the addr div here");
    $(addressRow).insertAfter("#addressSectionDiv" + (i - 1));
    currentAddressLength++;
  });
  $("#deladdressButton").on("click", function () {
    $("#addressSectionDiv" + (currentAddressLength - 1)).remove();
    currentAddressLength--;
  });
}

function emptyUpdateForm(formData) {
  $("#inputFname").val("");
  $("#inputMname").val("");
  $("#inputLname").val("");
  $("#restSectionDiv").empty();
}

function loadName(details) {
  $("#nameRow").empty();
  var item = '<tr><td width="33%"> First Name: ' + details["fname"] + "</td>";
  if (details["mname"] != "") {
    item += '<td width="33%"> Middle Name: ' + details["mname"] + "</td>";
  } else {
    item += '<td width="33%"></td>';
  }
  if (details["lname"] != "") {
    item += '<td width="33%"> Last Name: ' + details["lname"] + "</td></tr>";
  } else {
    item += '<td width="33%> Last Name:</td>';
  }

  $("#nameRow").append(item);
}

function loadPhone(details) {
  $("#phoneRow").empty();
  len = details["phones"].length;
  currentPhoneLength = len;
  if (len > 0) {
    for (i = 0; i < len; i++) {
      var item =
        "<tr p_id='" +
        details["phones"][i][3] +
        "' id='phone" +
        i +
        '\'><td width="33%"> Phone Type: ' +
        details["phones"][i][0] +
        '</td><td width="33%"> Area Code: ' +
        details["phones"][i][1] +
        '</td><td width="33%"> Phone Number: ' +
        details["phones"][i][2] +
        "</td></tr>";
      $("#phoneRow").append(item);
    }
  }
}

function loadAddress(details) {
  $("#addressRow").empty();
  len = details["addresses"].length;
  currentAddressLength = len;
  if (len > 0) {
    for (i = 0; i < len; i++) {
      var item;
      if (details["addresses"][i][0] != "") {
        item +=
          "<tr a_id='" +
          details["addresses"][i][5] +
          "' id='address" +
          i +
          '\' ><td width="33%"> Address Type: ' +
          details["addresses"][i][0] +
          "</td>";
      }
      if (details["addresses"][i][1] != "") {
        item +=
          '<td width="33%"> Address: ' + details["addresses"][i][1] + "</tr>";
      }
      if (details["addresses"][i][2] != "") {
        item +=
          '<tr></td><td width="33%"> City: ' +
          details["addresses"][i][2] +
          "</td>";
      }
      if (details["addresses"][i][3] != "") {
        item +=
          '<td width="33%"> State: ' + details["addresses"][i][3] + "</td>";
      }
      if (details["addresses"][i][4] != "") {
        item +=
          '<td width="33%"> Zip: ' + details["addresses"][i][4] + "</td></tr>";
      }
    }
  }
  $("#addressRow").append(item);
}

function loadDates(details) {
  $("#dateRow").empty();
  len = details["dates"].length;
  currentDateLength = len;
  if (len > 0) {
    for (i = 0; i < len; i++) {
      var item;
      if (details["dates"][i][0] != "") {
        item +=
          `<tr d_id=${details["dates"][i][2]} id='date${i}'><td width='33%'> Date Type: ` +
          details["dates"][i][0] +
          "</td>";
      }
      if (details["dates"][i][1] != "") {
        item += '<td width="33%"> Date: ' + details["dates"][i][1] + "</tr>";
      }
    }
  }
  $("#dateRow").append(item);
}

// 800 w renner rd
// 800 951 951 El Camino Real

// SEARCH COMPONENT
function processSearchArguments(searchQuery) {
  if (searchQuery.length == 0) {
    $("#contactsList").empty();
    loadContactList();
    return;
  }

  var searchTerms = searchQuery.split(" ");

  var area_code = [];
  var zip = [];
  var phone_number = [];
  var address = [];
  var misc = [];
  var date_value = [];
  searchTerms.forEach((term, i) => {
    //console.log(term);
    if (term.length == 3 && !isNaN(term)) {
      area_code.push(term);
    } else if (term.length == 5 && !isNaN(term)) {
      zip.push(term);
    } else if (term.length == 10 && !isNaN(term)) {
      term = term.slice(0, 3) + "-" + term.slice(3, 6) + "-" + term.slice(6);
      phone_number.push(term);
    } else if (term.includes("-")) {
      if (!isNaN(term.replace(/-/g, ""))) {
        console.log(term.replace(/-/g, ""));
        date_value.push(term);
      } else {
        address.push(term.replace(/-/g, " ").toUpperCase());
      }
    } else {
      misc.push(term.toUpperCase());
    }
  });
  console.log(date_value);

  $.ajax({
    url: "search_contacts.php", // url where to submit the request
    type: "GET", // data type
    data: {
      area_code: area_code,
      zip: zip,
      phone_number: phone_number,
      address: address,
      misc: misc,
      date_value: date_value,
    },
    success: function (data) {
      console.log(data);
      $("#contactsList").empty();
      $.each(data, function (key, value) {
        console.log(key, value);
        var record = value[1] + " " + value[2] + " " + value[3];
        var listItem =
          '<li id="' +
          value[0] +
          '" class="list-group-item list-group-item-action">' +
          record +
          "</li>";
        $("#contactsList").append(listItem);
      });
      $(".list-group-item").on("click", function () {
        // alert($(this).text());
        var itemId = $(this).attr("id");
        loadDetails(itemId);
        currentGlobalContactid = itemId;
      });
    },
    error: function (result) {
      console.log(result.responseText);
    },
  });
}
