
function set_rows_attrs() {

  // get the main table
  let main_grid = document.getElementsByClassName('main-grid')[0];
  // get rows
  let rows = main_grid.getElementsByTagName('tr');
  // get all input fields
  let fields = main_grid.getElementsByClassName('form-control');


  // add new cell for row number
  //   for(var i = 0 ; i < rows.length; i++){
  //     add_row_number(rows[i], i);
  //   }

  // set event attributes for input fields
  for (var i = 0; i < fields.length; i++) {
    setAttrs(fields[i]);
  }


}

// add new row number cell
function add_row_number(row, index) {
  // make new td
  const new_tag = document.createElement("td");
  const node = document.createTextNode(`${index}`);
  new_tag.appendChild(node);
  // add td at first of tr
  row.insertBefore(new_tag, row.firstChild);
}

// set event handlers to attributes
function setAttrs(x) {
  x.setAttribute("onFocus", "Income(this)");
  x.setAttribute("onblur", "leave(this)");
  x.setAttribute("onchange", "CalculateSum(this)");
}


// calculate sum of input values
function CalcSum(fields) {
  var sum = 0.0;
  // sum of values of fields
  for (var i = 0; i < fields.length; i++) {
    var num = fields[i].value;
    num = num ? num.replace('/', '.') : 0;
    num = parseFloat(num);
    if (num != 97 && num != 98) {
      sum += num;
    }
  }
  return sum;
}


// scroll main table
function ScrollTable(row) {
  //scroll to the bottom of "table"
  let index = parseInt(row.firstChild.innerText);
  //   console.log(index, rows.length, main_table.scrollTop, main_table.scrollHeight)
  if (index >= (rows.length / 2) - 3 && main_table.scrollTop <= main_table.scrollHeight) {
    main_table.scrollTop += main_table.scrollHeight / rows.length;
  }
}

// onchange event
function CalculateSum(x) {
  // calculate sum
  let fields = document.getElementsByClassName(x.className);
  let sum = CalcSum(fields);
  // put in the sum field
  document.getElementById('sumScore').value = sum;
}

// focus event
function Income(td) {
  let tr = td.parentElement.parentElement;
  tr.setAttribute("aria-selected", "true");
  tr.style.background = "#7889d6";
  tr.style.color = 'white';
  tr.style.fontWeight = 'bold';
  // console.log('Focused :');
  // console.log(p);

  ScrollTable(tr);

}


// unfocus event
function leave(x) {
  var p = x.parentElement.parentElement;
  p.setAttribute("aria-selected", "false");
  p.style.background = "white";
  p.style.color = 'black';
  p.style.fontWeight = 'normal';
  // console.log('Leaved :');
  // console.log(p);
  CalculateSum(x);
}

function check_score_table_exists() {
  let score_grid = document.querySelector('[ng-if="loadGrid"]');
  if (score_grid === null) {
    return false;
  }
  // table exists
  return true;

}

if (check_score_table_exists()) {

  // call function
  set_rows_attrs();

  alert("Script Injected Successfully");
} else {
  alert("score table not found !")
}