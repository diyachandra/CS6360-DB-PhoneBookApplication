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
$sql = "delete from dates where contact_id=" . $_GET["id"] . ";"
  . "delete from phone where contact_id=" . $_GET["id"] . ";"
  . "delete from address where contact_id=" . $_GET["id"] . ";"
  . "delete from contact where contact_id=" . $_GET["id"] . ";";
$result = $conn->multi_query($sql);
$conn->close();
