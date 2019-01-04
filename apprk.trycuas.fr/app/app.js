//Define an angular module for our app


var app  = angular.module('myApp', ['ui.router']);

 app .config(function($stateProvider, $urlRouterProvider) {   

    $urlRouterProvider.otherwise('/plandeau');  

    $stateProvider       
        // nested views
        .state('home', {
            url: "/plandeau" ,
            templateUrl: 'partials/mouillages.html'
        }) ;

 
    $stateProvider       
        // nested views
        .state('adherent', {
            url: "/adherents" ,
            templateUrl: 'partials/adherents.html'
 
        }) ;
 
    $stateProvider       
        // nested views
        .state('reservations', {
            url: "/reservations/:ligne/:numero/:idAdhe/:nomAdhe/:prenomAdhe/:telAdhe",
            templateUrl: 'partials/reservations.html',
            controller: 'reservationsController'
        
        }) ;
     
});


app.filter('startsWithLetter', function () {
    return function (items, letter) {
    var filtered = [];
      
  
    if(items){
        
        for (var i = 0; i <items.length; i++) {
          var item = items[i];

          if (item.LIGNE==letter) {

                filtered.push(item);


          }
        }
 }
      
      
    return filtered;
  };
});




app.controller('mouillagesController', function($scope, $http) {
    

    
    $scope.typebouee = {
    availableOptions: [
      {id: '1', name: 'Acier'},
      {id: '2', name: 'Inox'},
      {id: '3', name: 'Cheminee'}
    ],
    selectedOption: {id: '1', name: 'Acier'} //This sets the default value of the select in the ui
    };
    
    

    
    getMouillages(); // Load all available tasks 
    

    
    function getMouillages(){  
        

        $http.post("ajax/mouillages/getMouillages.php").success(function(data){
        $scope.tasks = data;

       });
  };
    
    
    
  function getMouillagesId(id_mouill){  
      
      
  $http.post("ajax/mouillages/getMouillagesId.php?"+id_mouill).success(function(data){
        $scope.currentTask = data;
       });
  }; 
    
    
    
  $scope.addMouill= function () {  
      
    $scope.idSelectedTask=0;  

  };
    
    
    
  $scope.deleteTask = function (task) {
    
      if(confirm("Are you sure to delete this line?")){
    $http.post("ajax/mouillages/deleteTask.php?taskID="+task).success(function(data){
        getMouillages();
      });
    }
  };

    
    
 function emptyMouill(){  
     
        $scope.idSelectedTask =0;
        $scope.mouillLigne ='';
        $scope.mouillNumero ='';
        $scope.mouillProfondeur ='';
        $scope.mouillDiametre.value ='';
  };
        
    
  $scope.clear = function () {
      
      
      emptyMouill();
        
  };
    
  
$scope.getCssMouillage=function (libre){
    

    if (libre ==0)
    
    return 'mouillLibre' ;
    
    else 
        
        return 'mouilloccupe'

}    
    
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
      

      // ajoutt d'un mouillage
      if($scope.idSelectedTask==0&& mouillLigne.length==1){
          
                
        profondeur=parseFloat(mouillProfondeur);
        numero=parseInt(mouillNumero) ;
        typebouee=parseInt(id)   ;
        ligne=mouillLigne ;
          

        $http.post("ajax/mouillages/addMouill.php?idMOUILL=0&ligne="+ligne+"&numero="+numero+"&typebouee="+typebouee+" &profondeur="+profondeur+"&diametre=2").success(function(data){
            alert(data.toString()); 
        getMouillages();
        $scope.taskInput = "";      
        
      });
      }
     // mise à jour  de l'état du mouillage 
      else {

      $http.post("ajax/mouillages/updateMouil.php?idMOUILL="+$scope.idSelectedTask+"&typebouee="+$scope.typebouee.selectedOption.id+"&profondeur="+ $scope.mouillProfondeur).success(function(data){
          getMouillages();
          alert("données "+data);

              
        }) ;}
      
      
        };

    
    

});







