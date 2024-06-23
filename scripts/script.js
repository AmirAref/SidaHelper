function set_rows_attrs() {
  // get the main table
  const main_grid = document.getElementsByClassName("main-grid")[0];
  // get all input fields
  const fields = main_grid.getElementsByClassName("form-control");

  // add new cell for row number
  //   for(var i = 0 ; i < rows.length; i++){
  //     add_row_number(rows[i], i);
  //   }

  // set event attributes for input fields
  for (field of fields) {
    setAttrs(field);
  }
}

// add new row number cell
// function add_row_number(row, index) {
//   // make new td
//   const new_tag = document.createElement("td");
//   const node = document.createTextNode(`${index}`);
//   new_tag.appendChild(node);
//   // add td at first of tr
//   row.insertBefore(new_tag, row.firstChild);
// }

// set event handlers to attributes
function setAttrs(x) {
  // Add focus event listener
  x.addEventListener("focus", () => {
    Income(x);
  });

  // Add blur event listener
  x.addEventListener("blur", () => {
    leave(x);
  });

  // Add change event listener
  x.addEventListener("change", () => {
    CalculateSum(x);
  });
}

// calculate sum of input values
function CalcSum(fields) {
  let sum = 0.0;
  // sum of values of fields
  for (field of fields) {
    let num = field.value;
    num = num ? num.replace("/", ".") : 0;
    num = parseFloat(num);
    if (num != 97 && num != 98) {
      sum += num;
    }
  }
  return sum;
}

// scroll main table
function ScrollTable(row) {
  try {
    // get the main table
    const main_grid = document.getElementsByClassName("main-grid")[0];
    // get rows
    const rows = main_grid.getElementsByTagName("tr");
  } catch (err) {
    console.error(`failed to get rows list : ${err}`);
    return;
  }

  //scroll to the bottom of "table"
  const index = parseInt(row.firstChild.innerText);
  //   console.log(index, rows.length, main_table.scrollTop, main_table.scrollHeight)
  if (
    index >= (rows.length / 2) - 3 &&
    main_table.scrollTop <= main_table.scrollHeight
  ) {
    main_table.scrollTop += main_table.scrollHeight / rows.length;
  }
}

// onchange event
function CalculateSum(x) {
  // calculate sum
  let fields = document.getElementsByClassName(x.className);
  let sum = CalcSum(fields);
  // put in the sum field
  document.getElementById("sumScore").value = sum;
}

// focus event
function Income(td) {
  let tr = td.parentElement.parentElement;
  tr.setAttribute("aria-selected", "true");
  tr.style.background = "#7889d6";
  tr.style.color = "white";
  tr.style.fontWeight = "bold";
  // console.log('Focused :');
  // console.log(p);

  ScrollTable(tr);
}

// unfocus event
function leave(x) {
  let p = x.parentElement.parentElement;
  p.setAttribute("aria-selected", "false");
  p.style.background = "white";
  p.style.color = "black";
  p.style.fontWeight = "normal";
  // console.log('Leaved :');
  // console.log(p);
  CalculateSum(x);
}

function check_score_table_exists() {
  const score_grid = document.querySelector('[ng-if="loadGrid"]');
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
  alert("score table not found !");
}
