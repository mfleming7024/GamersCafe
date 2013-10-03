<?php

echo "Hello";

$db = new PDO("mysql:hostname = localhost;port=8889;dbname=example1306", "root", "root");

$age = 30;

$sql = "Select firstname, lastname from users where age > :age limit 10";

$s = $db->prepare($sql);
$s->execute(array(":age"=>$age));
$sqlResults = $s->fetchAll();

foreach ($sqlResults as $num => $row) {
	echo "<br />";
	echo $row[0];
	echo " ";
	echo $row[1];
	
}
	
?>