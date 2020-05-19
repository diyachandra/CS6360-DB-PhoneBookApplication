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

  if (count($_GET) == 0) {
      die('No dates');
  }

  $noOfDates = (count($_GET)-1)/4;
  for ($i = 0; $i < $noOfDates ; $i++) {
      if ($_GET['dateid'.$i] == 'undefined') {
          $sql = sprintf(
              "INSERT INTO DATES (Contact_id,Date_type,Date_value) VALUES ('%s','%s','%s')",
              $_GET['con_id'.$i],
              $_GET['DateType'.$i],
              $_GET['Date'.$i]
          );
          $result = $conn->query($sql);
      } else {
          $sql = sprintf(
              "update dates set date_type='%s', date_value='%s' where date_id=%s",
              $_GET['DateType'.$i],
              $_GET['Date'.$i],
              $_GET['dateid'.$i]
          );
          $result = $conn->query($sql);
      }
  }
  $conn->close();
  echo 'Done';
