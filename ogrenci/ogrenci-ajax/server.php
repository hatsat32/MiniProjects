<?php
	function db_con(){
        $con = mysqli_connect("localhost", "digital", "digital", "digitaltrade");
        if(!$con){
            echo "baglanti hatasi".mysqli_error($con);
        }
        return $con;
	}
	
	function test_input($con, $input){
		// for sql injection
		$input =  mysqli_real_escape_string($con, $input);
		return $input;
	}

    function listele(){
    	$con = db_con();
	    $sql = "SELECT * FROM ogrenci";
	    $result = mysqli_query($con, $sql);

	    while($row = mysqli_fetch_assoc($result)){
	    	echo "<tr>\n";
			echo "	<td>".$row["ono"]."</td>\n";
			echo "	<td contenteditable='true'>".$row["adi"]."</td>\n";
			echo "	<td contenteditable='true'>".$row["soyadi"]."</td>\n";
			echo "	<td><button type='button' onclick='guncelle(this)'>Guncelle</button></td>\n";
			echo "	<td><button type='button' onclick='sil(".$row["ono"].", this);'>Sil</button></td>\n";
			echo "</tr>\n";
	    }
	}
	function listele_json(){
		$con = db_con();
	    $sql = "SELECT * FROM ogrenci";
	    $result = mysqli_query($con, $sql);
		
		$return_arr = array();
	    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
			$row_array["ono"] = $row["ono"];
			$row_array["adi"] = $row["adi"];
			$row_array["soyadi"] = $row["soyadi"];
			array_push($return_arr, $row_array);
		}
		echo json_encode($return_arr);
		mysqli_close($con);
	}

    function ekle($ono, $adi, $soyadi){
		$con = db_con();
		
    	$ono = test_input($con, $ono);
    	$adi = test_input($con, $adi);
    	$soyadi = test_input($con, $soyadi);

    	$sql = "INSERT INTO ogrenci(ono, adi, soyadi) VALUES(".$ono.", '".$adi."', '".$soyadi."')";
    	$result = mysqli_query($con, $sql);

    	if($result) {
            echo "successful";
        } else {
            echo "fail";
        }
        mysqli_close($con);
	}

    function sil($ono){
		$con = db_con();
		
    	$ono = test_input($con, $ono);
    	$sql = "DELETE FROM ogrenci WHERE ono=".$ono;

    	$result = mysqli_query($con, $sql);
        if($result){
            echo "successfull";
        } else {
            echo "fail";
        }
        mysqli_close($con);
    }

    function guncelle($ono, $adi, $soyadi){
		$con = db_con();
		
    	$ono = test_input($con, $ono);
    	$adi = test_input($con, $adi);
    	$soyadi = test_input($con, $soyadi);

    	$sql = "UPDATE ogrenci SET adi='".$adi."', soyadi='".$soyadi."' WHERE ono=".$ono;

    	error_log("[DUBUG]-> ".print_r($sql, TRUE));

    	$result = mysqli_query($con, $sql);
        if($result){
            echo "successfull";
        } else {
            echo "fail";
        }
        mysqli_close($con);
    }

    function arama($ono=0, $adi="", $soyadi=""){
		$con = db_con();
		
		#$ono = $ono ? $ono : 0;
    	$ono = test_input($con, $ono);
    	$adi = test_input($con, $adi);
    	$soyadi = test_input($con, $soyadi);

		$sql = "SELECT DISTINCT * FROM ogrenci WHERE ono LIKE $ono OR adi LIKE '$adi' OR soyadi LIKE '$soyadi'";

    	error_log("[DEBUG]-> ".print_r($sql, TRUE));
    	$result = mysqli_query($con, $sql);

    	//$result = mysqli_query($con, $sql);
        //if($result){
        //    echo "successfull";
        //} else {
        //    echo "fail";
        //}

        while($row = mysqli_fetch_assoc($result)){
	    	echo "<tr>\n";
			echo "	<td>".$row["ono"]."</td>\n";
			echo "	<td contenteditable='true'>".$row["adi"]."</td>\n";
			echo "	<td contenteditable='true'>".$row["soyadi"]."</td>\n";
			echo "	<td><button class='w3-button w3-teal w3-round-large' type='button' onclick='guncelle(this)'>Guncelle</button></td>\n";
			echo "	<td><button class='w3-button w3-teal w3-round-large' type='button' onclick='sil(".$row["ono"].");'>Sil</button></td>\n";
			echo "</tr>\n";
	    }

        mysqli_close($con);
	}
	function arama_json($ono=0, $adi="", $soyadi=""){
		$con = db_con();
		
		$ono = test_input($con, $ono);
    	$adi = test_input($con, $adi);
    	$soyadi = test_input($con, $soyadi);

		$sql = "SELECT DISTINCT * FROM ogrenci WHERE ono LIKE $ono OR adi LIKE '$adi' OR soyadi LIKE '$soyadi'";

    	error_log("[DEBUG]-> ".print_r($sql, TRUE));
    	$result = mysqli_query($con, $sql);

		$return_arr = array();
	    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
			$row_array["ono"] = $row["ono"];
			$row_array["adi"] = $row["adi"];
			$row_array["soyadi"] = $row["soyadi"];
			array_push($return_arr, $row_array);
		}
		echo json_encode($return_arr);

        mysqli_close($con);
	}
	
	function page_header(){
		//echo "header";
	}

	function page_footer(){
		//echo "footer";
	}

	error_log("[DUBUG]-> ".print_r($_POST, TRUE));
	$q = $_POST["q"];
    switch ($q) {
		case "listele":
			listele();
			break;
		case "listele_json":
			listele_json();
    		break;
    	case "ekle":
    		ekle($_POST["ono"], $_POST["adi"], $_POST["soyadi"]);
    		break;
		case "sil":
			sil($_POST["ono"]);
			break;
    	case "guncelle":
    		guncelle($_POST["ono"], $_POST["adi"], $_POST["soyadi"]);
    		break;
		case "arama":
			arama($_POST["ono"] ? $_POST["ono"]:0, $_POST["adi"], $_POST["soyadi"]);
			break;
		case "arama_json":
			arama_json($_POST["ono"] ? $_POST["ono"]:0, $_POST["adi"], $_POST["soyadi"]);
			break;
		case "header":
			page_header();
			break;
		case "footer":
			page_footer();
			break;
		default:
			# CODE
			break;
    }
?>