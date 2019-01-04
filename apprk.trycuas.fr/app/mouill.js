//Define an angular module for our app


var app  = angular.module('myApp', ['ui.router']);

 app .config(function($stateProvider, $urlRouterProvider) {   

    $urlRouterProvider.otherwise('/plandeau');  

    $stateProvider       
        // nested views
        .state('home', {
            url: "/plandeau" ,
            templateUrl: 'partials/task.html'
        }) ;

 
    $stateProvider       
        // nested views
        .state('adherent', {
            url: "/adherents" ,
            templateUrl: 'partials/adherent.html'
        }) ;
 
    $stateProvider       
        // nested views
        .state('reservations', {
            url: "/reservations" ,
            templateUrl: 'partials/reservations.html'
        }) ;
     
});

app.controller('tasksController', function($scope, $http) {
    
    
    
    $scope.typebouee = {
    availableOptions: [
      {id: '1', name: 'Acier'},
      {id: '2', name: 'Inox'},
      {id: '3', name: 'Cheminee'}
    ],
    selectedOption: {id: '1', name: 'Acier'} //This sets the default value of the select in the ui
    };
    
  $scope.typesBouee=["Acier","Inox","Cheminee"] ;
    
  getTask(); // Load all available tasks 
    
    
  function getTask(){  
  $http.post("ajax/mouillages/getTask.php").success(function(data){
        $scope.tasks = data;
       });
  };
    
  function getTaskId(id_mouill){  
  $http.post("ajax/mouillages/getTaskId.php?"+id_mouill).success(function(data){
        $scope.currentTask = data;
       });
  }; 
    
    
    
  $scope.addMouill= function () {
      
      
    $scope.idSelectedTask=0;  

  };
    
    
  $scope.deleteTask = function (task) {
    if(confirm("Are you sure to delete this line?")){
    $http.post("ajax/mouillages/deleteTask.php?taskID="+task).success(function(data){
        getTask();
      });
    }
  };

    
  $scope.clear = function () {
      
        $scope.idSelectedTask =0;
        $scope.mouillLigne ='';
        $scope.mouillNumero ='';
        $scope.mouillProfondeur ='';
        $scope.mouillDiametre.value =parseFloat(DIAMETRE_CHAINE);
        
  };
    
    
  $scope.toggleStatus = function(item, status, task) {
    if(status=='2'){status='0';}else{status='2';}
      
      $http.post("ajax//mouillages/updateTask.php?taskID="+item+"&status="+status).success(function(data){
        getTask();
      });
  };
  
    
  $scope.selectTask = function (idMOUILL,LIGNE,NUMERO,TYPE_BOUEE,MOUILL_PROFONDEUR,DIAMETRE_CHAINE) {
      

        $scope.idSelectedTask =idMOUILL;
        $scope.mouillLigne =LIGNE;
        $scope.mouillNumero =parseInt(NUMERO);
        $scope.mouillProfondeur=parseFloat(MOUILL_PROFONDEUR);
        $scope.mouillDiametre=parseFloat(DIAMETRE_CHAINE);
      
      
      for( option in $scope.typebouee.availableOptions ){
          
         
          if($scope.typebouee.availableOptions[option].name==TYPE_BOUEE){
              
                $scope.typebouee.selectedOption=$scope.typebouee.availableOptions[option];
                break;
            }
          }
      
  };
    
  $scope.modifierMouill = function (mouillProfondeur,mouillNumero,id,mouillLigne) {
      
      alert('Numéro  '+mouillNumero) ;
      
      if($scope.idSelectedTask==0&& mouillLigne.length==1){
          
                
        profondeur=parseFloat(mouillProfondeur);
        numero=parseInt(mouillNumero) ;
        typebouee=parseInt(id)   ;
        ligne=mouillLigne ;
          
        alert("test "+ligne);
          
        $http.post("ajax/mouillages/addMouill.php?idMOUILL=0&ligne="+ligne+"&numero="+numero+"&typebouee="+typebouee+" &profondeur="+profondeur+"&diametre=2").success(function(data){
            alert(data.toString()); 
        getTask();
        $scope.taskInput = "";      
        
      });
      }
      
      else {

      $http.post("ajax/mouillages/updateMouil.php?idMOUILL="+$scope.idSelectedTask+"&typebouee="+$scope.typebouee.selectedOption.id+"&profondeur="+ $scope.mouillProfondeur).success(function(data){
          getTask();

              
        }) ;}
      
      
        };

    
    

});



