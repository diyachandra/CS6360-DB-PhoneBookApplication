<?php
$host = "localhost";
$username = "root";
$password = "root";
$dbname = "dbproject";
$port = "8889";
$conn = new mysqli($host, $username, $password, $dbname, $port);
$contact;
if ($conn->connect_error) {
    echo ("Connection failed: " . $conn->connect_error);
}
$noOfAddresses = (count($_GET) - 1) / 7;
for ($i = 0; $i <  $noOfAddresses; $i++) {
    if ($_GET['addressid' . $i] == 'undefined') {
        $sql = sprintf(
            "INSERT INTO ADDRESS (Contact_id,Address_type,Address,City,State,Zip)VALUES ('%s','%s','%s','%s','%s','%s')",
            $_GET['con_id' . $i],
            $_GET['AddressType' . $i],
            $_GET['Address' . $i],
            $_GET['City' . $i],
            $_GET['State' . $i],
            $_GET['Zip' . $i]
        );
        $result = $conn->query($sql);
    } else {
        $sql = sprintf(
            "update Address set address='%s', address_type='%s', city='%s', state='%s', zip='%s' where address_id=%s",
            $_GET['Address' . $i],
            $_GET['AddressType' . $i],
            $_GET['City' . $i],
            $_GET['State' . $i],
            $_GET['Zip' . $i],
            $_GET['addressid' . $i]
        );
        $result = $conn->query($sql);
    }
}
$conn->close();
echo 'Done';
