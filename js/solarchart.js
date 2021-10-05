google.charts.load('current', {
  'packages': ['corechart', 'bar']
});
google.charts.setOnLoadCallback(initChart);

function initChart() {
  const query = new google.visualization.Query(solarsheet);
  query.setQuery('select *');
  query.send(function(response) {
    handleQueryResponse(response);
  });
}

function handleQueryResponse(response) {
  const data = response.getDataTable();
  const dataj = JSON.parse(data.toJSON());

  const schart = new SolarChart();
  const sdata = new SolarData(dataj);
  const stable = new SolarTable();
  const collabels = sdata.getColLabels();
  const rowlabels = sdata.getRowLabels();
  const generates = sdata.getGenerates();
  const revenues = sdata.getRevenues();
  const spans = sdata.getSpans();
  const dailygen = sdata.getDailyGen();

  let chartdata = schart.makeDatasets(generates, collabels, rowlabels);
  schart.makeChart('chartGenerate', chartdata, '電力量', '電力量(kwh)', 'line');

  chartdata = schart.makeDatasets(revenues, collabels, rowlabels);
  schart.makeChart('chartRevenue', chartdata, '金額', '金額', 'bar', true);

  chartdata = schart.makeDatasets(dailygen, collabels, rowlabels);
  schart.makeChart('chartDaily', chartdata, '1日あたりの電力量', '電力量(kwh/日)', 'bar');
  
  stable.makeTable('tableGenerate', generates, collabels, rowlabels);
  stable.makeTable('tableRevenue', revenues, collabels, rowlabels);
  stable.makeTable('tableSpan', spans, collabels, rowlabels);

}

class SolarChart {

