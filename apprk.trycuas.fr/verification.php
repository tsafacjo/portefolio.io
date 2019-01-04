<?php 
require_once './includes/db.php'; // The mysql database connection script

if(isset($_GET['username'])){

    
    $user_name=htmlspecialchars($_GET['username']);
    $user_password=htmlspecialchars($_GET['password']);
    
    $query="SELECT * FROM users where  	USER_NAME  ='".$user_name."'  and   	USER_PASSWORD='".$user_password."'";
    
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

    $arr = array();
    $i=0 ;
    if($result->num_rows > 0) {
        if($row = $result->fetch_assoc()) {


            session_start();
            $_SESSION['idUSERS'] = $row ['idUSERS'];  
            $_SESSION['USER_NAME'] =$row ['USER_NAME']; 
            $_SESSION['USER_TYPE'] =$row ['USER_TYPE'];
            echo $_SESSION['idUSERS'].' je suis là '. $_SESSION['USER_NAME'] ;
            
           header('Location:appli.php');



        }
    }
    
    
    else {
        
        
        echo 'erreur' ;
        header('Location:index.html');
        
        
    }

    # JSON-encode the response
    echo $json_response = json_encode($arr);
    
    
    }

?>