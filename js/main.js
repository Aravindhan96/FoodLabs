var phoneNumber;
sessionStorage.setItem('Points',60);
var mailBody;
var itemList = [];
var favList = [];
var totalItemsTotal = 0;
var totalItemDiscount = 0




function enableButton(id) {
  len = document.getElementById(id).value.length;

  if (len == 10) {
    document.getElementById("btnOTPtest").disabled = false;
    phoneNumber = document.getElementById(id).value;

  } else {
    document.getElementById("btnOTPtest").disabled = true;
  }
}

function enableButtonRating(id) {
  document.getElementById("btnRating").disabled = false;
}

function enableButtonName(id) {
    document.getElementById("btnname").disabled = false;
}

function enableButtonEmail(id) {
  document.getElementById("btnemail").disabled = false;
}

function submitPhone() {
  var otpTimer = 45;
  var timer = setInterval(countdown, 1000);
  
  function countdown() {    
      if (otpTimer == -1) {
          clearTimeout(timer);
          window.location.href = "login.html"; 
      } else {
        document.getElementById('otpTimermsg').innerHTML = 'Resend code in 00:'+otpTimer ;
        otpTimer--;
      }
      //todo remove
    if (otpTimer == 1){
      clearTimeout(timer)
    }
  }

  phoneNumber = document.getElementById('inputTel').value;

  //todo send otp to phone
message = " We sent it to the number +94 "+phoneNumber;

  //   document.location = "#otpCode";
  window.location.href = "#otpCode";
  document.getElementById(
    "otptelno"
  ).innerHTML = message;
}

function verifyOTP(id) {
  var otp = 1111;
  value = document.getElementById(id).value;
  otpMessage = " Did you enter the correct phone number? ";

  if (value.length == 4) {
    if (value == otp) {
      window.location.href = "home.html";
    } else {
      document.getElementById(
        "resendOTPtext"
      ).innerHTML = otpMessage;
    }
  }
}

function verifyOTPSignup(id) {
  var otp = 2222;
  value = document.getElementById(id).value;
  otpMessage = " Did you enter the correct phone number? ";

  if (value.length == 4) {
    if (value == otp) {
      window.location.href = "#enterName";
    } else {
      document.getElementById(
        "resendOTPtext"
      ).innerHTML = otpMessage;
    }
  }
}

function addlocation(){

  window.location.href = "#addLocation1";

}  

function sendFavList(){
  var Flist = JSON.parse(sessionStorage.getItem('itemList'))
  // alert(Flist[0].name)
  mailBody = 
'<html> '+
'  <body>'+
'<h1>Your Favourites List</h1>'+
'  <div id="restuarants" class="ui-body-d">'+
'<h3>Your Favourite Dishes</h3>'+
'     <div class="search-tiles dioni-delight">'+
'        <div>'+
'         <p class="category-name" style="'+
'">'+Flist[0].name+' By '+Flist[0].restaurant+'</p>'+
'        </div>'+
'     </div>'+
'     </div>'+
'   </div>'+
'  </body>'+
'</html>'
  sendEmail()
}

