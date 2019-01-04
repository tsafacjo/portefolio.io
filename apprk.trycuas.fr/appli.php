<?php


session_start(); // On démarre la session AVANT toute chos

// On s'amuse à créer quelques variables de session dans $_SESSION
if (isset($_SESSION['idUSERS'])){
    
    
}
else {
    
    
   
    //header('Location:index.html');
    
}

?>
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="css/taskman.css"/>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.8/angular-ui-router.min.js"></script>
    <script src="app/app.js"></script>
    
    
</head>

<!-- apply our angular app to our site -->
<body ng-app="myApp">

<nav class="navbar navbar-default  nav-right ">
    <div class="navbar-header">
        <a class="navbar-brand" ui-sref="#"> APPRK</a>
    </div>

    <div class="navbar-collapse collapse">
        <ul class="nav navbar-nav">
            <li><a ui-sref="home">Plan d'eau </a></li>
            <li><a ui-sref="home">Observations</a></li>            
            <li><a ui-sref="reservations">Reservations</a></li>            
            <li><a ui-sref="adherent">Adhérents</a></li>
            <li><a ui-sref="adherent">Utilisateurs</a></li>


        </ul>
        <form  class="navbar-form pull-right">
            <a ui-sref="adherent" class=" glyphicon glyphicon-user user"><?php echo  $_SESSION['USER_NAME']; ?></a>
            <a href="deconnexion.php"  class="deconnexion">Deconnexion</a>            

        </form>
    </div>
</nav>


<div class="container-fluid">
    <!-- we use ui-view instead of ng-view -->
    <div ui-view></div>
</div>

</body>
</html>