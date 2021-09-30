google.charts.load('current', {
  'packages': ['corechart', 'bar']
});
google.charts.setOnLoadCallback(initChart);

function initChart() {
  URL = solarsheet;
  const query = new google.visualization.Query(URL);
  query.setQuery('select *');
  query.send(function(response) {
    handleQueryResponse(response);
  });
}

function handleQueryResponse(response) {
  const data = response.getDataTable();
  const dataj = JSON.parse(data.toJSON());

  const cSolar = new ChartSolar();
  const labels = cSolar.getColLabels(dataj);

  let datasets = cSolar.makeRevenueDatasets(dataj);
  let chartdata = {
    labels: labels,
    datasets: datasets
  };
  cSolar.makeChart('chartRevenue', chartdata, '金額', '金額');

  datasets = cSolar.makeGenerateDatasets(dataj);
  chartdata = {
    labels: labels,
    datasets: datasets
  };
  cSolar.makeChart('chartGenerate', chartdata, '電力量', '電力量(kwh)');
  
  cSolar.makeTable(dataj);
}

class ChartSolar {
  getColLabels(dataJson) {
    const labels = [];
    for (let j = 0; j < 12; j++) {
      if (dataJson.cols[j * 4 + 1].label != null) {
        let label = dataJson.cols[j * 4 + 1].label;
        labels.push(label.replace(' 期間', ''));
      }
    }
    return labels;
  }

  getRevenues(i, dataJson) {
    const revs = [];
    for (let j = 0; j < 12; j++) {
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

  getGenerates(i, dataJson) {
    const gens = [];
    for (let j = 0; j < 12; j++) {
      if (dataJson.rows[i].c[j * 4 + 2] != null) {
        if (dataJson.rows[i].c[j * 4 + 2].v != null) {
          let kwh = dataJson.rows[i].c[j * 4 + 2].v;
          gens.push(this.getKwhNumber(kwh));
        } else {
          gens.push(0);
        }
      } else {
        gens.push(0);
      }
    }
    return gens;
  }

  getKwhNumber(kwh) {
    kwh = kwh.replace('kwh', '');
    kwh = kwh.replace(/,/g, '');
    return parseInt(kwh, 10);
  }

  makeRevenueDatasets(dataJson) {
    let datasets = [];
    for (let i = 0; i < dataJson.rows.length - 1; i++) {
      if (dataJson.rows[i].c[0] == null) {
        continue;
      }
      if (dataJson.rows[i].c[0].v == null) {
        continue;
      }
      const rowLabel = dataJson.rows[i].c[0].v;
      if (this.checkExcludeRow(rowLabel) == true) {
        continue;
      }
      let series_data = [];
      series_data = this.getRevenues(i, dataJson);
      const dataset = {
        label: rowLabel,
        backgroundColor: this.setColor(datasets.length),
        borderColor: this.setColor(datasets.length),
        data: series_data
      }
      datasets.push(dataset);
    }
    return datasets;
  }

  makeGenerateDatasets(dataJson) {
    let datasets = [];
    for (let i = 0; i < dataJson.rows.length - 1; i++) {
      if (dataJson.rows[i].c[0] == null) {
        continue;
      }
      if (dataJson.rows[i].c[0].v == null) {
        continue;
      }
      const rowLabel = dataJson.rows[i].c[0].v;
      if (this.checkExcludeRow(rowLabel) == true) {
        continue;
      }
  
      let series_data = [];
      series_data = this.getGenerates(i, dataJson);
      const dataset = {
        label: rowLabel,
        backgroundColor: this.setColor(datasets.length),
        borderColor: this.setColor(datasets.length),
        data: series_data
      }
      datasets.push(dataset);
    }
    return datasets;
  }

  makeChart(elementId, chartdata, ctitle, ytitle) {
    const canvas = document.getElementById(elementId);
    const setup = {
      type: 'bar',
      data: chartdata,
      options: {
        plugins: {
          title: {
            display: true,
            text: ctitle
          },
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
    const chart = new Chart(canvas, setup);
  }

  makeTable(dataJson) {
    const table = document.getElementById("myTable");
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
  
    tblBody.appendChild(this.makeColHead(dataJson));
  
    for (let i = 0; i < dataJson.rows.length - 1; i++) {
      let rowLabel = this.makeRowHead(i, dataJson);
      if (this.checkExcludeRow(rowLabel) == true) {
        continue;
      }
      let revenue = [];
      revenue = this.getRevenues(i, dataJson);
      let row = document.createElement("tr");
      row.appendChild(rowLabel);
  
      for (let j = 0; j < 12; j++) {
        let cell = document.createElement("td");
        cell.className = 'cell-right';
        let rev = revenue[j].toLocaleString();
        let cellText = document.createTextNode(rev);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
  
      tblBody.appendChild(row);
    }
    tbl.className = 'sticky_table';
    tbl.appendChild(tblBody);
    table.appendChild(tbl);
  }

  makeColHead(dataJson) {
    let row = document.createElement("tr");
    let cell = document.createElement("th");
    let cellText = document.createTextNode("");
    cell.appendChild(cellText);
    row.appendChild(cell);
  
    let labels = this.getColLabels(dataJson);
    for (let j = 0; j < labels.length; j++) {
      let cell = document.createElement("th");
      let cellText = document.createTextNode(labels[j]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    return row;
  }

  makeRowHead(i, dataJson) {
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

  checkExcludeRow(rowLabel) {
    const exLabel = ['', '≪個人≫', '≪法人≫', '合計'];
    if (typeof rowLabel == 'object') {
      rowLabel = rowLabel.innerText;
    }
    if (exLabel.indexOf(rowLabel) >= 0) {
      return true;
    }
    return false;
  }

  setColor(i) {
    const colors = [
      '#8dd3c7',
      '#ffffb3',
      '#bebada',
      '#fb8072',
      '#80b1d3',
      '#fdb462',
      '#b3de69'
    ];
    return colors[i % colors.length];
  }
}
