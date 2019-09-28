<?php
    //Connect to the database
    $link = mysqli_connect('localhost', 'root', 'root', 'backendtask');
    if (mysqli_connect_error()) {
        die("ERROR: Unable to connect:" . mysqli_connect_error());
    }
?>
