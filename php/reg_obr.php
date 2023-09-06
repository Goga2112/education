<?php
header('Content-Type: text/html; charset=utf-8');

$mysqli = mysqli_connect("localhost", "goga2029_education", "Rugby2029", "goga2029_education");
if ($mysqli == false){
    print("Ошибка: Невозможно подключиться к MySQL " . mysqli_connect_error());
}else{
    print("Соединение установлено успешно");
    $name = $_POST["name"];
    $lastname = $_POST["lastname"];
    $email = $_POST["email"];
    $pass = $_POST["pass"];
    $result = $mysqli->query("SELECT * FROM `users` WHERE `email`='$email'");
    var_dump("$result");
    /* $mysqli ->query("INSERT INTO `users`(`id`, `name`, `lastname`, `email`, `pass`) VALUES ('$name', '$lastname','$email', '$pass'" ); */
}
