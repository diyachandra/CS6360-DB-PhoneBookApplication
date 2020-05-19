<?php
  $host = "localhost";
  $username = "root";
  $password = "root";
  $dbname = "dbproject";
  $port = "8889";
  $conn = new mysqli($host, $username, $password, $dbname, $port);
  $contact;
  if ($conn->connect_error) {
      echo("Connection failed: " . $conn->connect_error);
  }

// get count $_GET deduce the number of phones
 $noOfPhones = (count($_GET)-1)/4;
 for ($i = 0; $i <          $noOfPhones ; $i++) {
     $area_code = substr($_GET['PhoneNum'.$i], 0, 3);
     if ($_GET['phoneid'.$i] == 'undefined') {
         $sql = sprintf(
             "INSERT INTO PHONE (Contact_id,Phone_type,Area_code,Phone_Number) VALUES ('%s','%s','%s','%s')",
             $_GET["con_id".$i],
             $_GET['PhoneType'.$i],
             $area_code,
             $_GET['PhoneNum'.$i]
         );
         echo $sql."\n";
         $result = $conn->query($sql);
     } else {
         $sql = "update phone set Phone_type='".$_GET['PhoneType'.$i]."',
     Phone_Number='".$_GET['PhoneNum'.$i]."', Area_code='".$area_code."'
      where Phone_id=".$_GET['phoneid' . $i];
         $result = $conn->query($sql);
         echo $sql."\n";
     }
 }
 $conn->close();
 echo $result;
