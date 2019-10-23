@extends(/layouts/template)

@section(content)
     <!-- Plotly.js -->


    <h3>Sistema de calor</h3>

    <!-- Plotly chart will be drawn inside this DIV -->
    <div id="graph"></div>

    <div class="input-field col s6">
      <input id="id" placeholder="Id" type="text">
      <label for="id">ID</label>
    </div>
    <a id="ligar" class="waves-effect waves-light btn">Ligar</a>
    <a id="desligar" class="waves-effect waves-light btn">Desligar</a>
   
     <script type="text/javascript" src="js/jquery-2.1.1.min.js"></script>
     <script type="text/javascript" src="js/jquery-latest.min.js"></script>
     <script type="text/javascript" src="js/src/cors.js"></script>
     <script type="text/javascript" src="js/plotly-latest.min.js"></script>

      <script>
      /* https://service-iot.herokuapp.com/pull_leitura_static */   

        
        
        function eventLed(id, value){

          var originalURLAction = "https://service-iot.herokuapp.com/push_acao?message=";
          var queryURLAction = "https://cors-anywhere.herokuapp.com/" + originalURLAction
          $.ajax({
            url: queryURLAction,
            method: "GET",
            dataType: "json",
            data: { id: id, value: value},
            // this headers section is necessary for CORS-anywhere
            headers: {
              "x-requested-with": "xhr" 
            }
          }).done(function(response) {
            console.log('Enviar action', response);
          }).fail(function(jqXHR, textStatus) { 
            console.error(textStatus)
          })
        }

        $("#ligar").click(function(){
          //alert($('#id').val());
          eventLed($('#id').val(), 1);
        });

        $("#desligar").click(function(){
          //alert($('#id').val());
          eventLed($('#id').val(), 0);
        });

        function rand() {
          return jsonData;
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
        var jsonData = [];

        var interval = setInterval(function() {

          var originalURL = "https://service-iot.herokuapp.com/pull_leitura";
          var queryURL = "https://cors-anywhere.herokuapp.com/" + originalURL

          $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "json",
            // this headers section is necessary for CORS-anywhere
            headers: {
              "x-requested-with": "xhr" 
            }
          }).done(function(response) {
            console.log('CORS anywhere response', response);
            if(response.length > 0){
              jsonData = response[response.length - 1].message;
            }
            console.log(jsonData);
            //alert(response[response.length - 1].message);
          }).fail(function(jqXHR, textStatus) { 
            console.error(textStatus)
          })

          var time = new Date();

          var update = {
          x:  [[time]],
          y: [[jsonData]]
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
                  
    </script>
    
    <div class="row">
      <div class="col s12"><span class="flow-text"></span></div>
      <div class="col s6 offset-s6"><span class="flow-text"></span></div>
    </div>
          
@endsection