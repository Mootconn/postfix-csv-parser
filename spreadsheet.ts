/* Edge cases
- Invalid charater (@ $ # _)
- Two operands one after the other (+-)
- Multi layered cell references (a1 = b1, b1 = a2, a2 = 3, therefore all should equal 3)
*/

/* Test Data
 const csvString = "@,1 + +,a9\nb2,c2,3\n+,1 2 3,c3";
*/

const csvString = "10,1 3 +,2 3 -\nb1 b2 *,a1,b1 a2 / c1 +\n+,1 2 3,c3";
const rows = csvString.split("\n");
const table = rows.map((row) => row.split(","));

// Iterate through the rows and columns
for (let row = 0; row < rows.length; row++) {
  for (let column = 0; column < table[row].length; column++) {
    // Get the element in the cell
    const cell: String = table[row][column];

    // Split it by spaces
    const elements = cell.split(" ");

    // Initialize the stack
    let stack: any[] = [];

    // Evaluate each element in the cell
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      if (/^[0-9]+$/.test(element)) {
        // The element is a number
        stack.push(element);
      } else if (/[+\-*/]/.test(element)) {
        // The element is an operator
        if (stack.length == 2) {
          let evaluatedValue = eval(stack.shift() + element + stack.shift());
          stack.push(evaluatedValue); // Set the stack to be the new evaluated value
        } else {
          // An operator can only be applied to two values
          stack[0] = null;
          break;
        }
      } else if (/^[a-zA-Z][0-9]$/.test(element)) {
        // The element is a reference to a cell
        const newValue = evaluateCell(element, row, column);

        if (newValue != null || newValue != undefined) {
          stack.push(newValue);
        } else {
          stack[0] = null;
          break;
        }
      } else {
        // the element is invalid break loop and return #Err
        stack[0] = null;
        break;
      }
    }
    if (stack.length == 1 && stack[0] != null) {
      table[row][column] = stack[0];
    } else {
      table[row][column] = "#ERR";
    }
  }
  console.log(table[row]);
}

function evaluateCell(element: any, row: number, column: number): any {
  let alphabetColumn = element.charCodeAt(0) - 97; // Get the column from the alphabet
  let newRow = parseInt(element.slice(1)) - 1; // Get the rest of the numbers for row position

  let evaluatedValue = table[newRow][alphabetColumn];

  if (
    (row == newRow && column == alphabetColumn) || // If the reference is to itself error
    evaluatedValue == null || // If the cell is valid but has an error value
    evaluatedValue == undefined
  ) {
    // If the cell is an invalid reference
    return null;
  } else if (/^[a-zA-Z][0-9]$/.test(evaluatedValue)) {
    // The cell is a reference to another cell
    alphabetColumn = evaluatedValue.charCodeAt(0) - 97; // Get the column from the alphabet
    newRow = parseInt(evaluatedValue.slice(1)) - 1; // Get the rest of the numbers for row position
    return table[newRow][alphabetColumn];
  } else {
    return evaluatedValue;
  }
}
