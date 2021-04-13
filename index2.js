geoFindMe();
chart()
function clock() {
  let date = new Date();
  let hrs = date.getHours();
  let mns = date.getMinutes();
  let dates = date.getDate();
  let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


  hrs = hrs < 10 ? `0${hrs}` : hrs
  mns = mns < 10 ? `0${mns}` : mns;
  dates = dates < 10 ? ` 0${dates} ` : dates
  let time = `${hrs}:${mns}`;
  setInterval(clock, 1000);
  let today_date = `${dates} | ${months[date.getMonth()]}`;
  let today_day = `${day[date.getDay()]}`;
  document.getElementById("clock").innerText = time;
  document.getElementById("date").innerText = today_date;
  document.getElementById("days").innerText = today_day;

}



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
      trash_address = trash_address.split(
        ", "
      )
      document.getElementById("trash_address1").innerText = trash_address[0]
      document.getElementById("trash_address2").innerText = trash_address [1]+ ", "+ trash_address[2]

    })
}

function add_trash_data(x) {
  var id = localStorage.getItem('id')
  var trashType = x
  var SearchParams = new URLSearchParams()
  SearchParams.append("id", id);
  SearchParams.append("type", trashType);
  var Header = new Headers();
  Header.append("Content-Type", "application/x-www-formurlencoded")
  var req = {
    method: 'POST',
    header: Header,
    body: SearchParams
  }
  fetch('https://helpsws.herokuapp.com/addGarbage', req)
    .then(res => res.text())
    .then(result => {console.log(result) 
    chart()})
    .catch(error => console.log('error', error))
}

function chart() {
  var id = localStorage.getItem('id')
  console.log("inchart")
  var chart;
  var searchParams = new URLSearchParams();
  searchParams.append("id", id);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded")
  var req = {
    method: 'POST',
    headers: myHeaders,
    body: searchParams,
  };
  fetch("https://helpsws.herokuapp.com/id", req)
    .then(response => response.json())
    .then(
      (result) => {
        var plastic = result.plasticPercentage
        var bio = result.bioPercentage
        var glass = result.glassPercentage
        var metal = result.metalPercentage
        var paper = result.paperPercentage
        var empty = result.emptyPercentage
        console.log(plastic)
        chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          backgroundColor: "#B1E6B9",
          segmentShowStroke: true,
          segmentStrokeWidth: 4,

          data: [{
            lineColor: "#B1E6B9",
            color: "white",
            type: "pie",
            indexLabelFontSize: 18,
            radius: 120,
            indexLabel: "{label} - {y}",
            exploded: true,
            yValueFormatString: "###0.0\"%\"",

            dataPoints: [{
                y: plastic,
                label: "Plastic"
              },
              {
                y: paper,
                label: "Paper"
              },
              {
                y: metal,
                label: "Metal"
              },
              {
                y: bio,
                label: "Bio Waste"
              },
              {
                y: glass,
                label: "Glass"
              },

            ]
          }]
        });

        chart.render();

        function explode() {
          for (var i = 0; i < chart.data[0].dataPoints.length; i++) {
            chart.data[0].dataPoints[i].exploded = true;
          }
        }
        explode();
      })
    .catch(error => console.log('error', error));

}
clock();


