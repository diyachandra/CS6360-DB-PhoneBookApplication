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
  $noOfAddresses = (count($_GET)-1)/6;
  for ($i = 0; $i < $noOfAddresses ; $i++) {
      $sql = sprintf(
          "INSERT INTO ADDRESS (Contact_id,Address_type,Address,City,State,Zip)VALUES ('%s','%s','%s','%s','%s','%s')",
          $_GET['c_id'.$i],
          $_GET['AddressType'.$i],
          $_GET['Address'.$i],
          $_GET['City'.$i],
          $_GET['State'.$i],
          $_GET['Zip'.$i]
      );
      $conn->query($sql);
      echo $conn->insert_id."  ";
  }
  $conn->close();
