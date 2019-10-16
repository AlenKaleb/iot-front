@extends(/layouts/template)

@section(content)
     <!-- Plotly.js -->


    <h1>Mostrando gráfico</h1>

    <!-- Plotly chart will be drawn inside this DIV -->
    <div id="graph"></div>
   

     <script src="js/jquery-2.1.1.min.js"></script>
     <script type="text/javascript" src="js/jquery-latest.min.js"></script>
     <script type="text/javascript" src="js/jquery.ajax-cross-origin.min.js"></script>
     <script src="js/plotly-latest.min.js"></script>

      <script>
      /* https://service-iot.herokuapp.com/pull_leitura_static */
      $(function() {
        $.ajaxSetup({
          crossOrigin: true
        });

        
        var ultimoValor = 0;

        setInterval(() => {
          var jsonData = [];
          $.ajax({
            crossOrigin: true,
            url: "https://service-iot.herokuapp.com/pull_leitura_static",
            success: function(data) {
              jsonData = JSON.parse(data);
              //alert(jsonData[jsonData.length-1].message);
            }
          });
          return jsonData;
        });
        //setInterval(function() {})
        
        
        function rand() {
          return result()[result().length-1].message;
        }

        var time = new Date();

        var data = [{
          x: [time],
          y: [rand],
          mode: 'lines',
          line: {color: '#80CAF6'}
        }]

        Plotly.plot('graph', data);

        var cnt = 0;

        var interval = setInterval(function() {
          result();

          var time = new Date();

          var update = {
          x:  [[time]],
          y: [[rand()]]
          }

          var olderTime = time.setMinutes(time.getMinutes() - 1);
          var futureTime = time.setMinutes(time.getMinutes() + 1);

          var minuteView = {
                xaxis: {
                  type: 'date',
                  range: [olderTime,futureTime]
                }
              };

          Plotly.relayout('graph', minuteView);
          Plotly.extendTraces('graph', update, [0])

          if(++cnt === 100) clearInterval(interval);
        }, 1000);

      });
                  
    </script>
    
    <div class="row">
      <div class="col s12"><span class="flow-text"></span></div>
      <div class="col s6 offset-s6"><span class="flow-text"></span></div>
    </div>
          
@endsection