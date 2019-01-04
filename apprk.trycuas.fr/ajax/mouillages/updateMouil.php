<?php 
require_once '../../includes/db.php'; // The mysql database connection script



if(isset( $_GET['idMOUILL'])){
 
    $idMOUILL=htmlspecialchars($_GET['idMOUILL']);
    $typeBOUEE=htmlspecialchars($_GET['typebouee']);
    $profondeur=htmlspecialchars($_GET['profondeur']);
    


    
    $dt = new DateTime();
    $date=$dt->format('Y-m-d H:i:s');
    echo 'date '.$date;

    $query='SELECT  idMOUILL,BOUEE_idBOUEE FROM mouillages as M  JOIN affecter as A
    ON M.idMOUILL=A.MOUILLAGES_idMOUILL 
    where M.idMOUILL='.$_GET['idMOUILL'];


    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

    $arr = array();
    $i=0 ;
    if($result->num_rows > 0) {
        if($row = $result->fetch_assoc()) {


            $query="update affecter set statut=0 ,DATEFIN_AFFEC='".$date."'  where MOUILLAGES_idMOUILL=".$idMOUILL;
            
            echo '<br>  requete :'.$query ;
            
            $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
            $result = $mysqli->affected_rows;


            $query="INSERT INTO affecter(MOUILLAGES_idMOUILL,BOUEE_idBOUEE,DATE_AFFEC,DATEFIN_AFFEC,STATUT) VALUES ('".$idMOUILL."','".$typeBOUEE."','".$date."',NULL,1)";

            $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
            $result = $mysqli->affected_rows;
            
            
        }
    }

    else{

        $query="INSERT INTO affecter(MOUILLAGES_idMOUILL,BOUEE_idBOUEE,DATE_AFFEC,DATEFIN_AFFEC,STATUT) VALUES ('".$idMOUILL."','".$typeBOUEE."','".$date."',NULL,1)";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
        $result = $mysqli->affected_rows;  
        

        echo'erreur' ;

    }
    


    # JSON-encode the response
    echo $json_response = json_encode($result);

}

?>