app.controller('reservationsController', function($scope, $http,$stateParams) {
    
    
    



  initData();
  getReservations() ;// Load all available reservations 
    

    
    
  function getReservations(){  
  $http.post("ajax/reservations/getReservations.php").success(function(data){
      
        $scope.reservations = data;
      
       });
  };
    
    
function getDate(d){

 var parts = d.split(" ");
 var months = {Jan: "01",Feb: "02",Mar: "03",Apr: "04",May: "05",Jun: "06",Jul: "07",Aug: "08",Sep: "09",Oct: "10",Nov: "11",Dec: "12"};
 return  parts[2]+"/"+months[parts[1]]+"/"+parts[3];

}    
        
  $scope.addReserv= function () {
      
      
     $scope.idSelectedRerserv=0 ; 

  };
    
    
  $scope.deleteTask = function (task) {
  
      if(confirm("Are you sure to delete this line?")){
        
          $http.post("ajax/mouillages/deleteTask.php?taskID="+task).success(function(data){
          getReservations() ;
              
      });
    }
  };

    
function  emptyReserv(){
    

        $scope.idSelectedRerserv=0;
        $scope.idSelectedAdhrent=0;
        $scope.idSelectedMouil=0;
        $scope.reservLigne ='';
        $scope.reservNumero='';
        $scope.reservNom='';
        $scope.reservPrenom='';
        $scope.reservTel='';
        $scope.reservNomBateau='';
        $scope.reservTypeBateau='';          
} 
    
function initData() {
    
 
        
 $scope.idSelectedAdhrent=  typeof $scope.idSelectedAdhrent === "undefined"?0:$stateParams.idAdhe;
 $scope.reservLigne =  typeof $scope.reservLigne  === "undefined"?'':$stateParams.ligne;
 $scope.reservNumero=  typeof $scope.reservNumero === "undefined"?0:parseInt($stateParams.numero);
 $scope.reservNom=  typeof $scope.reservNom === "undefined"?'':$stateParams.nomAdhe;
 $scope.reservPrenom=  typeof $scope.reservPrenom === "undefined"?'':$stateParams.prenomAdhe;
 $scope.reservTel=  typeof $scope.reservTel=== "undefined"?'':$stateParams.telAdhe;
$scope.idSelectedMouil=0 ;    
                 
    /*
 alert("id "+$scope.idSelectedAdhrent+" LIGNE  "+ $scope.reservLigne+" numero  "+$scope.reservNumero+" LIGNE  "+ $scope.reservLigne+" nom "+$scope.reservNom) ; 
    
    
  $scope.reservLigne =$stateParams.ligne;
  $scope.reservNumero=parseInt($stateParams.numero);       
  $scope.reservNom=$stateParams.nomAdhe;
  $scope.reservPrenom=$stateParams.prenomAdhe;
  $scope.reservTel=$stateParams.telAdhe;        
    */
}   
    

$scope.clear = function () {
      
      emptyReserv();
        
  };
    

  $scope.selectReserv= function (ADHERENT_idADHERENT,MOUILLAGES_idMOUILL,LIGNE,NUMERO,NOM_ADHERENT,PRENOM_ADHERENT,TEL_ADHERENT,ID_BATEAU,NOM_BATEAU,TYPE_BATEAU,DATE_ADHERENT_has_MOUILLAGES,DATE_ADHERENT_has_MOUILLAGESFIN) {
      
 
        $scope.idSelectedAdhrent=ADHERENT_idADHERENT;
        $scope.idSelectedMouil=MOUILLAGES_idMOUILL;
        $scope.reservLigne =LIGNE;
        $scope.reservNumero=parseInt(NUMERO);
        $scope.reservNom=NOM_ADHERENT;
        $scope.reservPrenom=PRENOM_ADHERENT;
        $scope.reservTel=TEL_ADHERENT;
        $scope.reservNomBateau=NOM_BATEAU;
        $scope.reservTypeBateau=TYPE_BATEAU;
        $scope.idBateau=ID_BATEAU;
      
      
    
      
        var datedebut =  parseDate(DATE_ADHERENT_has_MOUILLAGES);
      
        $scope.reservDateDebut= {
         value: datedebut 
       };
      
        var datefin =  parseDate(DATE_ADHERENT_has_MOUILLAGESFIN) ;
        $scope.reservDateFin= {
         value: datefin
       };     
     

      
  };

    
   
    
  $scope.modifierRerserv= function (LIGNE,NUMERO,NOM_ADHERENT,PRENOM_ADHERENT,TEL_ADHERENT,NOM_BATEAU,TYPE_BATEAU,DATE_DEBUT,DATE_FIN) {
      

      
 
        userId=1;          
        $scope.reservLigne =LIGNE;
        $scope.reservNumero=parseInt(NUMERO);
        $scope.reservNom=NOM_ADHERENT;
        $scope.reservPrenom=PRENOM_ADHERENT;
        $scope.reservTel=TEL_ADHERENT;
        $scope.reservNomBateau=NOM_BATEAU;
        $scope.reservTypeBateau=TYPE_BATEAU;
      
        var dateDebut =  getDate(DATE_DEBUT.toString()) ;
        $scope.reservDateDebut= {
         value: parseDate(dateDebut)
       };
 

      
        var dateFin = getDate(DATE_FIN.toString());
      
        $scope.reservDateFin= {
         value:parseDate(dateFin) 
       };    
      
      
      /*
    alert("id "+$scope.idSelectedAdhrent+" LIGNE  "+ $scope.reservLigne+" numero  "+$scope.reservNumero+" LIGNE  "+ $scope.reservLigne+" nom "+$scope.reservNom) ; 
      
      */
    
  
         $http.post("ajax/reservations/updateReservations.php?"+"idAdhe="+$scope.idSelectedAdhrent+"&nomAdherent="+$scope.reservNom+"&prenomAdherent="+$scope.reservPrenom+"&telAdherent="+$scope.reservTel+"&nomBateau="+$scope.reservNomBateau+"&typeBateau="+$scope.reservTypeBateau+"&idMOUILL="+$scope.idSelectedMouil+"&dateDebut="+dateDebut+"&dateFin="+dateFin+"&userId="+userId+"&ligne="+$scope.reservLigne+"&numero="+$scope.reservNumero).success(function(data){

        getReservations();
        alert(data.toString());     
        
      });
      
      
  
      
         emptyReserv();

        };
    

});


