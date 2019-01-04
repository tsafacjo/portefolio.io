<?php 
require_once '../../includes/db.php'; // The mysql database connection script

if(isset($_GET['idMOUILL'])and $_GET['idMOUILL']==0 ){


$idMOUILL=htmlspecialchars($_GET['idMOUILL']);
$ligne=htmlspecialchars($_GET['ligne']);
$numero=htmlspecialchars($_GET['numero']);    
$typeBOUEE=htmlspecialchars($_GET['typebouee']);
    
$profondeur=htmlspecialchars($_GET['profondeur']);
$diametre=htmlspecialchars($_GET['diametre']); 
$dt = new DateTime();
$date=$dt->format('Y-m-d H:i:s');
echo 'date '.$date;
echo 'prof '.$profondeur;
echo '<br/>'  ;   
    


$query="INSERT INTO mouillages (idMOUILL, MOUILL_PROFONDEUR,LIGNE,NUMERO) VALUES (NULL,'".$profondeur."','".$ligne."','".$numero."')";
    
echo $query     ;
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$result = $mysqli->affected_rows; 

    
$query="INSERT INTO affecter(MOUILLAGES_idMOUILL,BOUEE_idBOUEE,DATE_AFFEC,DATEFIN_AFFEC,STATUT) VALUES ('".$idMOUILL."','".$typeBOUEE."','".$date."',NULL,1)";
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
$result = $mysqli->affected_rows;
   

echo $json_response = json_encode($result);
}
?>