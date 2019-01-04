<?php 
require_once '../../includes/db.php'; // The mysql database connection script



$query="SELECT idMOUILL,MOUILL_PROFONDEUR,LIGNE,NUMERO,TYPE_BOUEE,DIAMETRE_CHAINE, STR_TO_DATE(DATE_FIN, '%d/%m/%Y')< CURDATE() AS LIBRE  FROM mouillages as M Left JOIN affecter as A ON M.idMOUILL=A.MOUILLAGES_idMOUILL AND A.STATUT=1 left JOIN bouee as B ON A.BOUEE_idBOUEE=B.idBOUEE left JOIN relier as R ON R.MOUILLAGES_idMOUILL=M.idMOUILL left join chaine as C ON R.CHAINE_idCHAINE=C.idCHAINE 

left join louer as L 

ON L.MOUILLAGES_idMOUILL=M.idMOUILL
ORDER BY NUMERO

";



$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$arr = array();
$i=0 ;
if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$arr[] = $row;

       
	}
}

# JSON-encode the response
echo $json_response = json_encode($arr);

?>