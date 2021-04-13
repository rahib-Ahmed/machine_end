var chart;
window.onload = function () {
 
    var searchParams = new URLSearchParams();
    searchParams.append("id", "1");
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
            
    chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        backgroundColor: "#B1E6B9",
        segmentShowStroke: true,
        segmentStrokeWidth: 4,
        title: {
            text: "Waste Composition"
        },
        data: [{
            lineColor: "#B1E6B9",
            color: "white",
            type: "pie",
            indexLabelFontSize: 18,
            radius: 95,
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
                }
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