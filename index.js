//  geoFindMe();   //location finder 

clock(); //clock includes date day am and pm/ 24 hr format 

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
  hrs = hrs < 10 ? `0${hrs}` : hrs;
  mns = mns < 10 ? `0${mns}` : mns;
  dates = dates < 10 ? ` 0${dates} ` : dates
  let time = `${hrs}:${mns}`;
  setInterval(clock, 1000);
  let today_date = `${dates} | ${months[date.getMonth()]}`;
  let today_day = `${day[date.getDay()]}`;
  document.getElementById("clock").innerText = time;
  // document.getElementById("date").innerText = today_date;
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
  // console.log("x="+x+"y="+y)
  fetch(`http://api.positionstack.com/v1/reverse?access_key=d999dbe272f477009f6e28fbe1a76e1a&query=${latitude},${longitude}&limit=1&output=json`)
    .then(res => res.json())
    .then(response => {
      console.log("User's Location Info: ", response)
      var trash_address = response.data[0].label;
      document.getElementById("trash_address").innerText = trash_address
    })


}

function generateQRCode() {
  var trash_id = document.getElementById("trash_id").value;
  document.getElementById("qr-result").innerHTML = "Scanned code for " + trash_id;
  qr.set({
    background: 'transparent',
    foreground: 'black',
    size: 350,
    value: trash_id
  });
  var urlencoded = new URLSearchParams();
  urlencoded.append("id", trash_id);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded")
  console.log('help')
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
  };
  fetch("https://helpsws.herokuapp.com/id", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}