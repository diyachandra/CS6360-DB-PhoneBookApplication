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
  $noOfPhones = (count($_GET)-1)/3;
  for ($i = 0; $i < $noOfPhones ; $i++) {
      $area_code = substr($_GET['PhoneNum'.$i], 0, 3);
      $sql = sprintf(
          "INSERT INTO PHONE (Contact_id,Phone_type,Area_code,Phone_Number) VALUES ('%s','%s','%s','%s')",
          $_GET["c_id".$i],
          $_GET['PhoneType'.$i],
          $area_code,
          $_GET['PhoneNum'.$i]
      );
      $result = $conn->query($sql);
      echo $conn->insert_id."  ";
  }
  $conn->close();
