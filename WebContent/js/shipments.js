window.onload = function()
{
  init();
}
var body = document.querySelector("body");
var buttonsDiv = document.getElementById("buttonsDiv");
var shipments;
var search;
var add;

var searchForm;
var searchInput;
var searchSubmit;

var addForm;
var addBuyer;
var addItem;
var addTracking;
var addSubmit;

var updateForm;

function init()
{
  createButtons();
	shipments.addEventListener("click", function()
	{
    checkAndRemove();
  	requestdata(name);
	});

  search.addEventListener("click", function()
	{
    console.log("in search");
    checkAndRemove();
    createSearchForm();
    searchForm.searchSubmit.addEventListener("click", function(e)
    {
      e.preventDefault();
      shipmentsTable = document.getElementById("shipmentsTable");
      if(shipmentsTable)
      {
        shipmentsTable.parentNode.removeChild(shipmentsTable);
      }
      updateButton = document.getElementById("updateButton");
      if(updateButton)
      {
        updateButton.parentNode.removeChild(updateButton);
      }
      searching(name);
    });
	});

  add.addEventListener("click", function()
	{
    console.log("in add shipment");
    checkAndRemove();
    createAddForm();
    addForm.addSubmit.addEventListener("click", function(e)
    {
      e.preventDefault();
      var pass = validate();
      if (pass)
      {
        console.log("in if pass");
        var buyer = document.addForm.addBuyer.value;
        var item = document.addForm.addItem.value;
        var tracking = document.addForm.addTracking.value;
        var obj = {"buyer":buyer, "item":item, "tracking":tracking};
        updateData("POST", "rest/data", obj);
      }
    });
	});
  // var deleteID = document.deleteID;
  // deleteID.submit.addEventListener("click", function (e)
	// {
  //   e.preventDefault();
  //   var input = document.deleteID.select.value;
  //   var obj = {"id":input};
  // 	updateData("DELETE", "http://localhost:8080/MPGTracker/rest/mpg/" + input, obj);
  //   // method, url, object, callback
	// });
}

function checkAndRemove()
{
  shipmentsTable = document.getElementById("shipmentsTable");
  if(shipmentsTable)
  {
    shipmentsTable.parentNode.removeChild(shipmentsTable);
  }
  searchForm = document.getElementById("searchForm");
  if(searchForm)
  {
    searchForm.parentNode.removeChild(searchForm);
  }
  addForm = document.getElementById("addForm");
  if(addForm)
  {
    addForm.parentNode.removeChild(addForm);
  }
  updateForm = document.getElementById("updateForm");
  if(updateForm)
  {
    updateForm.parentNode.removeChild(updateForm);
  }
  updateButton = document.getElementById("updateButton");
  if(updateButton)
  {
    updateButton.parentNode.removeChild(updateButton);
  }
  updateTable = document.getElementById("updateTable");
  if(updateTable)
  {
    updateTable.parentNode.removeChild(updateTable);
  }
}

function createButtons()
{
  shipments = document.createElement("button");
  shipments.setAttribute("class", "buttons");
  shipments.innerHTML = "Shipments";
  buttonsDiv.appendChild(shipments);
  search = document.createElement("button");
  search.setAttribute("class", "buttons");
  search.innerHTML = "Search";
  buttonsDiv.appendChild(search);
  add = document.createElement("button");
  add.setAttribute("class", "buttons");
  add.innerHTML = "Add";
  buttonsDiv.appendChild(add);
}

function createSearchForm()
{
  searchForm = document.createElement("form");
  searchForm.setAttribute("name", "searchForm");
  searchForm.setAttribute("id", "searchForm");
  searchInput = document.createElement("input");
  searchInput.setAttribute("name", "searchInput");
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("placeholder", "search");
  searchForm.appendChild(searchInput);
  searchSubmit = document.createElement("input");
  searchSubmit.setAttribute("name", "searchSubmit");
  searchSubmit.setAttribute("type", "submit");
  searchSubmit.setAttribute("class", "buttons");
  searchSubmit.setAttribute("value", "search");
  searchForm.appendChild(searchSubmit);
  body.appendChild(searchForm);
}

function createAddForm()
{
  addForm = document.createElement("form");
  addForm.setAttribute("name", "addForm");
  addForm.setAttribute("id", "addForm");
  addBuyer = document.createElement("input");
  addBuyer.setAttribute("name", "addBuyer");
  addBuyer.setAttribute("type", "text");
  addBuyer.setAttribute("placeholder", "buyer");
  addForm.appendChild(addBuyer);
  addItem = document.createElement("input");
  addItem.setAttribute("name", "addItem");
  addItem.setAttribute("type", "text");
  addItem.setAttribute("placeholder", "item");
  addForm.appendChild(addItem);
  addTracking = document.createElement("input");
  addTracking.setAttribute("name", "addTracking");
  addTracking.setAttribute("type", "text");
  addTracking.setAttribute("placeholder", "tracking");
  addForm.appendChild(addTracking);
  addSubmit = document.createElement("input");
  addSubmit.setAttribute("name", "addSubmit");
  addSubmit.setAttribute("type", "submit");
  addSubmit.setAttribute("class", "buttons");
  addSubmit.setAttribute("value", "add");
  addForm.appendChild(addSubmit);
  body.appendChild(addForm);
}

