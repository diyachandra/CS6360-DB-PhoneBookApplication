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

  $sql = sprintf("INSERT INTO contact (Fname, Mname, Lname) VALUES ( '%s','%s','%s')", $_GET['Fname'], $_GET['Mname'], $_GET['Lname']);
  $conn->query($sql);
  $last_id = $conn->insert_id;
  $conn->close();
  echo($last_id);
