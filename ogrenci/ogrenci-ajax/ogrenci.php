<!DOCTYPE html>
<html>
	<head>
		<title>OGRENCİ AJAX</title>
		<script src="script.js"></script>
		<link rel="stylesheet" type="text/css" href="w3.css">
		<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
	</head>
	<body>
		<div id="header"></div>
		<div class="w3-container w3-responsive">
			<button class="w3-button w3-teal w3-round-large" type="button" onclick="listele();">OGRENCİLERİ LİSTELE	</button>
		</div>

		<div class="w3-container w3-responsiv w3-row-padding w3-row">
			<form class="w3-row w3-padding">
				<input type="number" name="ono" id="ono" placeholder="No" class="w3-input w3-border w3-round l2 m2 w3-col">
				<input type="text" name="adi" id="adi" placeholder="İsim" class="w3-input w3-border w3-round l3 m3 w3-col">
				<input type="text" name="soyadi" id="soyadi" placeholder="Soyisim" class="w3-input w3-border w3-round l3 m3 w3-col">
				<button class="w3-col l2 m2 w3-btn w3-green" type="button" onclick="ekle()">EKLE</button>
				<button class="w3-col l2 m2 w3-btn w3-green" type="button" onclick="arama_json()">ARAMA</button>
			</form>
		</div>

		<div class="w3-container w3-responsive">
			<table class="w3-table w3-striped w3-table-all w3-large" id="students">
				<thead>
					<tr class="w3-green">
						<th onclick="sortTable_no(0)">NO <span class="fa fa-sort-down"></span></td>
						<th onclick="sortTable(1)">İSİM <span class="fa fa-sort-down"></span></td>
						<th onclick="sortTable(2)">SOYİSİM <span class="fa fa-sort-down"></span></td>
						<th>İŞLEM</td>
						<th>İŞLEM</td>
					</tr>
				</thead>
				<tbody id="tcontent">
				</tbody>
			</table>
		</div>

		<div id="footer"></div>

		<div id="deneme"></div>

		<script>
		</script>
	</body>
</html>