function validate()
{
  console.log("in validate");
  var buyer = document.addForm.addBuyer.value;
  var item = document.addForm.addItem.value;
  var tracking = document.addForm.addTracking.value;
  console.log(buyer + " " + item + " " + tracking);
  if (buyer === "" || item === "" || tracking === "")
  {
    return false;
  }
  else
  {
    return true;
  }
  console.log(buyer + " " + item + " " + tracking);
}

var requestdata = function(callback)
{
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "rest/getData");
  xhr.onreadystatechange = function()
  {
    if (xhr.readyState == 4 && xhr.status < 400 )
    {
      var array = JSON.parse(xhr.responseText);
      callback(array);
    }
  };
  xhr.send(null);
};

var searching = function(callback)
{
  var searchText = document.searchForm.searchInput.value;
  console.log(searchText)
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "rest/getData/" + searchText);
  xhr.onreadystatechange = function()
  {
    if (xhr.readyState == 4 && xhr.status < 400 )
    {
      var array = JSON.parse(xhr.responseText);
      callback(array);
    }
  };
  xhr.send(null);
};

function name(array)
{
  var shipmentsTable = document.createElement("table");
  shipmentsTable.setAttribute("id", "shipmentsTable");
  var tr = document.createElement("tr");
  var th = document.createElement("th");
  th.innerHTML = "Buyer";
  tr.appendChild(th);
  var th = document.createElement("th");
  th.innerHTML = "Item";
  tr.appendChild(th);
  var th = document.createElement("th");
  th.innerHTML = "Tracking";
  tr.appendChild(th);
  shipmentsTable.appendChild(tr);
  var radioButtonsArray = [];
  for (var i = 0; i < array.length; i++)
  {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var arrayBuyer = array[i].buyer;
    td.innerHTML = array[i].buyer;
    tr.appendChild(td);
    var td = document.createElement("td");
    var arrayItem = array[i].item;
    td.innerHTML = array[i].item;
    tr.appendChild(td);
    var td = document.createElement("td");
    var arrayTracking = array[i].tracking;
    td.innerHTML = array[i].tracking;
    tr.appendChild(td);
    var td = document.createElement("td");
    var radio = document.createElement("input");
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "radioButton");
    radio.setAttribute("value", i);
    // radio.setAttribute("class", "buttons");
    radioButtonsArray.push(radio);
    td.appendChild(radio);
    tr.appendChild(td);
    shipmentsTable.appendChild(tr);
  }
  body.appendChild(shipmentsTable);
  var updateButton = document.createElement("button");
  updateButton.setAttribute("id", "updateButton");
  updateButton.innerHTML = "update";
  updateButton.setAttribute("class", "buttons");
  body.appendChild(updateButton);
  updateButton.addEventListener("click", function()
  {
    for (var j = 0; j < radioButtonsArray.length; j++)
    {
      if (radioButtonsArray[j].checked === true)
      {
        var id = radioButtonsArray[j].value;
        for (var k = 0; k < array.length; k++)
        {
          var updateForm = document.createElement("form");
          updateForm.setAttribute("name", "updateForm");
          updateForm.setAttribute("id", "updateForm");
          var updateBuyer = document.createElement("input");
          updateBuyer.setAttribute("name", "updateBuyer");
          updateBuyer.setAttribute("type", "text");
          updateBuyer.setAttribute("value", array[id].buyer);
          updateForm.appendChild(updateBuyer);
          var updateItem = document.createElement("input");
          updateItem.setAttribute("name", "updateItem");
          updateItem.setAttribute("type", "text");
          updateItem.setAttribute("value", array[id].item);
          updateForm.appendChild(updateItem);
          var updateTracking = document.createElement("input");
          updateTracking.setAttribute("name", "updateTracking");
          updateTracking.setAttribute("type", "text");
          updateTracking.setAttribute("value", array[id].tracking);
          updateForm.appendChild(updateTracking);
          var updateSubmit = document.createElement("input");
          updateSubmit.setAttribute("type", "submit");
          updateSubmit.setAttribute("name", "updateSubmit");
          updateSubmit.setAttribute("value", "update");
          updateSubmit.setAttribute("class", "buttons");
          updateForm.appendChild(updateSubmit);
          checkAndRemove();
          var updateTable = document.createElement("table");
          updateTable.setAttribute("id", "updateTable");
          var tr = document.createElement("tr");
          var th = document.createElement("th");
          th.innerHTML = "Buyer";
          tr.appendChild(th);
          var th = document.createElement("th");
          th.innerHTML = "Item";
          tr.appendChild(th);
          var th = document.createElement("th");
          th.innerHTML = "Tracking";
          tr.appendChild(th);
          updateTable.appendChild(tr);
          body.appendChild(updateTable);
          body.appendChild(updateForm);

          updateForm.updateSubmit.addEventListener("click", function(e)
          {
            e.preventDefault();
            var buyer = document.updateForm.updateBuyer.value;
            var item = document.updateForm.updateItem.value;
            var tracking = document.updateForm.updateTracking.value;
            var newObj = {"buyer":buyer, "item":item, "tracking":tracking};
            id++;
            updateData("PUT", "rest/update/"+id, newObj);
          });
        }
      }
    }
  });
}

function updateData(method, url, object, callback)
{
    var xhr = new XMLHttpRequest();
    xhr.open(method,url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange=function ()
    {
        // console.log(xhr.status);
        // console.log(xhr.readyState);
        // console.log(xhr.responseText);
        // console.log(xhr.getAllResponseHeaders());
    }
    if (object)
    {
        xhr.send(JSON.stringify(object));
    }
    else
    {
        xhr.send(null);
    }
    checkAndRemove();
}
