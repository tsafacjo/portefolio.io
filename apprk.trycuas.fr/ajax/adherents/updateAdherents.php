<?php 
require_once '../../includes/db.php'; // The mysql database connection script



if(isset( $_GET['idAdhe'])){
 
    $idAdhe=htmlspecialchars($_GET['idAdhe']);
    $nomAdhe=htmlspecialchars($_GET['nomAdhe']);
    $prenomAdhe=htmlspecialchars($_GET['prenomAdhe']);    
    $telAdhe=htmlspecialchars($_GET['telAdhe']);
    $emailAdhe=htmlspecialchars($_GET['emailAdhe']);
    
       echo 'N adhe '. $idAdhe.'<br/>' ;

    if (intval($idAdhe)!=0){
        
            $query="update adherent set NOM_ADHERENT ='".$nomAdhe."' ,PRENOM_ADHERENT ='".$prenomAdhe."' ,TEL_ADHERENT ='".$telAdhe."',MAIL_ADHERENT='".$emailAdhe."' where idADHERENT='".$idAdhe."'";
            
            echo '<br>  requete :'.$query ;
            
            $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
            $result = $mysqli->affected_rows;
        
        
    }

    else{

        $query="INSERT INTO adherent(idADHERENT,NOM_ADHERENT,PRENOM_ADHERENT,TEL_ADHERENT,MAIL_ADHERENT) VALUES (NULL,'".$nomAdhe."','".$prenomAdhe."','".$telAdhe."','".$emailAdhe."')";
         echo '<br>  requete :'.$query ;
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
        $result = $mysqli->affected_rows;  
        

        echo'erreur' ;

    }
    


    # JSON-encode the response
    echo $json_response = json_encode($result);

}

?>