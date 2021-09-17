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

  const colors = [
    'rgb(54, 162, 235)',
    'rgb(255, 99, 132)',
    'rgb(75, 192, 192)',
    'rgb(255, 206, 86)',
    'rgb(153, 102, 255)',
    'orange',
    'grey'
  ];

  dataj = JSON.parse(data.toJSON());
  let labels = [];
  labels = getLabels(dataj);
  labels = setLabels(labels, '電力量', '金額');

  let datasets = makeRevenueDatasets(dataj, colors);

  let chartdata = {
    labels: labels,
    datasets: datasets
  };

  makeChart('chartRevenue', dataj, chartdata);

  datasets = makeGenerateDatasets(dataj, colors);
  labels = setLabels(labels, '金額', '電力量');
  chartdata = {
    labels: labels,
    datasets: datasets
  };

  makeChart('chartGenerate', dataj, chartdata);
  
}

function getLabels(dataJson) {
  const labels = [];
  for (j = 0; j < 12; j++) {
    labels.push(dataJson.cols[j * 2 + 1].label);
  }
  return labels;
}

function setLabels(labels, beforeName, afterName) {
  const newLabels = [];
  for (i = 0; i < labels.length; i++) {
    newLabels.push(labels[i].replace(beforeName, afterName));
  }
  return newLabels;
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

function getGenerates(i, dataJson) {
  const series_data = [];
  for (j = 0; j < 12; j++) {
    if (dataJson.rows[i].c[j * 2 + 1] != null) {
      if (dataJson.rows[i].c[j * 2 + 1].v != null) {
        let kwh = dataJson.rows[i].c[j * 2 + 1].v;
        series_data.push(getKwhNumber(kwh));
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

function getKwhNumber(kwh) {
  kwh = kwh.replace('kwh', '');
  kwh = kwh.replace(/,/g, '');
  return parseInt(kwh, 10);
}

function makeRevenueDatasets(dataJson, colors) {
  let datasets = [];
  for (i = 0; i < dataJson.rows.length - 1; i++) {
    let series_data = [];
    series_data = getRevenues(i, dataj);
    var dataset = {
      label: dataJson.rows[i].c[0].v,
      backgroundColor: colors[i],
      borderColor: colors[i],
      data: series_data
    }
    datasets.push(dataset);
  }
  return datasets;
}

function makeGenerateDatasets(dataJson, colors) {
  let datasets = [];
  for (i = 0; i < dataJson.rows.length - 1; i++) {
    let series_data = [];
    series_data = getGenerates(i, dataj);
    var dataset = {
      label: dataJson.rows[i].c[0].v,
      backgroundColor: colors[i],
      borderColor: colors[i],
      data: series_data
    }
    datasets.push(dataset);
  }
  return datasets;
}

function makeChart(elementId, dataJson, chartdata) {
  var canvas = document.getElementById(elementId);
  var setup = {
    type: 'bar',
    data: chartdata,
    options: {
      plugins: {
        title: {
          display: true,
          text: dataJson.cols[0].label
        }
      },
      responsive: true,
    }
  }
  chart = new Chart(canvas, setup);
}