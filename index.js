function text_anime() {

  var textWrapper = document.querySelector('.ml10 .letters');
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  
  anime.timeline({loop: false})
    .add({
      targets: '.ml10 .letter',
      scale: [0, 1],
      duration: 1500,
      elasticity: 600,
      delay: (el, i) => 45 * (i+1)
    }).add({
      targets: '.ml10',
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000
    });
}


geoFindMe();

clock();

// add_trash_data();
//clock includes date day am and pm/ 24 hr format 


function clock() {
  let date = new Date();
  let hrs = date.getHours();
  let mns = date.getMinutes();
  let dates = date.getDate();
  // let period = "AM";
  let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  // if (hrs == 0) {
  //   hrs = 12;
  // }
  // if (hrs > 12) {
  //   hrs = hrs - 12;
  //   period = "PM";
  // }

  hrs = hrs < 10 ? `0${hrs}` : hrs
  mns = mns < 10 ? `0${mns}` : mns;
  dates = dates < 10 ? ` 0${dates} ` : dates
  let time = `${hrs}:${mns}`;
  setInterval(clock, 1000);
  let today_date = `${dates} | ${months[date.getMonth()]}`;
  let today_day = `${day[date.getDay()]}`;
  document.getElementById("clock").innerText = time;

  document.getElementById("date").innerText = today_date;
  // document.getElementById("days").innerText = today_day;

}

// ***LOCATION FINDER***

function geoFindMe() {
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser");
    return;
  }

  function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log("x" + latitude)
    console.log("y" + longitude)

    getLocation(latitude, longitude)
  }

  function error() {
    console.log("Unable to retrieve your location");
  }
  navigator.geolocation.getCurrentPosition(success, error);
}

function getLocation(latitude, longitude) {
  fetch(`http://api.positionstack.com/v1/reverse?access_key=d999dbe272f477009f6e28fbe1a76e1a&query=${latitude},${longitude}&limit=1&output=json`)
    .then(res => res.json())
    .then(response => {
      console.log("User's Location Info: ", response)
      var trash_address = response.data[0].label;
      var postal_code = response.data[0].postal_code;
      var add = trash_address.split(", ");
      // var x = document.createElement("br")
      
      // console.log(x)
      document.getElementById("trash_address").innerText = trash_address;
      
      text_anime()  
    })
    
}

function generateQRCode() {
  var trash_id = document.getElementById("trash_id").value;
  document.getElementById("qr-result").innerHTML = "Scanned code for " + trash_id;
  qr.set({
    background: 'transparent',
    foreground: '#05431A',
    size: 350,
    value: 'https://smartwastesegregator.netlify.app/trashid='+trash_id,
  });
  var searchParams = new URLSearchParams();
  searchParams.append("id", trash_id);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded")
 
  var req = {
    method: 'POST',
    headers: myHeaders,
    body: searchParams,
  };

  fetch("https://helpsws.herokuapp.com/id", req)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}  

function add_trash_data(){
var SearchParams = new URLSearchParams()
SearchParams.append("id", "1");
SearchParams.append("type", "plastic")
var Header = new Headers();
Header.append("Content-Type", "application/x-www-formurlencoded")
var req = {
  method: 'POST',
  header: Header,
  body: SearchParams
}
fetch('https://helpsws.herokuapp.com/addGarbage',req)
.then(res => res.text())
.then(result => console.log(result))
.catch(error => console.log('error', error))
}


function qr_change(){
  var p= new URLSearchParams()
  p.append("id", trash_id)
  var q= new Headers()
  q.append("Content-Type", "application/x-www-form-urlencoded")
  var request={ 
    method: 'POST',
    headers: q,
    body: p,
  }
  fetch("https://helpsws.herokuapp.com/scan", request)
  .then(response => response.json())
  .then(result=>(console.log(result)))
}
