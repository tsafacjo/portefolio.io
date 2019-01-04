<?php 

require_once '../../includes/db.php'; // The mysql database connection script


if(isset( $_GET['idMOUILL'])){
 
    
    $idMOUILL=htmlspecialchars($_GET['idMOUILL']);
    $idAdhe=htmlspecialchars($_GET['idAdhe']);
    $dateDebut=htmlspecialchars($_GET['dateDebut']);
    $dateFin=htmlspecialchars($_GET['dateFin']);
    $userId=htmlspecialchars($_GET['userId']);
    
    $query='SELECT * FROM louer AS L INNER JOIN adherent as A ON A.idADHERENT=L.ADHERENT_idADHERENT INNER JOIN mouillages AS M ON M.idMOUILL=L.MOUILLAGES_idMOUILL AND M.idMOUILL='.$idMOUILL;    
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    echo " R1 ".$query."<br/>" ;
    $arr=array();
    $i=0;
    
    if($result->num_rows > 0) {
          
            if($row = $result->fetch_assoc()) {


                    $query="update louer set  DATE_DEBUT ='".$dateDebut."',DATE_FIN='".$dateFin."' where MOUILLAGES_idMOUILL=".$idMOUILL;

                    echo " R1 ".$query."<br/>" ;
                    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
                    $result = $mysqli->affected_rows;

        }
    }

    else {


        $ligne=htmlspecialchars($_GET['ligne']);
        $numero=htmlspecialchars($_GET['numero']);
        $nomAdhe=htmlspecialchars($_GET['nomAdherent']);
        $prenomAdhe=htmlspecialchars($_GET['prenomAdherent']);
        $telAdhe=htmlspecialchars($_GET['telAdherent']);        
        $nomBateau=htmlspecialchars($_GET['nomBateau']);
        $typeBateau=htmlspecialchars($_GET['typeBateau']);   
        
        
        // on récupère l'id du mouillage concerné 
        
        
                // on teste l'existence de l'adhérents
        
        
            
        $query="SELECT * FROM  mouillages  where LIGNE ='".$ligne."' and NUMERO ='".$numero."'";
        echo 'query '.$query.'<br/>' ;
        
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

        echo " R1 ".$query."<br/>" ;

        
        // il existe déjà on  fait pareil pour le bateau
        if($result->num_rows > 0) {

       
                
                $row = $result->fetch_assoc() ;
                $idMOUILL=$row ['idMOUILL'];
                
        }
        
        else {
            
            
             echo " Le mouillage que vous avez choisi n'existe pas " ;
            
        }
        
        
        
        // on teste l'existence de l'adhérents
        
        
            
        $query="SELECT * FROM adherent  where NOM_ADHERENT ='".$nomAdhe."' and PRENOM_ADHERENT='".$prenomAdhe."'";
        echo 'query '.$query.'<br/>' ;
        
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

        echo " R1 ".$query."<br/>" ;

        
        // il existe déjà on  fait pareil pour le bateau
        if($result->num_rows > 0) {
                
                
                $row = $result->fetch_assoc() ;
                $idAdhe=$row ['idADHERENT'];

        }
        

        
        
        // on le crée s'il n'existe pas 
        
        else{
            

            $query="INSERT INTO adherent (idADHERENT, NOM_ADHERENT, PRENOM_ADHERENT, TEL_ADHERENT,MAIL_ADHERENT)  VALUES (NULL,'".$nomAdhe."','".$prenomAdhe."','".$telAdhe."',NULL);";

            $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

            $result = $mysqli->affected_rows; 
             echo 'query '.$query.'<br/> <br/>' ;
            
            // on récupère son id 
            
            $query="SELECT * FROM adherent   where NOM_ADHERENT='".$nomAdhe."' and PRENOM_ADHERENT='".$prenomAdhe."'";
            
            echo 'query '.$query.'<br/> <br/>';
            
            $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

            
            echo " R1 ".$query."<br/><br/>" ;
            

        
            
        // si le bateau existe déja 
            
            if($result->num_rows > 0) {
                
                $row = $result->fetch_assoc() ;
                $idAdhe=$row ['idADHERENT'];
                
                echo 'ici '.$row ['idADHERENT'] ;     




            }
        }

        
        // on fait pareil pour le bateau 
        
            
            
        
            $query="SELECT * FROM bateau  where NOM_BATEAU ='".$nomBateau."' and TYPE_BATEAU='".$typeBateau."'";
            echo 'query '.$query.'<br/>' ;

            $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

            echo " R1 ".$query."<br/>" ;

            if($result->num_rows > 0) {    
                
                 $row = $result->fetch_assoc() ;
                $idBateau=$row ['idBATEAU'];
        

            }
        

        
        
        // on le crée s'il n'existe pas 

            else{
                
                
                
        
            $query="INSERT INTO bateau (idBATEAU,NOM_BATEAU,ADHERENT_idADHERENT,TYPE_BATEAU) VALUES (NULL,'".$nomBateau."','".$idAdhe."','".$typeBateau."');";
            $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
            $result = $mysqli->affected_rows;
                
                        // on récupère son id 
            
            $query="SELECT  *FROM bateau  where NOM_BATEAU='".$nomBateau."' and TYPE_BATEAU='".$typeBateau."'";
            echo 'query '.$query.'<br/> <br/>';
                
            $result = $mysqli->query($query) or die($mysqli->error.__LINE__);            
            echo " R1 ".$query."<br/><br/>" ;

        // si le bateau existe déja 

                
        if($result->num_rows > 0) {
                
                $row = $result->fetch_assoc() ;
                $idBateau=$row ['idBATEAU'];
                
                echo 'ici'.$row ['idBATEAU'] ;     




            }    

             /*   $query="INSERT INTO louer (ADHERENT_idADHERENT,MOUILLAGES_idMOUILL,DATE_ADHERENT_has_MOUILLAGES, DATE_ADHERENT_has_MOUILLAGESFIN, LOUERcol,USERS_idUSERS) VALUES ('".$idAdhe."','".$idMOUILL."','".$dateDebut."','". $dateFin."',NULL,'".userId."');";
                $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
                $result = $mysqli->affected_rows;  

                echo'erreur' ;*/
                



            }


        
        
        $query="INSERT INTO louer (ADHERENT_idADHERENT,MOUILLAGES_idMOUILL,DATE_DEBUT,DATE_FIN,LOUERcol,USERS_idUSERS, BATEAU_idBATEAU) VALUES ('".$idAdhe."','".$idMOUILL."','".$dateDebut."','".$dateFin."',NULL,'".$userId."','".$idBateau."');";
        
        echo " R1 ".$query."<br/><br/>" ;
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
        $result = $mysqli->affected_rows;
                     
        

    }

    # JSON-encode the response
    echo $json_response = json_encode($result);

}

?>