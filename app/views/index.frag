@extends(/layouts/template)

@section(content)
     <!-- Plotly.js -->
     <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
     <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>

    <h1>Mostrando gráfico</h1>

    <!-- Plotly chart will be drawn inside this DIV -->
    <div id="myDiv"></div>
    <script>
      /* https://service-iot.herokuapp.com/pull_leitura_static */
       //(function($) { 

            function toJson(data){
              return jQuery.parseJSON(data);
            }
            $.ajax({
                url: "https://service-iot.herokuapp.com/pull_leitura_static",
                type: 'GET',
                dataType: 'jsonp',
                jsonp: "callback",
                cors: true,
                crossDomain: true,
                contentType:'application/json',
                secure: true,
                headers: {
                  'Access-Control-Allow-Origin': '*',
                },
                beforeSend: function (xhr) {
                  xhr.setRequestHeader ("Authorization", "Basic " + btoa(""));
                },
                jsonpCallback: function(data){
                  alert(data);
                },
                success: function (response){
                  alert(response);
                  //var items = [];
                  //$.each( result, function( key, val ) {
                   // items.push( "<li id='" + key + "'>" + val + "</li>" );
                  //});
                  //alert(items);
                }
            }).then(function(data){
              alert(data);
            }).done(function(data) {
              alert( "second success" );
            })
            .fail(function(data) {
              alert( "error" );
            })
            .always(function(data) {
              alert( "finished" );
            });
       // })(jQuery);

          

      const jsonUrl = "http://service-iot.herokuapp.com/pull_leitura_static";

      //Plotly.d3.json(jsonUrl, function(err, fig) {
        //alert(fig.data);
        // assuming json is formatted as { "data": [/* */], "layout": {/* */} }
        //Plotly.plot('graph-id', fig.data, fig.layout);
      //});

      Plotly.d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv", function(err, rows){
      
      //Plotly.d3.json(jsonUrl, function(err, rows) {

      function unpack(rows, key) {
        //console.log(rows);
        return rows.map(function(row) { return row[key]; });
      }

        var frames = []
        var x = unpack(rows, 'Date')
        var y = unpack(rows, 'AAPL.High')
        var x2 = unpack(rows, 'Date')
        var y2 = unpack(rows, 'AAPL.Low')

        var n = 100;
        for (var i = 0; i < n; i++) {
          frames[i] = {data: [{x: [], y: []}, {x: [], y: []}]}
          frames[i].data[1].x = x.slice(0, i+1);
          frames[i].data[1].y = y.slice(0, i+1);
          frames[i].data[0].x = x2.slice(0, i+1);
          frames[i].data[0].y = y2.slice(0, i+1);
        }

        var trace2 = {
          type: "scatter",
          mode: "lines",
          name: 'AAPL High',
          fill: 'tonexty',
          x: frames[5].data[1].x,
          y: frames[5].data[1].y,
          line: {color: 'grey'}
        }

        var trace1 = {
          type: "scatter",
          mode: "lines",
          name: 'AAPL Low',
          x: frames[5].data[0].x,
          y: frames[5].data[0].y,
          line: {color: 'lightgrey'}
        }

        var data = [trace1,trace2];

        var layout = {
          title: 'Frequencia de calor',
          xaxis: {
            range: [frames[99].data[0].x[0], frames[99].data[0].x[99]],
            showgrid: false
          },
          yaxis: {
            range: [120, 140],
            showgrid: false
          },
          legend: {
            orientation: 'h',
            x: 0.5,
            y: 1.2,
            xanchor: 'center'
          },
          updatemenus: [{
            x: 0.5,
            y: 0,
            yanchor: "top",
            xanchor: "center",
            showactive: false,
            direction: "left",
            type: "buttons",
            pad: {"t": 87, "r": 10},
            buttons: [{
              method: "animate",
              args: [null, {
                fromcurrent: true,
                transition: {
                  duration: 0,
                },
                frame: {
                  duration: 40,
                  redraw: false
                }
              }],
              label: "Play"
            }, {
              method: "animate",
              args: [
                [null],
                {
                  mode: "immediate",
                  transition: {
                    duration: 0
                  },
                  frame: {
                    duration: 0,
                    redraw: false
                  }
                }
              ],
              label: "Pause"
            }]
          }]
        };

        Plotly.newPlot('myDiv', data, layout).then(function() {
          Plotly.addFrames('myDiv', frames);
        });
      })
    </script>

    
    <div class="row">
      <div class="col s12"><span class="flow-text"></span></div>
      <div class="col s6 offset-s6"><span class="flow-text"></span></div>
    </div>
          
@endsection