  makeChart(elementId, chartdata, ctitle, ytitle, charttype, stacked = false) {
    const canvas = document.getElementById(elementId);
    const setup = {
      type: charttype,
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
            stacked: stacked
          },
          y: {
            stacked: stacked,
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

  makeDatasets(datarows, collabels, rowlabels) {
    const datasets = [];
    for (let i = 0; i < datarows.length; i++) {
      const dataset = {
        label: rowlabels[i],
        backgroundColor: this.setColor(i),
        borderColor: this.setColor(i),
        data: datarows[i]
      }
      datasets.push(dataset);
    }
    const chartdata = {
      labels: collabels,
      datasets: datasets
    };
    return chartdata;
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

class SolarData {

  #datajson;
  #collabels;
  #rowlabels;
  #revenues;
  #generates;
  #spans;
  #dailygen;

  constructor(dataJson) {
    this.#datajson = dataJson;
    this.#collabels = [];
    this.#rowlabels = [];
    this.#revenues = [];
    this.#generates = [];
    this.#spans = [];
    this.#dailygen = [];
  }

  getColLabels() {
    if (this.#collabels.length > 0) {
      return this.#collabels;
    }
    for (let j = 0; j < 12; j++) {
      if (this.#datajson.cols[j * 4 + 1].label != null) {
        let label = this.#datajson.cols[j * 4 + 1].label;
        this.#collabels.push(label.replace(' 期間', ''));
      }
    }
    return this.#collabels;
  }

  getRowLabels() {
    if (this.#rowlabels.length > 0) {
      return this.#rowlabels;
    }
    for (let i = 0; i < this.#datajson.rows.length; i++) {
      if (this.checkExcludeRow(i) == true) {
        continue;
      }
      let label = this.#datajson.rows[i].c[0].v;
      this.#rowlabels.push(label);
    }
    return this.#rowlabels;
  }

  getRevenues() {
    if (this.#revenues.length > 0) {
      return this.#revenues;
    }
    for (let i = 0; i < this.#datajson.rows.length; i++) {
      if (this.checkExcludeRow(i) == true) {
        continue;
      }
      let rev = [];
      for (let j = 0; j < 12; j++) {
        if (this.#datajson.rows[i].c[j * 4 + 3] != null) {
          if (this.#datajson.rows[i].c[j * 4 + 3].v != null) {
            rev.push(this.#datajson.rows[i].c[j * 4 + 3].v);
          } else {
            rev.push(0);
          }
        } else {
          rev.push(0);
        }
      }
      this.#revenues.push(rev);
    }
    return this.#revenues;
  }

  getGenerates() {
    if (this.#generates.length > 0) {
      return this.#generates;
    }
    for (let i = 0; i < this.#datajson.rows.length; i++) {
      if (this.checkExcludeRow(i) == true) {
        continue;
      }
      let gen = [];
      for (let j = 0; j < 12; j++) {
        if (this.#datajson.rows[i].c[j * 4 + 2] != null) {
          if (this.#datajson.rows[i].c[j * 4 + 2].v != null) {
            let kwh = this.#datajson.rows[i].c[j * 4 + 2].v;
            gen.push(this.getKwhNumber(kwh));
          } else {
            gen.push(0);
          }
        } else {
          gen.push(0);
        }
      }
      this.#generates.push(gen);
    }
    return this.#generates;
  }

  getSpans() {
    if (this.#spans.length > 0) {
      return this.#spans;
    }
    for (let i = 0; i < this.#datajson.rows.length; i++) {
      if (this.checkExcludeRow(i) == true) {
        continue;
      }
      let span = [];
      for (let j = 0; j < 12; j++) {
        if (this.#datajson.rows[i].c[j * 4 + 1] != null) {
          if (this.#datajson.rows[i].c[j * 4 + 1].v != null) {
            let spn = this.#datajson.rows[i].c[j * 4 + 1].v;
            span.push(this.getDate(spn));
          } else {
            span.push('');
          }
        } else {
          span.push('');
        }
      }
      this.#spans.push(span);
    }
    return this.#spans;
  }

  getDailyGen() {
    if (this.#dailygen.length > 0) {
      return this.#dailygen;
    }
    for (let i = 0; i < this.#spans.length; i++) {
      let dgen = [];
      for (let j = 0; j < 12; j++) {
        if (this.#spans[i][j] != '') {
          let dg = Math.ceil(this.#generates[i][j] / this.#spans[i][j]);
          dgen.push(dg);
        } else {
          dgen.push(0);
        }
      }
      this.#dailygen.push(dgen);
    }
    return this.#dailygen;
  }

  checkExcludeRow(i) {
    if (this.#datajson.rows[i].c[0] == null) {
      return true;
    }
    if (this.#datajson.rows[i].c[0].v == null) {
      return true;
    }
    const rowLabel = this.#datajson.rows[i].c[0].v;
    const exLabel = ['', '≪個人≫', '≪法人≫', '合計', '個人法人合計'];
    if (typeof rowLabel == 'object') {
      rowLabel = rowLabel.innerText;
    }
    if (exLabel.indexOf(rowLabel) >= 0) {
      return true;
    }
    return false;
  }

  getKwhNumber(kwh) {
    kwh = kwh.replace('kwh', '');
    kwh = kwh.replace(/,/g, '');
    return parseInt(kwh, 10);
  }

  getDate(datestr) {
    const thisyear = 2021;
    const days = datestr.split('～');
    let fromdate = new Date(String(thisyear) + '/' + days[0]);
    const todate = new Date(String(thisyear) + '/' + days[1]);
    if (fromdate > todate) {
      fromdate = new Date(String(thisyear - 1) + '/' + days[0]);
    }
    return (todate - fromdate) / 86400000 + 1;
  }
}

class SolarTable {

  makeTable(elementId, datarows, collabels, rowlabels) {
    const table = document.getElementById(elementId);
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    tblBody.appendChild(this.makeColHead(collabels));
  
    for (let i = 0; i < datarows.length; i++) {
      let rowLabel = this.makeRowHead(i, rowlabels);

      let rowdata = datarows[i];
      let row = document.createElement("tr");
      row.appendChild(rowLabel);
  
      for (let j = 0; j < 12; j++) {
        let cell = document.createElement("td");
        cell.className = 'cell-right';
        let rev = rowdata[j].toLocaleString();
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

  makeColHead(labels) {
    let row = document.createElement("tr");
    let cell = document.createElement("th");
    let cellText = document.createTextNode("");
    cell.appendChild(cellText);
    row.appendChild(cell);
  
    for (let j = 0; j < labels.length; j++) {
      let cell = document.createElement("th");
      let cellText = document.createTextNode(labels[j]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    return row;
  }

  makeRowHead(i, rowlabels) {
    let cell = document.createElement("td");
    let cellText = document.createTextNode(rowlabels[i]);
    cell.appendChild(cellText);
    return cell;
  }
}