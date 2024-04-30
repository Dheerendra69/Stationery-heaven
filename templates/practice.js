// // to fetch data from the 'listcart' class

// function print2() {
//     console.log("Function print2 is executed.");
//     const elements = document.getElementsByClassName('listProduct');
//     for (let i = 0; i < elements.length; i++) {
//         console.log(elements[i].textContent);
//     }



// // Get all elements with the class 'listCart'
// const items = document.querySelectorAll('.listCart');
// console.log(items);
// // Create an empty array to store the extracted data
// const extractedData = [];

// // Iterate over each item
// items.forEach(item => {
//     // Extract the required information from the current item
//     const id = item.querySelector('.quantity .minus').getAttribute('data-id');
//     const name = item.querySelector('.name').textContent.trim();
//     const totalPrice = item.querySelector('.totalPrice').textContent.trim().replace('$', '');

//     // Push the extracted data as an object to the array
//     console.log(`id: ${id}, name: ${name}, ${totalPrice}`);
//     extractedData.push({ id, name, totalPrice });
// });
// // Generate the HTML table using the extracted data
// const tableHtml = generateTable(extractedData);

// // Display the HTML table on the page
// document.body.innerHTML += tableHtml;

// }

// // Create a function to generate the HTML table
// function generateTable(data) {
//     // Start building the HTML table
//     let tableHtml = '<table>';
//     // Add table header
//     tableHtml += '<tr><th>ID</th><th>Name</th><th>Total Price</th></tr>';
//     // Add table rows with extracted data
//     data.forEach(item => {
//         tableHtml += `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.totalPrice}</td></tr>`;
//     });
//     // Close the table
//     tableHtml += '</table>';
//     return tableHtml;
// }



// to fetch data from the 'listcart' class
function print2() {

// Get all elements with the class 'listCart'
const items = document.querySelectorAll('.listCart');
console.log(items);
console.log("items.length: "+items.length);
// Create an empty array to store the extracted data
const extractedData = [];

// Iterate over each item
items.forEach(item => {
    // Extract the required information from the current item
    const id = item.querySelector('.quantity .minus').getAttribute('data-id');
    const name = item.querySelector('.name').textContent.trim();
    console.log(name);
    const totalPrice = item.querySelector('.totalPrice').textContent.trim().replace('$', '');
    console.log(totalPrice);

    // Push the extracted data as an object to the array
    console.log(`id: ${id}, name: ${name}, ${totalPrice}`);
    extractedData.push({ id, name, totalPrice });
});
// Generate the HTML table using the extracted data
const tableHtml = generateTable(extractedData);

console.log(tableHtml);
// Display the HTML table on the page
// document.body.innerHTML += tableHtml;

}

// Create a function to generate the HTML table
function generateTable(data) {
    // Start building the HTML table
    let tableHtml = '<table>';
    // Add table header
    tableHtml += '<tr><th>ID</th><th>Name</th><th>Total Price</th></tr>';
    // Add table rows with extracted data
    data.forEach(item => {
        tableHtml += `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.totalPrice}</td></tr>`;
    });
    // Close the table
    tableHtml += '</table>';
    return tableHtml;
}

