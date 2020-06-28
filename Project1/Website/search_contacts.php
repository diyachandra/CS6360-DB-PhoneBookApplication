<?php
$host = "localhost";
$username = "root";
$password = "root";
$dbname = "dbproject";
$port = "8889";
$conn = new mysqli($host, $username, $password, $dbname, $port);
$result_array = array();

if ($conn->connect_error) {
    echo ("Connection failed: " . $conn->connect_error);
}
$total_params_types = count($_GET);
$sql = "select distinct
contact.*,
address.address_type,address.address,address.city,address.state,address.zip,
phone.phone_type,phone.area_code,phone.phone_number,
dates.date_type,dates.date_value
from contact
left join address on contact.contact_id=address.contact_id
left join phone on contact.contact_id=phone.contact_id
left join dates on contact.contact_id= dates.contact_id
where  (";

$first = true;
foreach ($_GET as $array_name => $value) {
    if ($first != true) {
        $sql .= ' ) and ( ';
    }
    $first = false;
    $sql .= " ( ";
    foreach ($value as $k => $v) {
        if ($k != 0) {
            $sql .= ') and ( ';
        }
        switch ($array_name) {
            case "misc":
                $sql .= sprintf(" upper(%s)='%s' ", 'fname', $v);
                $sql .= sprintf(" or upper(%s)='%s' ", 'mname', $v);
                $sql .= sprintf(" or upper(%s)='%s' ", 'lname', $v);
                $sql .= sprintf(" or upper(%s)='%s' ", 'state', $v);
                $sql .= sprintf(" or upper(%s)='%s' ", 'city', $v);
                break;
            default:
                $sql .= sprintf("upper(%s)='%s'", $array_name, $v);
                break;
        }
    }
    $sql .= ' ) ';
}
$sql .= ' ) ';
//echo $sql;

$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $temp = array();
        array_push($temp, $row['Contact_id'], $row['Fname'], $row['Mname'], $row['Lname']);
        array_push($result_array, $temp);
    }
}
/* send a JSON encded array to client */
header('Content-type: application/json');
$conn->close();
echo json_encode(array_unique($result_array, $SORT_STRING));
