function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
      const firstSample = sampleNames[0];
      buildMetadata(firstSample);
      buildCharts(firstSample);
      buildCharts1(firstSample);
      buildCharts2(firstSample);
  })}
  
  init();
  function optionChanged(newSample) {
    console.log(newSample);
    buildMetadata(newSample);
    buildCharts(newSample);
    buildCharts1(newSample);
    buildCharts2(newSample);
  }
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
      
      console.log(Object.entries(result));
      var sample1 = data.samples;
      var resultArray1 = sample1.filter(sampleObj => sampleObj.id == sample);
      var result1 = resultArray1[0];
      var wfreq = result.wfreq;
      console.log(wfreq);
      var otus = resultArray1[0].otu_ids;
      var otu_labels = resultArray1[0].otu_labels;
      sample_value = resultArray1[0].sample_values;
      
      
      
      var sort_otus = otus.sort((a,b) => b - a);
      
      var top10_ids = sort_otus.slice(0,10);
      console.log(top10_ids); 

      
      PANEL.html("");
      Object.entries(result).forEach(([key , value]) => {
      PANEL.append("h6").text(`${key} : ${value}`);
      }); 
    });
  }
  function buildCharts(sample) {
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
      // 3. Create a variable that holds the samples array. 
      var sample1 = data.samples;
      // 4. Create a variable that filters the samples for the object with the desired sample number.
      var resultArray = sample1.filter(sampleObj => sampleObj.id == sample);
      //  5. Create a variable that holds the first sample in the array.
      var result = resultArray[0]; 
  
      // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
     var otu_ids = resultArray[0].otu_ids;
     var otu_labels = resultArray[0].otu_labels;
     var sample_values = resultArray[0].sample_values;
  
      // 7. Create the yticks for the bar chart.
      // Hint: Get the the top 10 otu_ids and map them in descending order  
      //  so the otu_ids with the most bacteria are last. 
      
      
      // test
      var colors = ['#fff100', '#ff8c00', '#e81123', '#ec008c', '#68217a', '#00188f', '#00bcf2', '#00b294', '#009e49', '#bad80a']
      var trace = {
        x: sample_values.slice(0,10).reverse(),
        y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        type: "bar",
         orientation: "h",
         mode: 'markers',
            marker: {
                color: colors
            }
      };
      var data = [trace];
     var layout = { width: 450, height: 500,
     title: "top 10 bacteria culture",
     margin:{t: 30, 1: 150 }
  };
  Plotly.newPlot("bar-plot", data, layout);
  
      // 8. Create the trace for the bar chart. 
      var barData = [
        
      ];
      // 9. Create the layout for the bar chart. 
      var barLayout = {
       
      };
      // 10. Use Plotly to plot the data with the layout. 
      
    });
  }
    
  function buildCharts1(sample) {
    // Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
      var sample1 = data.samples;
      // 4. Create a variable that filters the samples for the object with the desired sample number.
      var resultArray = sample1.filter(sampleObj => sampleObj.id == sample);
      //  5. Create a variable that holds the first sample in the array.
      var result = resultArray[0]; 
  
      // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
     var otu_ids = resultArray[0].otu_ids;
     var otu_labels = resultArray[0].otu_labels;
     var sample_values = resultArray[0].sample_values;  
  
      // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
      
  
      // 1. Create the trace for the bubble chart.
      var trace = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: { 
          color: otu_ids,
          size : sample_values,
        }
        
         
      };
  
      // 2. Create the layout for the bubble chart.
      var bubbleLayout = { width: 1087, height: 500,
        title: 'Bacteria culture per sample',
        xaxis: { title: "OTU ID"},
        //margin: { t:0 },
        hovemode: "closest",
        
      };
  
      // 3. Use Plotly to plot the data with the layout.
      Plotly.newPlot("bubble", [trace] , bubbleLayout ); 
    });
  }

  function buildCharts2(sample) {
    // Use d3.json to load the samples.json file 
    d3.json("samples.json").then((data) => {
      console.log(data);
  
      // Create a variable that holds the samples array. 
      var sample1 = data.samples;
      var metadata = data.metadata;
      // Create a variable that filters the samples for the object with the desired sample number.
      var resultArray = sample1.filter(sampleObj => sampleObj.id == sample);
      // 1. Create a variable that filters the metadata array for the object with the desired sample number.
     
      var resultArray1 = metadata.filter(sampleObj => sampleObj.id == sample);
      // Create a variable that holds the first sample in the array.
      var result = resultArray[0];
  
      // 2. Create a variable that holds the first sample in the metadata array.
      var result1 = resultArray1[0];
  
      // Create variables that hold the otu_ids, otu_labels, and sample_values.
      var otu_ids = resultArray[0].otu_ids;
      var otu_labels = resultArray[0].otu_labels;
      var sample_values = resultArray[0].sample_values;
  
      // 3. Create a variable that holds the washing frequency.
      var wfreq = result1.wfreq;

      // Create the yticks for the bar chart.
  
      // Use Plotly to plot the bar data and layout.
      //Plotly.newPlot();
      
      // Use Plotly to plot the bubble data and layout.
      //Plotly.newPlot();
     
      
      // 4. Create the trace for the gauge chart.
      var trace = {

      domain: { x: [0,1],  y: [0,1] },
		  value: wfreq,
		  title: { text: "<span style='font-size:0.99em; color:#00bcf2'><b> Belly Button Washing Frequency<br><span style='font-size:.8em;color:#ff8c00'>Scrubs per week</span><br><span style='font-size:0.8em;color:#e81123'>WFREQ</span>" },
      //title: { text: `Weekly Washing Frequency ` },
		  subtitle: {text: `Scrubs per week`},
      type: "indicator",
		  mode: "gauge+number",
      gauge: {
        axis: {
            range: [0, 10],
            tickmode: 'linear',
            tickfont: {
                size: 15
            }
        },
        steps: [
          { range: [0, 2], color: "yellow" },
          { range: [2, 4], color: "cyan" },
          { range: [4, 6], color: "teal" },
          { range: [6, 8], color: "red" },
          { range: [8, 10], color: "green" },
          
        ]},
        
        
    };
      
      // 5. Create the layout for the gauge chart.
      var gaugeLayout = { width: 600, height: 500, margin: { t: 0, b: 0 } 
       
      };
  
      // 6. Use Plotly to plot the gauge data and layout.
      Plotly.newPlot("gauge" , [trace] , gaugeLayout );
    });
  }
  