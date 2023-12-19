// script to auto export media from a WP site one month at a time for all months available

async function selectMediaOption() {
  return new Promise((resolve, reject) => {
    document.querySelector('input[type="radio"][value="attachment"]').click();
    resolve();
  });
}

async function getUniqueDateVals() {
  return new Promise((resolve, reject) => {
    let vals = [];
    let options = document.querySelectorAll("#attachment-start-date option");
    options.forEach((el, i) => {
      vals.push(el.value);
      if (i === options.length - 1) resolve(vals.slice(1));
    });
  });
}

function selectStartDate(val) {
  document.querySelector("#attachment-start-date").value = val;
  document.querySelector("#attachment-start-date").dispatchEvent(new Event("change"));
}

function selectEndDate(val) {
  document.querySelector("#attachment-end-date").value = val;
  document.querySelector("#attachment-end-date").dispatchEvent(new Event("change"));
}

function exportAllMonthsIndividualFiles() {
  selectMediaOption().then(() => {
    getUniqueDateVals().then((dates) => {
      let i = 0;
      let interval = setInterval(() => {
        selectStartDate(dates[i]);
        selectEndDate(dates[i]);
        document.querySelector("input#submit").click();
        i++;
        if (i >= dates.length) {
          clearInterval(interval);
        }
      }, 2500);
    });
  });
}
exportAllMonthsIndividualFiles();
