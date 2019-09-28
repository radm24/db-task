<?php
    include("connection.php");
    
    //Fetch data from the database
    $json_array = array();
    $table_names = array("doctors", "transactions");

    foreach($table_names as $value) {
        $sql = "SELECT * FROM " . $value;
        if ($result = mysqli_query($link, $sql)) {
            $array = array();
            while ($row = mysqli_fetch_assoc($result)) {
                //Converting date format to d.m.Y
                $key = array_keys($row);
                $key = $key[1];
                if ($key === 'date') {
                    $row[$key] = date('d.m.Y', strtotime($row[$key]));
                }
                array_push($array, $row);
            }
            array_push($json_array, $array);
        } else {
            echo 'An error occured!';
            exit;
        } 
    }
    
    //Sending a response
    echo json_encode($json_array);
?>