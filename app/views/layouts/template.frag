<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
  <title>Sistema de Cadastro</title>

  <!-- CSS  -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="/css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection"/>
  <link href="/css/style.css" type="text/css" rel="stylesheet" media="screen,projection"/>

   @yield(head)
</head>
<body>
  <nav class="light-blue lighten-1" role="navigation">
    <div class="nav-wrapper container"><a id="logo-container" href="#" class="brand-logo">AWKA</a>
      <ul class="right hide-on-med-and-down">
        <li><a href="/">Inicio</a></li>
        <li><a href="/pessoa/index">Clientes</a></li>
      </ul>

      <ul id="nav-mobile" class="sidenav">
        <li><a href="/">Inicio</a></li>
        <li><a href="/pessoa/index">Clientes</a></li>
      </ul>
      <a href="" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
  </nav>

  <div class="container">
          
    <div class="section">
        @yield(content) 
    </div>

    <br><br>
  </div>

  <footer class="page-footer orange">
    <div class="container">
      <div class="row">
        <div class="col l6 s12">
          <h5 class="white-text">AWKA</h5>
          <p class="grey-text text-lighten-4">Somos a AWKA Technologic</p>


        </div>
        <div class="col l3 s12">
          <h5 class="white-text">Informações</h5>
          <ul>
            <li><a class="white-text" href="/">Inicio</a></li>
            <li><a class="white-text" href="/pessoa/index">Clientes</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container">
      Todos os direitos reservados <a class="orange-text text-lighten-3" href="http://awkatechnologic.com">AWKA</a>
      </div>
    </div>
  </footer>


  <!--  Scripts-->
  <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
  <script src="/js/materialize.js"></script>
  <script src="/js/init.js"></script>

  </body>
</html>