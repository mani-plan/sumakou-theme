google.charts.load('current', {
  'packages': ['corechart', 'bar', 'table']
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

  const sdata = new SolarData(dataj);
  const scg = new SolarChartGoogle();
  const stg = new SolarTableGoogle();

  const generates = sdata.getGenerates();
  const revenues = sdata.getRevenues();

  let chartdata = sdata.makeDatasets(generates);
  scg.makeChart('chartGenerate', chartdata, '電力量');
  stg.drawTable('tableGenerate', chartdata);

  chartdata = sdata.makeDatasets(revenues);
  scg.makeChart('chartRevenue', chartdata, '金額');
  stg.drawTable('tableRevenue', chartdata);

}

class SolarChartGoogle {

  makeChart(elementId, chartdata, ctitle) {
    const canvas = document.getElementById(elementId);
    if (canvas == null) {
      return;
    }

    const data = google.visualization.arrayToDataTable(chartdata);
    const options = {
      chart: {
        title: ctitle,
        subtitle: '',
      },
      isStacked: true,
      series: {
        0:{color:'#8dd3c7'},
        1:{color:'#ffffb3'},
        2:{color:'#bebada'},
        3:{color:'#fb8072'},
        4:{color:'#80b1d3'},
        5:{color:'#fdb462'},
        6:{color:'#8dd3c7'},
        7:{color:'#ffffb3'},
        8:{color:'#bebada'},
        9:{color:'#fb8072'},
        10:{color:'#80b1d3'},
        11:{color:'#fdb462'}
      }
    };
    const chart = new google.charts.Bar(canvas);
    chart.draw(data, google.charts.Bar.convertOptions(options));
  }

}

class SolarTableGoogle {
  drawTable(elementId, chartData) {
    const data = google.visualization.arrayToDataTable(chartData);
    const table = new google.visualization.Table(document.getElementById(elementId));
    table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
  }
}

class SolarData {

  #datajson;
  #collabels;
  #rowlabels;
  #revenues;
  #generates;
  #revenuesums;
  #generatesums;

  constructor(dataJson) {
    this.#datajson = dataJson;
    this.#collabels = [];
    this.#rowlabels = [];
    this.#revenues = [];
    this.#generates = [];
    this.#revenuesums = [];
    this.#generatesums = [];
    this.#collabels = this.getColLabels();
    this.#rowlabels = this.getRowLabels();
  }

  getColLabels() {
    if (this.#collabels.length > 0) {
      return this.#collabels;
    }
    for (let j = 0; j < 12; j++) {
      if (this.#datajson.cols[j * 2 + 1].label != null) {
        let label = this.#datajson.cols[j * 2 + 1].label;
        this.#collabels.push(label.replace(' 電力量', ''));
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
        if (this.#datajson.rows[i].c[j * 2 + 2] != null) {
          if (this.#datajson.rows[i].c[j * 2 + 2].v != null) {
            rev.push(this.#datajson.rows[i].c[j * 2 + 2].v);
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
        if (this.#datajson.rows[i].c[j * 2 + 1] != null) {
          if (this.#datajson.rows[i].c[j * 2 + 1].v != null) {
            let kwh = this.#datajson.rows[i].c[j * 2 + 1].v;
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

  checkExcludeRow(i) {
    if (this.#datajson.rows[i].c[0] == null) {
      return true;
    }
    if (this.#datajson.rows[i].c[0].v == null) {
      return true;
    }
    const rowLabel = this.#datajson.rows[i].c[0].v;
    const exLabel = ['', '合計'];
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

  makeDatasets(datarows) {
    const datasets = [];
    const cols = [];
    cols.push('');
    for (let i = 0; i < this.#collabels.length; i++) {
      cols.push(this.#collabels[i]);
    }
    datasets.push(cols);
    for (let i = 0; i < datarows.length; i++) {
      const rows = [];
      rows.push(this.#rowlabels[i]);
      for (let j = 0; j < datarows[i].length; j++) {
        rows.push(datarows[i][j]);
      }
      datasets.push(rows);
    }
    return datasets;
  }
}
