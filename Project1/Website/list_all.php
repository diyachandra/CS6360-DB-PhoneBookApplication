<?php
  $host = "localhost";
  $username = "root";
  $password = "root";
  $dbname = "dbproject";
  $port = "8889";
  $conn = new mysqli($host, $username, $password, $dbname, $port);
  $result_array= array();
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }
  //echo "Connected successfully";
  $sql = "select * from contact";

 $result = $conn->query($sql);
 if ($result->num_rows > 0) {
     while ($row = $result->fetch_assoc()) {
         array_push($result_array, $row);
     }
 }
/* send a JSON encded array to client */
header('Content-type: application/json');
echo json_encode($result_array);
$conn->close();
