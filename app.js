// app.js
document.addEventListener("DOMContentLoaded", function () {
    d3.csv('dataset.csv', function(data) {
      // Convert numerical columns to numbers
      data.forEach(function(d) {
        d.BMI = +d.BMI;
        // Add similar lines for other numerical columns
      });
  
      // D3.js code to create a bar chart
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 600 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;
  
      const x = d3.scaleBand()
        .range([0, width])
        .padding(0.1)
        .domain(data.map(d => d.AgeCategory));
  
      const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, d => d.BMI)]);
  
      const svg = d3.select('#chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  
      svg.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.AgeCategory))
        .attr('width', x.bandwidth())
        .attr('y', d => y(d.BMI))
        .attr('height', d => height - y(d.BMI));
  
      // Add labels
      svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));
  
      svg.append('g')
        .call(d3.axisLeft(y));
  
      // Trigger data validation and send to the server
      validateAndSendData(data);
    });
  
    // Function to validate data and send it to the server
    function validateAndSendData(data) {
      // Your validation logic here
      // Example: Check if BMI is within a certain range
      const isValidData = data.every(d => d.BMI >= 0 && d.BMI <= 40);
  
      if (isValidData) {
        // Example: Send data to the server using Fetch API
        fetch('http://localhost:3000/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(data => console.log('Server response:', data))
          .catch(error => console.error('Error:', error));
      } else {
        console.error('Invalid data. BMI should be between 0 and 40.');
      }
    }
  });
  