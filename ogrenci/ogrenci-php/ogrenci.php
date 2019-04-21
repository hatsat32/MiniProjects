<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="w3.css">
    </head>
    <body>
        <?php

            //form();
            function db_con(){
                $con = mysqli_connect("localhost", "digital", "digital", "digitaltrade");
                if(!$con){
                    echo "baglanti hatasi".mysqli_error($con);
                }
                return $con;
            }
            function test_input($data) {
                // input güvenliği için. sonra kullanılacak.
                $data = trim($data);
                $data = stripslashes($data);
                $data = htmlspecialchars($data);
                return $data;
            }

            if(!isset($_GET["is"])){
                $_GET["is"] = "";
            }
            switch($_GET["is"]){
                case "ekle":
                    ekle();
                    break;
                case "sil":
                    sil();
                    break;
                case "guncelle":
                    if(!isset($_GET["commit"]))
                        form_guncelle($_GET["ono"], $_GET["adi"], $_GET["soyadi"]);
                    else
                        guncelle();
                    break;
                case "listele":
                    listele();
                    break;
                case "form":
                    form();
                    break;
                default:
                form();
                listele();
            }

            function ekle(){
                $con = db_con();
                $sql = "INSERT INTO ogrenci(ono, adi, soyadi) VALUES(".$_GET["ono"].",'".$_GET["adi"]."','".$_GET["soyadi"]."');";
                echo $sql."</br>";
                $sonuc = mysqli_query($con, $sql);
                //echo "".$sonuc;
                if($sonuc){
                    echo "succesfully added.";
                } else {
                    echo "there was an error while inserting";
                }
                mysqli_close($con);
                listele();
            }
            function sil(){
                $con = db_con();
                $sql = "DELETE FROM ogrenci WHERE ono=".$_GET["ono"];
                $result = mysqli_query($con, $sql);
                if(result){
                    echo "silme işlemi başarılı";
                } else {
                    echo "silme işlemi hatalı";
                }
                mysqli_close($con);
                listele();
            }
            function guncelle(){
                $con = db_con();
                $sql = "UPDATE ogrenci SET adi='".$_GET["adi"]."', soyadi='".$_GET["soyadi"]."' WHERE ono=".$_GET["ono"];
                echo "".$sql;
                $result = mysqli_query($con, $sql);
                if($result) {
                    echo "guncelleme işlemi başarılı";
                } else {
                    echo "guncelleme eşlemi HATALI";
                }
                mysqli_close($con);
                listele();
            }
            function listele(){
                ?>
                    <table border-collapse="collapse">
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th>ADİ</th>
                                <th>SOYADİ</th>
                                <th>SİL</th>
                                <th>GÜNCELLE</th>
                            </tr>
                        </thead>
                        <tbody>
                        <?php
                            $con = db_con();
                            $sql = "SELECT * FROM ogrenci;";
                            $result = mysqli_query($con, $sql);
                            while($row = mysqli_fetch_assoc($result)) {
                                echo "<tr>";
                                echo "    <td>".$row["ono"]."</td>";
                                echo "    <td contenteditable='true'>".$row["adi"]."</td>";
                                echo "    <td contenteditable='true'>".$row["soyadi"]."</td>";
                                echo "    <td><a href='?is=sil&ono=".$row["ono"]."'>Sil</a></td>";
                                echo "    <td><a id='gun_btn' href='?is=guncelle&ono=".$row["ono"]."&adi=".$row["adi"]."&soyadi=".$row["soyadi"]."'>Guncelle</a></td>";
                                echo "</tr>";
                            }
                            mysqli_close($con);
                        ?>
                        </tbody>
                    </table>
                <?php
            }
            function form(){
                ?>
                    <form action="ogrenci.php" method="GET">
                        <input name="is" type="hidden" value="ekle">
                        NO:<input type="number" name="ono">
                        NAME:<input type="text" name="adi">
                        SURNAME:<input type="text" name="soyadi">
                        <input type="submit">
                    </form>
                <?php
            }
            function form_guncelle($ono, $adi, $soyadi){
                ?>
                    <form action="ogrenci.php" method="GET">
                        <input name="is" type="hidden" value="guncelle">
                        NO:<input readonly type="number" name="ono"value="<?= $ono ?>">
                        NAME:<input type="text" name="adi"value="<?= $soyadi ?>">
                        SURNAME:<input type="text" name="soyadi"value="<?= $soyadi ?>">
                        <input name="commit" type="hidden">
                        <input type="submit">
                    </form>
                <?php
            }
        ?>
    </body>
</html>