app.filter('startsWithLetter', function () {
  return function (items, letter) {
    var filtered = [];
      
  
      
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
        
      if (item.LIGNE==letter) {
          
            filtered.push(item);
          
          
      }
    }
      
    return filtered;
  };
});








app.controller('reservationsController', function($scope, $http) {
    
    
    
    $scope.typebouee = {
    availableOptions: [
      {id: '1', name: 'Acier'},
      {id: '2', name: 'Inox'},
      {id: '3', name: 'Cheminee'}
    ],
    selectedOption: {id: '1', name: 'Acier'} //This sets the default value of the select in the ui
    };
    
  $scope.typesBouee=["Acier","Inox","Cheminee"] ;
    
  getReservations() ;// Load all available tasks 
    
    
  function getReservations(){  
  $http.post("ajax/reservations/getReservations.php").success(function(data){
      
        $scope.reservations = data;
      
       });
  };
    

    
    
  $scope.addMouill= function () {
      
      
    $scope.idSelectedTask=0;  

  };
    
    
  $scope.deleteTask = function (task) {
    if(confirm("Are you sure to delete this line?")){
    $http.post("ajax/mouillages/deleteTask.php?taskID="+task).success(function(data){
        getTask();
      });
    }
  };

    
  $scope.clear = function () {
      
        $scope.idSelectedTask =0;
        $scope.mouillLigne ='';
        $scope.mouillNumero ='';
        $scope.mouillProfondeur ='';
        $scope.mouillDiametre.value =parseFloat(DIAMETRE_CHAINE);
        
  };
    
    
  $scope.toggleStatus = function(item, status, task) {
    if(status=='2'){status='0';}else{status='2';}
      
      $http.post("ajax//mouillages/updateTask.php?taskID="+item+"&status="+status).success(function(data){
        getTask();
      });
  };
  
    
  $scope.selectReserv= function (ADHERENT_idADHERENT,MOUILLAGES_idMOUILL,LIGNE,NUMERO,NOM_ADHERENT,PRENOM_ADHERENT,DATE_ADHERENT_has_MOUILLAGES,DATE_ADHERENT_has_MOUILLAGESFIN) {
      

        $scope.idSelectedAdhrent=ADHERENT_idADHERENT;      
        $scope.idSelectedMouil=MOUILLAGES_idMOUILL;
        $scope.reservLigne =LIGNE;
        $scope.reservNumero=parseInt(NUMERO);
        $scope.reservNom=NOM_ADHERENT;
        $scope.reservPrenom=PRENOM_ADHERENT;      
        $scope.reservDateDebut= {
         value: new Date(2013, 9, 22)
       };
      
      //DATE_ADHERENT_has_MOUILLAGES;
        $scope.reservDateFin=DATE_ADHERENT_has_MOUILLAGESFIN;      
      
      /*
      for( option in $scope.typebouee.availableOptions ){
          
         
          if($scope.typebouee.availableOptions[option].name==TYPE_BOUEE){
              
                $scope.typebouee.selectedOption=$scope.typebouee.availableOptions[option];
                break;
            }
          }*/
      
  };
    
  $scope.modifierMouill = function (mouillProfondeur,mouillNumero,id,mouillLigne) {
      
      alert('Numéro  '+mouillNumero) ;
      
      if($scope.idSelectedTask==0&& mouillLigne.length==1){
          
                
        profondeur=parseFloat(mouillProfondeur);
        numero=parseInt(mouillNumero) ;
        typebouee=parseInt(id)   ;
        ligne=mouillLigne ;
          
        alert("test "+ligne);
          
        $http.post("ajax/mouillages/addMouill.php?idMOUILL=0&ligne="+ligne+"&numero="+numero+"&typebouee="+typebouee+" &profondeur="+profondeur+"&diametre=2").success(function(data){
            alert(data.toString()); 
        getTask();
        $scope.taskInput = "";      
        
      });
      }
      
      else {

      $http.post("ajax/mouillages/updateMouil.php?idMOUILL="+$scope.idSelectedTask+"&typebouee="+$scope.typebouee.selectedOption.id+"&profondeur="+ $scope.mouillProfondeur).success(function(data){
          getTask();

              
        }) ;}
      
      
        };

    
    

});



app.filter('startsWithLetter', function () {
  return function (items, letter) {
    var filtered = [];
      
  
      
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
        
      if (item.LIGNE==letter) {
          
            filtered.push(item);
          
          
      }
    }
      
    return filtered;
  };
});
