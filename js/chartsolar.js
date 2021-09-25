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
  let labels = getColLabels(dataj);
  let datasets = makeRevenueDatasets(dataj, colors);

  let chartdata = {
    labels: labels,
    datasets: datasets
  };

  makeChart('chartRevenue', dataj, chartdata, '金額', '金額');

  datasets = makeGenerateDatasets(dataj, colors);
  chartdata = {
    labels: labels,
    datasets: datasets
  };

  makeChart('chartGenerate', dataj, chartdata, '電力量', '電力量(kwh)');
  
  makeTable(dataj);
}

function getColLabels(dataJson) {
  const labels = [];
  for (j = 0; j < 12; j++) {
    if (dataJson.cols[j * 4 + 1].label != null) {
      let label = dataJson.cols[j * 4 + 1].label;
      labels.push(label.replace(' 期間', ''));
    }
  }
  return labels;
}

function getRevenues(i, dataJson) {
  const revs = [];
  for (j = 0; j < 12; j++) {
    if (dataJson.rows[i].c[j * 4 + 3] != null) {
      if (dataJson.rows[i].c[j * 4 + 3].v != null) {
        revs.push(dataJson.rows[i].c[j * 4 + 3].v);
      } else {
        revs.push(0);
      }
    } else {
      revs.push(0);
    }
  }
  return revs;
}

function getGenerates(i, dataJson) {
  const gens = [];
  for (j = 0; j < 12; j++) {
    if (dataJson.rows[i].c[j * 4 + 2] != null) {
      if (dataJson.rows[i].c[j * 4 + 2].v != null) {
        let kwh = dataJson.rows[i].c[j * 4 + 2].v;
        gens.push(getKwhNumber(kwh));
      } else {
        gens.push(0);
      }
    } else {
      gens.push(0);
    }
  }
  return gens;
}

function getKwhNumber(kwh) {
  kwh = kwh.replace('kwh', '');
  kwh = kwh.replace(/,/g, '');
  return parseInt(kwh, 10);
}

function makeRevenueDatasets(dataJson, colors) {
  let datasets = [];
  for (i = 0; i < dataJson.rows.length - 1; i++) {
    if (dataJson.rows[i].c[0] == null) {
      continue;
    }
    if (dataJson.rows[i].c[0].v == null) {
      continue;
    }
    const rowLabel = dataJson.rows[i].c[0].v;
    if (rowLabel.includes('≪個人≫') || rowLabel.includes('≪法人≫')) {
      continue;
    }
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
    if (dataJson.rows[i].c[0] == null) {
      continue;
    }
    if (dataJson.rows[i].c[0].v == null) {
      continue;
    }
    const rowLabel = dataJson.rows[i].c[0].v;
    if (rowLabel.includes('≪個人≫') || rowLabel.includes('≪法人≫')) {
      continue;
    }
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

function makeChart(elementId, dataJson, chartdata, ctitle, ytitle) {
  var canvas = document.getElementById(elementId);
  var setup = {
    type: 'bar',
    data: chartdata,
    options: {
      plugins: {
        title: {
          display: true,
          text: ctitle
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
  const exLabel = ['', '≪個人≫', '≪法人≫', '合計'];
  var table = document.getElementById("myTable");
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");

  tblBody.appendChild(makeColHead(dataJson));

  for (i = 0; i < dataJson.rows.length - 1; i++) {
    let rowLabel = makeRowHead(i, dataJson);
    if (exLabel.indexOf(rowLabel.innerText) >= 0) {
      continue;
    }
    let revenue = [];
    revenue = getRevenues(i, dataJson);
    let row = document.createElement("tr");
    row.appendChild(rowLabel);

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

  let labels = getColLabels(dataJson);
  for (j = 0; j < labels.length; j++) {
    let cell = document.createElement("th");
    let cellText = document.createTextNode(labels[j]);
    cell.appendChild(cellText);
    row.appendChild(cell);
  }
  return row;
}

function makeRowHead(i, dataJson) {
  let cell = document.createElement("td");
  let cellVal = '';
  if (dataJson.rows[i].c[0] != null) {
    if (dataJson.rows[i].c[0].v != null) {
      cellVal = dataJson.rows[i].c[0].v;
    }
  }
  let cellText = document.createTextNode(cellVal);
  cell.appendChild(cellText);
  return cell;
}