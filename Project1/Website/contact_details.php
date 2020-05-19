<?php
  $host = "localhost";
  $username = "root";
  $password = "root";
  $dbname = "dbproject";
  $port = "8889";
  $conn = new mysqli($host, $username, $password, $dbname, $port);
  $contact;
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }
  //echo "Connected successfully";
  $sql = "select * from contact where contact_id=".$_GET["id"];
  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
      while ($row = $result->fetch_assoc()) {
          $contact->fname = $row["Fname"];
          $contact->mname = $row["Mname"];
          $contact->lname = $row["Lname"];
      }
  }

  $sql = "select * from address where contact_id=".$_GET["id"];
  $result = $conn->query($sql);
  $contact->addresses = array();
  if ($result->num_rows > 0) {
      while ($row = $result->fetch_assoc()) {
          $address = array();
          array_push($address, $row["Address_type"], $row["Address"], $row["City"], $row["State"], $row["Zip"], $row['Address_id']);
          array_push($contact->addresses, $address);
      }
  }

  $sql = "select * from phone where contact_id=".$_GET["id"];
  $result = $conn->query($sql);
  $contact->phones = array();
  if ($result->num_rows > 0) {
      while ($row = $result->fetch_assoc()) {
          $phone = array();
          array_push($phone, $row["Phone_type"], $row["Area_code"], $row["Phone_Number"], $row["Phone_id"]);
          array_push($contact->phones, $phone);
      }
  }

  $sql = "select * from dates where contact_id=".$_GET["id"];
  $result = $conn->query($sql);
  $contact->dates = array();
  if ($result->num_rows > 0) {
      while ($row = $result->fetch_assoc()) {
          $date = array();
          array_push($date, $row["Date_type"], $row["Date_value"], $row['Date_id']);
          array_push($contact->dates, $date);
      }
  }
 /* send a JSON encded array to client */
  header('Content-type: application/json');
  echo json_encode($contact);
  $conn->close();
