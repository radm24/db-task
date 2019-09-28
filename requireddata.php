<?php
    include("connection.php");
    
    $json_array = array();
    
    //Check a number of doctors
    $sql = "SELECT * FROM doctors";
    $result = mysqli_query($link, $sql);
    if ($result) {
        $rows = mysqli_num_rows($result);
        if ($rows > 0) {
            //Fetch required data from the database
            for ($x = 1; $x <= $rows; $x++) {
                $sql = 'SELECT doctors.full_name, doctors.spec, sum(summ) FROM transactions JOIN doctors ON doctors.id = transactions.doc_id WHERE doc_id = ' . $x . ' AND transactions.date >= "2019-01-01" HAVING sum(summ) > "2500";';
                if ($result = mysqli_query($link, $sql)) {
                    while ($row = mysqli_fetch_assoc($result)) {
                        $json_array[] = $row;
                    }
                } else {
                    echo "An error occured!";
                }
            }    
        } else {
            echo "No data about doctors in the database!";
            exit;
        }
    } else {
        echo "An error occured!";
        exit;
    }
    
    //Sending a response
    echo json_encode($json_array);
?>