function sendEmail() {

  Email.send({
      Host : "smtp.gmail.com",
      Username : "email.foodlabs@gmail.com",
      Password : "foodlabs123",
      To : 'shashane.2017315@iit.ac.lk,gevin.2016375@iit.ac.lk,pubudu.2017154@iit.ac.lk,aravindhan.2016059@iit.ac.lk',
      From : "email.foodlabs@gmail.com",
      Subject : "Favourites List",
      Body :mailBody

  })
  
      .then(function (message) {
      alert("mail sent Successfully")
      });
  

  }
  function addedtoCart(){
    var itemname = document.getElementById('itemName').textContent
    var itemprice = document.getElementById('itemPrice').textContent
    var itemdiscount = document.getElementById('itemDiscount').textContent
    var itemQuantity = document.getElementById('itemQuantity').value
    var cartItem = {name:itemname,quantity:itemQuantity,unitPrice:itemprice,discount:30}
    itemList.push(cartItem)
    sessionStorage.setItem('itemList',JSON.stringify(itemList))
    Listitem = (JSON.parse(sessionStorage.getItem('itemList')))
    window.location.href = "mycart.html";
  }

  function loadCart(){
    // alert("mo")
    Listitem = (JSON.parse(sessionStorage.getItem('itemList')))
    // alert(Listitem[0].unitPrice)
    // alert(Listitem[0].discount)
    // alert(Listitem[0].quantity)
    // alert((Listitem[0].quantity) * (Listitem[0].unitPrice))
    var unitDiscountValue = ((Listitem[0].quantity) * (Listitem[0].unitPrice)) * ((Listitem[0].discount)/100)
    var unitItemtotal =((Listitem[0].quantity) * (Listitem[0].unitPrice)) - (unitDiscountValue)

    document.getElementById('itemname').innerHTML = (Listitem[0].name)
    document.getElementById('quantity').innerHTML = (Listitem[0].quantity)+' *'
    document.getElementById('price').innerHTML = 'LKR '+(Listitem[0].unitPrice)
    document.getElementById('discount').innerHTML = 'Discount '+(Listitem[0].discount)+'%'
    document.getElementById('total').innerHTML = 'LKR '+(unitItemtotal)
    totalItemsTotal = totalItemsTotal + (Listitem[0].quantity) * (Listitem[0].unitPrice)
    totalItemDiscount = totalItemDiscount + unitDiscountValue

    document.getElementById('itemsTotal').innerHTML = 'LKR '+(totalItemsTotal)
    document.getElementById('itemsDiscount').innerHTML = 'LKR '+(totalItemDiscount)

    document.getElementById('GrandTotal').innerHTML = 'LKR '+(totalItemsTotal - totalItemDiscount)

  }

  function clearItem(){
    document.getElementById('item1').style.visibility = "hidden"
    totalItemsTotal = 0
    totalItemDiscount = 0
    document.getElementById('itemsTotal').innerHTML = 'LKR '+(totalItemsTotal)
    document.getElementById('itemsDiscount').innerHTML = 'LKR '+(totalItemDiscount)
  }

  function addFavourite(){
    var itemname = document.getElementById('itemName').textContent
    var itemrestaurant = "Dioni's Delight";
    var favItem = {name : itemname,restaurant: itemrestaurant }
    favList.push(favItem)
    sessionStorage.setItem('favList',JSON.stringify(favList))
  }

// function qrcode(){
//   var qrscanner = new Instascan.Scanner ({ video: document.getElementById('qrVideo') }); qrscanner.addListener ('scan', function (content) {
//     alert(content)
//     window.open (content, '_blank'); });
//     Instascan.Camera.getCameras().then(function (cameras) { if (cameras.length > 0) {
//       qrscanner.start(cameras[0]); } else {
//     console.error('No cameras found.'); }
//     }).catch(function (e) { console.error(e);
//     });
// }
function stopqr(){
  scanner.stop()
}

function pointsQR(content){
  var points = sessionStorage.getItem('points')
  if (points == null){
    points = 60
  }
  if ((points-content)>=0){
    points = points - content
  }else{
    points = 0
  }
  sessionStorage.setItem('points',points)
  // document.getElementById('pointsPopup').innerHTML = sessionStorage.getItem('points')+" has been deducted"
}

function addfavs(){
document.getElementById('favRes').style.visibility = "visible"
}

function updatePoints(){
  if(sessionStorage.getItem('points') == null){
    document.getElementById('lblpoints').innerHTML = 60+" Points";
  }else{
  document.getElementById('lblpoints').innerHTML = sessionStorage.getItem('points')+" Points";
  }
}

function popupmsg(){
    document.getElementById('pointsPopup').innerHTML = sessionStorage.getItem('points')+" has been deducted"
}
function saveReview(){
 var review =  document.getElementById('otherSuggestion').value
 sessionStorage.setItem('review',review)
//  alert(sessionStorage.getItem('review'))
}

function ReadReview(){
  document.getElementById('comment').innerHTML = sessionStorage.getItem('review')
}


function initAutocomplete() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 13,
    mapTypeId: "roadmap",
  });

  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });
  let markers = [];

  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );

      if (place.geometry.viewport) {

        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

