<?php 
require_once '../../includes/db.php'; // The mysql database connection script



if(isset($_GET['idAdhe'])){
    
    
    $idAdhe= htmlspecialchars($_GET['idAdhe']);

    $query="delete from louer  where  	ADHERENT_idADHERENT='$idAdhe'";
    
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    
    
     	

    $query="delete from bateau  where  	ADHERENT_idADHERENT='$idAdhe'";
    
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    
            
            
    $query="delete from adherent  where  	idADHERENT='$idAdhe'";
    
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

    
}
?>