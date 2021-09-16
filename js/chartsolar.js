google.charts.load('current', {
  'packages': ['corechart', 'bar']
});
google.charts.setOnLoadCallback(initChart);

function initChart() {
  URL = solarsheet;
  console.log(solarsheet);

  var query = new google.visualization.Query(URL);
  query.setQuery('select *');
  query.send(function(response) {
    handleQueryResponse(response);
  });
}

function handleQueryResponse(response) {
  var data = response.getDataTable();
  var columns = data.getNumberOfColumns();
  var rows = data.getNumberOfRows();
  // console.log(data.toJSON());

  const colors = [
    'rgb(54, 162, 235)',
    'rgb(255, 99, 132)',
    'rgb(75, 192, 192)',
    'rgb(255, 206, 86)',
    'rgb(153, 102, 255)'
  ];
  dataj = JSON.parse(data.toJSON());
  // console.log(dataj.cols[0].label);
  let labels = [];
  labels = getLabels(dataj);

  const datasets = [];
  for (i = 0; i < dataj.rows.length; i++) {
    let series_data = [];
    series_data = getRevenues(i, dataj);
    var dataset = {
      label: dataj.rows[i].c[0].v,
      backgroundColor: colors[i],
      borderColor: colors[i],
      data: series_data
    }

    datasets.push(dataset);

  }
  // console.log(datasets);

  const chartdata = {
    labels: labels,
    datasets: datasets
  };
  var canvas = document.getElementById("myChart");
  var setup = {
    type: 'line',
    data: chartdata,
    options: {
      plugins: {
        title: {
          display: true,
          text: dataj.cols[0].label
        }
      },
      responsive: true,
    }
  }
  chart = new Chart(canvas, setup);

}

function getLabels(dataJson) {
  const labels = [];
  for (j = 0; j < 12; j++) {
    labels.push(dataJson.cols[j * 2 + 1].label);
  }
  return labels;
}

function getRevenues(i, dataJson) {
  const series_data = [];
  for (j = 0; j < 12; j++) {
    if (dataJson.rows[i].c[j * 2 + 2] != null) {
      if (dataJson.rows[i].c[j * 2 + 2].v != null) {
        series_data.push(dataJson.rows[i].c[j * 2 + 2].v);
      } else {
        series_data.push(0);
      }
    } else {
      series_data.push(0);
    }
  }
  console.log('serie:' + series_data);
  return series_data;
}