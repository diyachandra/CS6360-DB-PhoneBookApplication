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


  $sql = "update contact set Fname='".$_GET['Fname']."', Mname='".$_GET['Mname']."', Lname='".$_GET['Lname']."' where Contact_id=".$_GET['id'];




  // $sql = "delete from dates where contact_id=".$_GET["id"].";"
  // ."delete from phone where contact_id=".$_GET["id"].";"
  // ."delete from address where contact_id=".$_GET["id"].";"
  // ."delete from contact where contact_id=".$_GET["id"].";";
  $result = $conn->query($sql);
  $conn->close();
  echo json_encode($result);
