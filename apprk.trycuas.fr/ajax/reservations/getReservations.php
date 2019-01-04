<?php 
require_once '../../includes/db.php'; // The mysql database connection script



$query='SELECT * FROM `louer` AS L INNER JOIN adherent as A ON A.idADHERENT=L.ADHERENT_idADHERENT INNER JOIN mouillages AS M ON M.idMOUILL=L.MOUILLAGES_idMOUILL
 INNER JOIN bateau AS B ON B.idBATEAU=L.BATEAU_idBATEAU 
AND  A.idADHERENT=B.ADHERENT_idADHERENT
';




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