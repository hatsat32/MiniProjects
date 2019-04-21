<?php

    if(!isset($_POST["islem"]))
        exit;
    switch($_POST["islem"]){
        case "dosya_listele":
            echo dosya_listele();
            break;
        case "dosya_oku":
            echo dosya_oku($_POST["d_id"]);
            break;
        case "dosya_olustur":
            if(isset($_POST["dosyaismi"]));
                echo dosya_olustur($_POST["dosyaismi"]);
            break;
        case "dosya_sil":
            if(isset($_POST["dosya_id"]))
                echo dosya_sil($_POST["dosya_id"]);
            break;
        case "dosya_isim_degistir":
            if(isset($_POST["did"]) && isset($_POST["dosya_yeni_isim"]))
                echo dosya_isim_degistir($_POST["did"], $_POST["dosya_yeni_isim"]);
            break;
        case "sayfa_olustur":
            if(isset($_POST["sayfaismi"]) && isset($_POST["d_id"]))
                echo sayfa_olustur($_POST["sayfaismi"], $_POST["d_id"]);
            break;
        case "sayfa_sil":
            if(isset($_POST["sayfa_id"]))
                echo sayfa_sil($_POST["sayfa_id"]);
            break;
        case "sayfa_ismi_degistir":
            if(isset($_POST["sid"]) && isset($_POST["yeni_isim"]))
                echo sayfa_ismi_degistir($_POST["sid"], $_POST["yeni_isim"]);
                break;
        case "hucre_guncelle":
            if(isset($_POST["h_id"]) && isset($_POST["h_deger"])){
                echo hucre_guncelle($_POST["h_id"], $_POST["h_deger"]);
            }
            break;
        case "hucre_ss_guncelle":
            if(isset($_POST["hucre_id"]) && isset($_POST["satir"]) && isset($_POST["sutun"])){
                echo hucre_ss_guncelle($_POST["hucre_id"], $_POST["satir"], $_POST["sutun"]);
            }
            break;
        case "hucre_ekle":
            if(isset($_POST["satir"]) && isset($_POST["sutun"]) && isset($_POST["sayfa_id"]))
                echo hucre_ekle($_POST["satir"], $_POST["sutun"], $_POST["sayfa_id"]);
            break;
        case "hucre_sil":
            if(isset($_POST["hucre_id"]))
                echo hucre_sil($_POST["hucre_id"]);
            break;
        case "son_konum_kaydet":
            if(isset($_POST["dosya_id"]) && isset($_POST["sayfa_id"]) && isset($_POST["hucre_id"]) && isset($_POST["satir"]) && isset($_POST["sutun"]))
                echo son_konum_kaydet($_POST["dosya_id"], $_POST["sayfa_id"], $_POST["hucre_id"], $_POST["satir"], $_POST["sutun"]);
            break;
        default:
    }

    //TAMAM
    function db_connect(){
        /**
         * @return mysqli connection
         */

        $servername = "localhost";
        $username = "exel";
        $password = "exel";
        $database = "exel";

        $conn = new mysqli($servername, $username, $password, $database);
        if($conn->connect_error){
            die("Database Connection Failed: ".$conn->connect_error);
        }

        return $conn;
    }
    //TAMAM
    function db_connect_pdo(){
        /**
         * 
         */

        $dsn = "mysql:host=localhost:dbname=exel";
        $user = "exel";
        $pass = "exel";
        
        try{
            $conn = new PDO($dsn, $user, $pass);
        } catch(PDOException $e) {
            echo "DB PDO Connection Failed: ".$e->getMessage();
        }

        return $conn;
    }

    //TODO: TAMAMLANACAK
    function test_input($conn, $input){
        /**
         * 
         */
        return $input;
    }

    //TAMAM
    function dosya_listele(){
        /**
         * dosyaları listeler ve array olarak geri döndürür.
         */

        $sql = "SELECT * FROM dosyalar;";
        $dbdata = array();

        $conn = db_connect();
        $result = $conn->query($sql);
        while($row = $result->fetch_assoc()){
            $dbdata[] = $row;
        }
        $conn->close();

        echo json_encode($dbdata);
        return $result->fetch_array(MYSQLI_ASSOC);
    }

    //TAMAM
    function dosya_oku($d_id){
        /**
         * 
         */

        $d_id = intval($d_id);
        $sql = "SELECT d.id did, d.ad dad, s.id sid, s.ad sad, h.id hid, h.deger, h.satir, h.sutun, son_sayfa, son_hucre
                FROM dosyalar d, sayfalar s, hucreler h 
                WHERE s.dosya_id=d.id AND h.sayfa_id=s.id AND d.id=$d_id ORDER BY s.id";
        $db_data = array();

        $conn = db_connect();
        $result = $conn->query($sql);
        while($row = $result->fetch_assoc()){
            $db_data[] = $row;
        }
        $conn->close();
        //error_log("[DUBUG]-> ".print_r($tmo, TRUE));
        return json_encode($db_data);
    }

    //TODO: tamamla
    function dosya_sil($d_id){
        $conn = db_connect();
        $sql = "DELETE FROM dosyalar WHERE id=$d_id";
        $result = $conn->query($sql);
        error_log("dosya sil result-> ".$result);
        $conn->close();
        if($result === TRUE)
            return "success";
        else
            return "fail";
    }

    //TODO: test edilecek
    function dosya_isim_degistir($did, $yeni_dosya_ismi){
        $conn = db_connect();
        $sql = "UPDATE dosyalar SET ad='$yeni_dosya_ismi' WHERE id=$did";
        $result = $conn->query($sql);
        $conn->close();
        if($result === TRUE)
            return "success";
        else
            return "fail";
    }

    //TODO: YAPILACAK
    function hucre_guncelle($id, $deger){
        //error_log("[DEBUG]-> ".$id." -- ".$deger);
        $conn = db_connect();
        $sql = "UPDATE hucreler SET deger='$deger' WHERE id=$id";
        $sql = "UPDATE hucreler SET deger='$deger' WHERE id=$id";
        $result = $conn->query($sql);
        $conn->close();
        if($result == TRUE){
            return "success";
        } else {
            return "fail";
        }
    }

    //TAMAM
    function dosya_olustur($dosya_name){
        $conn = db_connect();
        $sql = "INSERT INTO `dosyalar` (`id`, `ad`) VALUES (NULL, '$dosya_name');";
        $result = $conn->query($sql);
        
        $_d_id = $conn->insert_id;
        sayfa_olustur("sayfaa", $_d_id);
        $conn->close();
        if($result === TRUE)
            return "success";
        else {
            return "fail";
        }
    }

    //TAMAM
    function sayfa_olustur($sayfa_name, $d_id){
        $sql = "INSERT INTO `sayfalar` (`id`, `ad`, `dosya_id`) VALUES (NULL, '$sayfa_name', '$d_id')";
        $conn = db_connect();
        $result = $conn->query($sql);
        $_s_id = $conn->insert_id;
        for($i=1; $i <= 10; $i++){
            for($j=1; $j <= 10; $j++){
                hucre_ekle($i, $j, $_s_id);
            }
        }
        $conn->close();
        if($result === TRUE){
            return $_s_id;
        } else {
            return "fail";
        }
    }

    //TODO: test edilecek
    function sayfa_sil($s_id){
        $conn = db_connect();
        $sql = "DELETE FROM sayfalar WHERE id=$s_id";
        $result = $conn->query($sql);
        $conn->close();
        if($result === TRUE)
            return "success";
        else
            return "fail";
    }

    // TAMAM
    function sayfa_ismi_degistir($s_id, $yeni_sayfa_ad){
        $conn = db_connect();
        $sql = "UPDATE sayfalar SET ad='$yeni_sayfa_ad' WHERE id=$s_id";
        $result = $conn->query($sql);
        $conn->close();
        if($result === TRUE)
            return "success";
        else
            return "fail";
    }
    
    // TAMAM
    function hucre_ekle($satir, $sutun, $sayfa_id){
        $conn = db_connect();
        $sql = "INSERT INTO hucreler (satir, sutun, sayfa_id) VALUES ($satir, $sutun, $sayfa_id)";
        $result = $conn->query($sql);
        $_id = $conn->insert_id;
        $conn->close();
        if($result ===  TRUE)
            return $_id;
        else
            return "fail";
    }

    function hucre_ss_guncelle($h_id, $satir, $sutun){
        //error_log("[DEBUG]-> ".$id." -- ".$deger);
        $conn = db_connect();
        $sql = "UPDATE hucreler SET satir=$satir, sutun=$sutun WHERE id=$h_id";
        $result = $conn->query($sql);
        $conn->close();
        if($result == TRUE){
            return "success";
        } else {
            return "fail";
        }
    }

    function hucre_sil($hucre_id){
        $conn = db_connect();
        $sql = "DELETE FROM hucreler WHERE id=$hucre_id";
        $result = $conn->query($sql);
        $conn->close();
        if($result === TRUE)
            return "success";
        else
            return "fail";
    }

    function son_konum_kaydet($dosya_id, $sayfa_id, $hucre_id, $satir, $sutun){
        error_log($dosya_id."--".$sayfa_id."--".$hucre_id."--".$satir."--".$sutun);
        $conn = db_connect();
        $sql = "UPDATE dosyalar SET son_sayfa=$sayfa_id, son_hucre=$hucre_id, son_satir=$satir, son_sutun=$sutun WHERE id=$dosya_id";
        $result = $conn->query($sql);
        $conn->close();
        if($result === TRUE)
            return "success";
        else
            return "fail;";
    }
    //echo "<pre>";
    //dosya_listele();
    //dosya_oku(1);

    //echo "</pre>";
?>
