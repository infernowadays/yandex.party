<?php

      $recepient = "test@ya.ru";
$sitename = "Yandex Task";

$fio = trim($_POST["fio"]);
$phone = trim($_POST["phone"]);
$email = trim($_POST["email"]);
$message = "FIO: $fio \nPhone: $phone \nEmail: $email";

$pagetitle = "New Application: \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
?>
