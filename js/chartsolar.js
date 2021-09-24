google.charts.load('current', {
  'packages': ['corechart', 'bar']
});
google.charts.setOnLoadCallback(initChart);

function initChart() {
  URL = solarsheet;
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
  labels = setLabels(labels, ' 電力量', '');

  let datasets = makeRevenueDatasets(dataj, colors);

  let chartdata = {
    labels: labels,
    datasets: datasets
  };

  makeChart('chartRevenue', dataj, chartdata, '金額');

  datasets = makeGenerateDatasets(dataj, colors);
  chartdata = {
    labels: labels,
    datasets: datasets
  };

  makeChart('chartGenerate', dataj, chartdata, '電力量(kwh)');
  
  makeTable(dataj);
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

function makeChart(elementId, dataJson, chartdata, ytitle) {
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
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
          display: true,
          title: {
            display: true,
            text: ytitle
          }
        }
      },
      responsive: true,
    }
  }
  chart = new Chart(canvas, setup);
}

function makeTable(dataJson) {
  var table = document.getElementById("myTable");
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");

  tblBody.appendChild(makeColHead(dataJson));

  for (i = 0; i < dataJson.rows.length - 1; i++) {
    let revenue = [];
    revenue = getRevenues(i, dataJson);
    var row = document.createElement("tr");
    row.appendChild(makeRowHead(i, dataJson));

    for (j = 0; j < 12; j++) {
      let cell = document.createElement("td");
      cell.className = 'cell-right';
      let rev = revenue[j].toLocaleString();
      var cellText = document.createTextNode(rev);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
  }
  tbl.className = 'sticky_table';
  tbl.appendChild(tblBody);
  table.appendChild(tbl);
}

function makeColHead(dataJson) {
  let row = document.createElement("tr");
  let cell = document.createElement("th");
  let cellText = document.createTextNode("");
  cell.appendChild(cellText);
  row.appendChild(cell);

  let labels = getLabels(dataJson);
  labels = setLabels(labels, ' 電力量', '');
  for (j = 0; j < 12; j++) {
    let cell = document.createElement("th");
    let cellText = document.createTextNode(labels[j]);
    cell.appendChild(cellText);
    row.appendChild(cell);
  }
  return row;
}

function makeRowHead(i, dataJson) {
  let cell = document.createElement("td");
  let cellText = document.createTextNode(dataJson.rows[i].c[0].v);
  cell.appendChild(cellText);
  return cell;
}