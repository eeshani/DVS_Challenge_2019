for(var i=1; i<21; i++){
//var i=1;

if(i==6||i==10){
 
(function(){ 
	console.log(i);

	var width = 900,
		height = 600;

	var svg,
      circles,
      circleSize = { min: 10, max: 80 };
  	
	d3.queue()
		.defer(d3.csv, "Data/Q" + i.toString() + ".csv")
		.await(ready);

	svg = d3.select("#bubble-chart" + i.toString())
		.append("svg")
		.attr("height", height)
		.attr("width", width)
		.append("g")
		.attr("transform", "translate(0,0)");

	function ready(error, datapoints){

		/**var hours = datapoints.map(function(datapoint) { console.log(datapoints.name); return +datapoints.name; });
		
		console.log(datapoints);

		var meanhours = d3.mean(hours),
		  hoursExtent = d3.extent(hours),
		  hoursScaleX,
		  hoursScaleY;

	  	var circleRadiusScale = d3.scaleSqrt()
	    	.domain(hoursExtent)
	    	.range([circleSize.min, circleSize.max]); 

	    console.log(hoursExtent);
	    console.log(circleSize.min);
	    console.log(circleSize.max); **/

	    var scaledPopulationMargin = circleSize.max;

	    var meanhours = d3.mean(function(d){return d.name;}),
		  hoursExtent = d3.extent(function(d){return d.name;}),
		  hoursScaleX;

	    console.log(width - scaledPopulationMargin);
	    console.log(scaledPopulationMargin*2);

		hoursScaleX = d3.scaleLog()
        .domain(hoursExtent)
        .range([scaledPopulationMargin*2, width - scaledPopulationMargin]);

		circles = svg.selectAll("circle")
			.data(datapoints)
			.enter()
			.append("circle")
				.attr("r", function(d,i){ return d.number;})
				.attr("cx", function(d,i) { return hoursScaleX(parseInt(i.name));})
				.attr("cy", 200)
				.attr("fill", "#7f3490")
				.on('click', function(d,i){
          	//console.log(ColorScale(i));
          	console.log(d);
          });

		var onScreenYOffset = 200,
			numberOfTicks = 10,
            tickFormat = ".0s";

        var xAxis = d3.select(".x-axis");

        xAxis = d3.axisBottom(hoursScaleX)
          .ticks(numberOfTicks, tickFormat);

                 
        svg.append("g")
          .attr("class", "x-axis")
          .attr("transform", "translate(0," + (height - onScreenYOffset) + ")")
          .call(xAxis)
          .selectAll(".tick text")
            .attr("font-size", "16px");

        function translateAxis(axis, translation) {
        axis
          .transition()
          .duration(500)
          .attr("transform", translation);
      }

	}
})();
}

else{

(function(){
	var x,y,width = window.innerWidth/2,
		height = 550,
		keyheight=200,
		keywidth=500;

	if(i==11){
		height = 850;		
		keyheight=700;
		keywidth=400;
	}
	else if(i==7 || i==13){
		height = 650;
	}
	else if(i==20){
		height = 400;
	}

	if(i==20){
		keyheight=100;
	}
	else if(i==13){		
		keyheight=400;
	}
	d3.queue()
		.defer(d3.csv, "Data/Q" + i.toString() + ".csv")
		.await(ready);

	var svg = d3.select("#bubble-chart" + i.toString())
		.append("svg")
		.attr("height", height)
		.attr("width", width)
		.append("g")
		.attr("transform", "translate(0,0)");


	var svgkey = d3.select("#key" + i.toString())
		.append("svg")
		.attr("height", keyheight)
		.attr("width", keywidth)
		.append("g")
		.attr("transform", "translate(0,0)");

	function ready(error, datapoints){

        //console.log(datapoints)

    var formatDecimalkey = d3.format(",.1f");
    var formatDecimaltip = d3.format(",.1f");

	console.log(495495);
	var sum = d3.sum(datapoints, function(d){return +d.number;});
	console.log(sum);

		var ColorScale = d3.scaleOrdinal()
	        .domain(datapoints, function(d){
	        //console.log(d.number.values());
          	return d.number.values();
          	//return 40;
          } )
	        .range(["#63b598", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177" ,"#0d5ac1" ,"#1c0365" ,"#14a9ad" ,"#4ca2f9" ,"#a4e43f" ,"#d298e2" ,"#6119d0","#d2737d" ,"#c0a43c" ,"#f2510e" ,"#651be6" ,"#61da5e" ,"#cd2f00" ,"#9348af" ,"#01ac53" ,"#c5a4fb" ,"#996635","#b11573" ,"#4bb473" ,"#75d89e" ,
"#2f3f94" ,"#2f7b99" ,"#da967d" ,"#34891f" ,"#b0d87b" ,"#ca4751" ,"#7e50a8" ,"#c4d647" ,"#e0eeb8" ,"#11dec1" ,"#566ca0" ,"#ffdbe1" ,"#2f1179" ,"#935b6d" ,"#916988" ,"#513d98" ,"#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d",
"#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977","#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b", "#e1cf3b",
"#5be4f0", "#57c4d8", "#a4d17a", "#225b8", "#be608b", "#96b00c", "#088baf","#f158bf", "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0", "#802234","#6749e8", "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941", "#41d158",
"#fb21a3", "#51aed9", "#5bb32d", "#807fb", "#21538e", "#89d534", "#d36647","#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3","#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec","#1bb699", "#6b2e5f", "#64820f", "#1c271", "#21538e", "#89d534", "#d36647",
"#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3","#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec","#1bb699", "#6b2e5f", "#64820f", "#1c271", "#9cb64a", "#996c48", "#9ab9b7","#06e052", "#e3a481", "#0eb621", "#fc458e", "#b2db15", "#aa226d", "#792ed8",
"#73872a", "#520d3a", "#cefcb8", "#a5b3d9", "#7d1d85", "#c4fd57", "#f1ae16","#8fe22a", "#ef6e3c", "#243eeb", "#1dc18", "#dd93fd", "#3f8473", "#e7dbce","#421f79", "#7a3d93", "#635f6d", "#93f2d7", "#9b5c2a", "#15b9ee", "#0f5997","#409188", "#911e20", "#1350ce", "#10e5b1", "#fff4d7", "#cb2582", "#ce00be",
"#32d5d6", "#17232", "#608572", "#c79bc2", "#00f87c", "#77772a", "#6995ba","#fc6b57", "#f07815", "#8fd883", "#060e27", "#96e591", "#21d52e", "#d00043","#b47162", "#1ec227", "#4f0f6f", "#1d1d58", "#947002", "#bde052", "#e08c56","#28fcfd", "#bb09b", "#36486a", "#d02e29", "#1ae6db", "#3e464c", "#a84a8f",
"#911e7e", "#3f16d9", "#0f525f", "#ac7c0a", "#b4c086", "#c9d730", "#30cc49","#3d6751", "#fb4c03", "#640fc1", "#62c03e", "#d3493a", "#88aa0b", "#406df9","#615af0", "#4be47", "#2a3434", "#4a543f", "#79bca0", "#a8b8d4", "#00efd4","#7ad236", "#7260d8", "#1deaa7", "#06f43a", "#823c59", "#e3d94c", "#dc1c06",
"#f53b2a", "#b46238", "#2dfff6", "#a82b89", "#1a8011", "#436a9f", "#1a806a","#4cf09d", "#c188a2", "#67eb4b", "#b308d3", "#fc7e41", "#af3101", "#ff065","#71b1f4", "#a2f8a5", "#e23dd0", "#d3486d", "#00f7f9", "#474893", "#3cec35","#1c65cb", "#5d1d0c", "#2d7d2a", "#ff3420", "#5cdd87", "#a259a4", "#e4ac44",
"#1bede6", "#8798a4", "#d7790f", "#b2c24f", "#de73c2", "#d70a9c", "#25b67","#88e9b8", "#c2b0e2", "#86e98f", "#ae90e2", "#1a806b", "#436a9e", "#0ec0ff","#f812b3", "#b17fc9", "#8d6c2f", "#d3277a", "#2ca1ae", "#9685eb", "#8a96c6",
"#dba2e6", "#76fc1b", "#608fa4", "#20f6ba", "#07d7f6", "#dce77a", "#77ecca"]);

		var keyElementWidth = 100,
		keyElementHeight = 30;
		var onScreenYOffset = keyElementHeight*1.5,
		offScreenYOffset = 100;

		var keyWidth = keyElementWidth * datapoints.length;
        var continentKeyScale = d3.scaleBand()
        .domain(datapoints.length)
        .range([50, 850]);
//console.log(datapoints.length);

//console.log(9999992);
      svgkey.selectAll("circle")      
        .data(datapoints)
        .enter()
        .append("circle")
          .attr("r", 5)
          .attr("cx", function(d,i) { /**if(i<=9){return 30;}
          	else if(i<=19){return 270;}
          	else if(i<=29){return 500;}
          	else if(i<=39){return 730;}**/
          	return 70;})
          .attr("cy", function(d,i) {/** if(i<=9){return 20*i + 10;}
          	else  if(i<=19){return 20*(i-10) + 10;}
          	else if(i<=29){return 20*(i-20) + 10;}
          	else if(i<=39){return 20*(i-30) + 10;}**/
          	return 20*i + 10;})
          .attr("fill", function(d,i) { return ColorScale(i); });

      svgkey.selectAll("text")      
        .data(datapoints)
        .enter()
        .append("text")
          .attr("x", function(d,i) {/** if(i<=9){return 50;}
          	else if(i<=19){return 290;}
          	else if(i<=29){return 520;}
          	else if(i<=39){return 750;}**/
          	return 90;})
          .attr("y", function(d,i) { /**if(i<=9){return 20*i + 15;}
          	else  if(i<=19){return 20*(i-10) + 15;}
          	else if(i<=29){return 20*(i-20) + 15;}
          	else if(i<=39){return 20*(i-30) + 15;}**/
          	return 20*i + 15;})
          .text(function(d){return d.name+ " (" + formatDecimalkey((d.number/sum)*100) + "%)";})
          .attr("fill", "#666666");

  /**    d3.selectAll("g.continent-key-element")
        .append("text")
          .attr("text-anchor", "middle")
          .attr("x", function(d,i) { return continentKeyScale(i) + keyElementWidth/2 + 100*i + 50; })
          .text(function(d) { console.log(9999994); return d.name; });

      // The text BBox has non-zero values only after rendering
      d3.selectAll("g.continent-key-element text")
          .attr("y", function(d) {
            var textHeight = this.getBBox().height;
            // The BBox.height property includes some extra height we need to remove
            var unneededTextHeight = 4;
            return ((keyElementHeight + textHeight) / 2) - unneededTextHeight;
          });**/


		var datasetExtent = d3.extent(datapoints, function(d){
			//console.log(d.number);
          	return parseInt(d.number);
          } )

		//console.log(datasetExtent)
	
		var circleRadiusScale = d3.scaleSqrt()
        	.domain(datasetExtent)
        	.range([10, 90]); 

		var simulation = d3.forceSimulation()
			.force("x", d3.forceX(width/2).strength(0.05))
			.force("y", d3.forceY(height/2).strength(0.05))
			.force("anticollide", d3.forceCollide(function(d){
	          	return circleRadiusScale(d.number) + 1;
	          } ));


		var infoupdate = d3.select("#base-info" + i.toString()); 

		var circles = svg.selectAll("circle")
        .data(datapoints)
        .enter()
          .append("circle")
          .attr("r", function(d){
          	//console.log(circleRadiusScale(d.number));
          	return circleRadiusScale(d.number);
          } )
          .attr("fill", function(d,i) { return ColorScale(i); })
          .on('click', function(d,i){
          	//console.log(ColorScale(i));
          	console.log(d);
          })
          .on('mousemove', function (d) {

          	var xPos = d3.mouse(this)[0]-15;
          	var yPos = d3.mouse(this)[1]-55;
		    tooltip.attr("tranform", "translate("+ xPos + "," + yPos + ")");
		    tooltip.select("text").text(d.name + " : " + formatDecimaltip((d.number/sum)*100) + "%");      
		  })
          .on("mouseover", function() {
           // updateInfo(d, x, y);
           		d3.select(this)
           		.style("opacity", 0.5);
           		tooltip.style("display", null);
          })
          .on("mouseout", function(d) {

          	d3.select(this)
           		.style("opacity", 1);
          	tooltip.style("display", "none");
          });


    var tooltip = svg.append("g")
    		.attr("class", tooltip)
    		.style("display", "none")

    tooltip.append("text")
    		.attr("x",15)
    		.attr("dy", "1.2em")
    		.style("font-size", "1.1em")
    		.attr("font-weight", "normal")
    		.attr("font-family", "ubuntu")
    		.attr("color", "#bbbbbb");



/**

		          .on('mousemove', function () {
		    x = d3.mouse(this)[0]; 
		    y = d3.mouse(this)[1]; 
		    //console.log(x,y);       
		  })
          .on("mouseover", function(d) {
           // updateInfo(d, x, y);
           		d3.select(this)
           		.style("opacity", 0.5);

            	d3.select("#base-info" + i.toString()).append("text")
		        .text( d.name + " : " + d.number.toString())
		        .attr("fill", "#666666")
	          	.attr("font-size", "20px")
		        .attr("x", x)
		        .attr("y", y);
          })
          .on("mouseout", function(d) {

          	d3.select(this)
          	  .style("opacity", 1);

            updateInfo();
          })


        svg.append('g')
        .attr('transform','translate(100,150)')
        .call(colorLegend, {
        	ColorScale,
        	circleRadius: 30,
        	spacing: 80,
        	textOffset: 40
        });**/

        function updateInfo(value, x, y) {
	        var info = " ";
	        if (value) {
	          info = value.name + " : " + value.number.toString();
	        }
	        infoupdate
	          .attr("top",(y-28) + "px")
	          .attr("left", (x) + "px")
	          .html(info)        
	          .attr("fill", "#666666")
	          .attr("font-size", "20px"); 
    	}

	    simulation.nodes(datapoints)
	    	.on("tick", ticked)

	    function ticked() {
	    	circles
	    		.attr("cx", function(d){
	    			return d.x
	    		})
	    		.attr("cy", function(d){
	    			return d.y
	    		})
	    }

	}
})();
}
}
for(var i=21; i<22; i++){
//var i=1;
(function(){
	var x,y,width = window.innerWidth,
		height = 600;

	//console.log(i)

	d3.queue()
		.defer(d3.csv, "Data/Q" + i.toString() + ".csv")
		.await(ready);

	var svg = d3.select("#bubble-chart" + i.toString())
		.append("svg")
		.attr("height", height)
		.attr("width", width)
		.append("g")
		.attr("transform", "translate(0,0)");

	function ready(error, datapoints){

        //console.log(datapoints)

	var formatDecimaltip = d3.format(",.1f");
	console.log(495495);
	var sum = d3.sum(datapoints, function(d){return +d.number;});
	console.log(sum);

		var ColorScale = d3.scaleOrdinal(d3.schemeCategory20)
	        .domain(datapoints, function(d){
	        //console.log(d.number.values());
          	return d.number.values();
          	//return 40;
          } );


		var datasetExtent = d3.extent(datapoints, function(d){
			//console.log(d.number);
          	return parseInt(d.number);
          } )

		console.log(datasetExtent)
	
		var circleRadiusScale = d3.scaleSqrt()
        	.domain(datasetExtent)
        	.range([15, 125]); 

	    var defs = svg.append("defs");
	    defs.selectAll(".flag")
	      .data(datapoints)
	      .enter()
	        .append("pattern")
	        .attr("id", function(d) { return d.CountryCode; })
	        .attr("class", "flag")
	        .attr("width", "100%")
	        .attr("height", "100%")
	        .attr("patternContentUnits", "objectBoundingBox")
	          .append("image")
	          .attr("width", 1)
	          .attr("height", 1)
	          // xMidYMid: center the image in the circle
	          // slice: scale the image to fill the circle
	          .attr("preserveAspectRatio", "xMidYMid slice")
	          .attr("xlink:href", function(d) {
	          	//console.log(d.CountryCode)
	            return "Flags/" + d.CountryCode + ".svg";
	          });

		var simulation = d3.forceSimulation()
			.force("x", d3.forceX(width/2).strength(0.05))
			.force("y", d3.forceY(height/2).strength(0.05))
			.force("anticollide", d3.forceCollide(function(d){
	          	return circleRadiusScale(d.number) + 1;
	          } ));


		var infoupdate = d3.select("#base-info" + i.toString()); 

		var circles = svg.selectAll("circle")
        .data(datapoints)
        .enter()
          .append("circle")
          .attr("r", function(d){
          	//console.log(circleRadiusScale(d.number));
          	return circleRadiusScale(d.number);
          } )          
	      .attr("fill", "#666666")
          .attr("fill", function(d) { return "url(#" + d.CountryCode + ")"; })
          .style("stroke", "#999999")
          .style("stroke-width", 1.5)
          .style("opacity", 1)
          .on('click', function(d){
          	console.log(d);
          })
          .on('mousemove', function (d) {
          	var xPos = d3.mouse(this)[0]-15;
          	var yPos = d3.mouse(this)[1]-55;
		    tooltip.attr("tranform", "translate("+ xPos + "," + yPos + ")");
		    tooltip.select("text").text(d.name +  " : " + formatDecimaltip((d.number/sum)*100) + "%");      
		  })
          .on("mouseover", function() {
           // updateInfo(d, x, y);
           		d3.select(this)
           		.style("opacity", 0.5);
           		tooltip.style("display", null);
          })
          .on("mouseout", function(d) {

          	d3.select(this)
          	  .style("opacity", 1);
          	tooltip.style("display", "none");
          });


    var tooltip = svg.append("g")
    		.attr("class", tooltip)
    		.style("display", "none")

    tooltip.append("text")
    		.attr("x",15)
    		.attr("dy", "1.2em")
    		.style("font-size", "1.1em")
    		.attr("font-weight", "normal")
    		.attr("font-family", "ubuntu")
    		.attr("color", "#bbbbbb");


       /**
          .on('mousemove', function () {
		    x = d3.mouse(this)[0]; 
		    y = d3.mouse(this)[1]; 
		    console.log(x,y);       
		  })
          .on("mouseover", function(d) {
           // updateInfo(d, x, y);
           		d3.select(this)
           		.style("opacity", 0.5);

            	d3.select("#base-info" + i.toString()).append("text")
		        .text( d.name + " : " + d.number.toString())
		        .attr("fill", "#666666")
	          	.attr("font-size", "20px")
		        .attr("x", x)
		        .attr("y", y);
          })
          .on("mouseout", function(d) {

          	d3.select(this)
          	  .style("opacity", 1);

            updateInfo();
          });
**/

        function updateInfo(value, x, y) {
	        var info = " ";
	        if (value) {
	          info = value.name + " : " + value.number.toString();
	        }
	        infoupdate
	          .attr("top",(y-28) + "px")
	          .attr("left", (x) + "px")
	          .html(info)        
	          .attr("fill", "#666666")
	          .attr("font-size", "20px"); 
    	}

	    simulation.nodes(datapoints)
	    	.on("tick", ticked)

	    function ticked() {
	    	circles
	    		.attr("cx", function(d){
	    			return d.x
	    		})
	    		.attr("cy", function(d){
	    			return d.y
	    		})
	    }

	}
})();
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}