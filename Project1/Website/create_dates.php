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

  $noOfDates = (count($_GET)-1)/3;
  for ($i = 0; $i < $noOfDates ; $i++) {
      {
          $sql = sprintf(
              "INSERT INTO DATES (Contact_id,Date_type,Date_value) VALUES ('%s','%s','%s')",
              $_GET['c_id'.$i],
              $_GET['DateType'.$i],
              $_GET['Date'.$i]
          );
          $result = $conn->query($sql);
          echo $conn->insert_id."  ";
      }
  }
  $conn->close();
