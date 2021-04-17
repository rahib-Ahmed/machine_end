

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


}

function generateQRCode() {
  var trash_id = document.getElementById("trash_id").value;
  localStorage.setItem('id', trash_id)
  qr_change(trash_id)
  document.getElementById("qr-result").innerHTML = "Scanned code for " + trash_id;
  qr.set({
    background: 'transparent',
    foreground: '#05431A',
    size: 350,
    value: `https://smartwastesegregator.netlify.app/?trashid=${trash_id}`,
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
  console.log(req)
  fetch("https://helpsws.herokuapp.com/id", req)
    .then(response => 
      response.json() 
      )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
 
}  

function qr_change(id){
  var p= new URLSearchParams()
  p.append("id", id)
  var q= new Headers()
  q.append("Content-Type", "application/x-www-form-urlencoded")
  var request={ 
    mode: 'no-cors',
    method: 'POST',
    headers: q,
    body: p,
  }
  fetch("https://helpsws.herokuapp.com/scan", request)
  .then(response=>{
    console.log(response.json());
    window.location.replace('./index2.html');
  })
  .then(result=>(console.log(result)))

}

function dataRedirect() {
  window.location.replace('./index2.html')
}