// gestion des adhérents 

app.controller('adherentController', function($scope, $http) {
    
    
    

    
  getAdherents() ;// Load all available adhérents 
    
    
  function getAdherents(){  
  $http.post("ajax/adherents/getAdherents.php").success(function(data){
      
        $scope.adherents = data;
      
       });
  };
    
    
     
  $scope.addAdhe= function () {
      
      
     $scope.idSelectedAdhe=0 ; 

  };
    
    
  $scope.deleteAdhe = function (adhe) {
  
      if(confirm("voulez vous vraiment supprimer cet adhérent ?")){
        
          $http.post("ajax/adherents/deleteAdherent.php?idAdhe="+adhe).success(function(data){
          getAdherents() ;
          alert(data.toString());      
              
      });
    }
  };

    
function  emptyAdhe(){
    

        $scope.idSelectedAdhe=0;
        $scope.adherentNom='';
        $scope.adherentPrenom='';
        $scope.adherentTel='';
        $scope.adherentEmail='';
  
}   

$scope.clear = function () {
      
      emptyAdhe();
        
  };
    
    
  $scope.toggleStatus = function(item, status, task) {
      
      
    if(status=='2'){status='0';}else{status='2';}
      
      $http.post("ajax//mouillages/updateTask.php?taskID="+item+"&status="+status).success(function(data){
      
      getReservations();
          
      });
  };
  

  $scope.selectAdherent= function (idADHERENT,NOM_ADHERENT,PRENOM_ADHERENT,TEL_ADHERENT,EMAIL_ADHERENT) {
      
        $scope.idSelectedAdhe=idADHERENT;
        $scope.adherentNom=NOM_ADHERENT;
        $scope.adherentPrenom=PRENOM_ADHERENT;
        $scope.adherentTel=TEL_ADHERENT;
        $scope.adherentEmail=EMAIL_ADHERENT;

  
      
  };

    
   
    
  $scope.modifierAdherent=function (NOM_ADHERENT,PRENOM_ADHERENT,TEL_ADHERENT,EMAIL_ADHERENT) {
      

      
 
        userId=1;
        $scope.adherentNom=NOM_ADHERENT;
        $scope.adherentPrenom=PRENOM_ADHERENT;
        $scope.adherentTel=TEL_ADHERENT;
        $scope.adherentEmail=EMAIL_ADHERENT;
      
      
      

      //alert(" fin "+dateFin ) ;

    $http.post("ajax/adherents/updateAdherents.php?"+"idAdhe="+$scope.idSelectedAdhe+"&nomAdhe="+$scope.adherentNom+"&prenomAdhe="+$scope.adherentPrenom+"&telAdhe="+$scope.adherentTel+"&emailAdhe="+$scope.adherentEmail).success(function(data){

        getAdherents();
        alert(data.toString());
        
        
      });

      
         emptyReserv();

        };
    

});



function parseDate(str1){
// str1 format should be dd/mm/yyyy. Separator can be anything e.g. / or -. It wont effect
var dt1   = parseInt(str1.substring(0,2));
var mon1  = parseInt(str1.substring(3,5));
var yr1   = parseInt(str1.substring(6,10));
var date1 = new Date(yr1, mon1-1, dt1);
return date1;
    
}





