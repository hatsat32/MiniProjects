<?php
    #include "exel.php";
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>EXEL</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" media="screen" href="exel.css" />
        <link rel="stylesheet" href="fontawesome-free-5.7.2/css/all.css">
        <script src="exel.js"></script>
    </head>
    <body>
        <form action="exel.php" method="post" id="dosyaekleform">
            <input name="dosyaismi" type="text" placeholder="Belge İsmi ?">
            <button type="button" onclick="yeniDosyaOluştur(this)">Yeni Belge</button>
        </form>

        <table id="dosyatable" style="font-family: sans-serif;">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>AD</th>
                    <th>ISLEM</th>
                    <th>SİL</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>

        <div style="overflow-x:auto;">
            <table id="d_table"  style="display: none; font-family: sans-serif;">
                <thead id="t_head">
                    <tr id="t_head_row" style="background-color: darkgrey;">
                        <th id="cikis" onclick="cikis(this)">Çıkış</th>
                        <th id="ekleCol" onclick="ekleCol(this, yeni=true)"><i class="fas fa-plus-square" style="color: green;"></i></th>
                    </tr>
                </thead>
                <tbody id="t_body">
                    <tr style="background-color: darkgrey;">
                        <td id="ekleRow" onclick="ekleRow(this, yeni=true)"><i class="fas fa-plus-square" style="color: green;"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>    	
    </body>
</html>