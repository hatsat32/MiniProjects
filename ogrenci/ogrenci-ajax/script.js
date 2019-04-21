function new_trow(){
	var gbtn = document.createElement("button");
	gbtn.setAttribute("type", "button"); gbtn.setAttribute("onclick", "guncelle(this)"); gbtn.innerHTML = "Güncelle";
	var sbtn = document.createElement("button");  sbtn.innerHTML = "Sil";

	var tr = document.createElement("tr");
	var td1 = document.createElement("td"); td1.innerHTML = ono;
	var td2 = document.createElement("td"); td2.innerHTML = adi;
	var td3 = document.createElement("td"); td3.innerHTML = soyadi;

	var td4 = document.createElement("td"); td4.appendChild(gbtn);
	var td5 = document.createElement("td"); sbtn.setAttribute("onclick", "sil("+ono+")"); td5.appendChild(sbtn);
	
	tr.appendChild(td1); tr.appendChild(td2); tr.appendChild(td3); tr.appendChild(td4); tr.appendChild(td5);
	tbody.appendChild(tr);
}

function listele(){
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
	    if(this.readyState == 4 && this.status == 200) {
	    	document.getElementById("tcontent").innerHTML = this.responseText;
	    }
    };

	xhttp.open("POST", "server.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 	xhttp.send("q=listele");
}

function listele_json(){
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
	    if(this.readyState == 4 && this.status == 200) {
			var json_data = JSON.parse(this.responseText);
			tbody = document.getElementById("tcontent");

			for(let i=0, len=json_data.length; i<len; i++){
				var gbtn = document.createElement("button");
				gbtn.setAttribute("type", "button"); gbtn.setAttribute("onclick", "guncelle(this)"); gbtn.innerHTML = "Güncelle";
				var sbtn = document.createElement("button");  sbtn.innerHTML = "Sil";

				var tr = document.createElement("tr");
				var td1 = document.createElement("td"); td1.innerHTML = json_data[i]["ono"];
				var td2 = document.createElement("td"); td2.innerHTML = json_data[i]["adi"];
				var td3 = document.createElement("td"); td3.innerHTML = json_data[i]["soyadi"];

				var td4 = document.createElement("td"); td4.appendChild(gbtn);
				var td5 = document.createElement("td"); sbtn.setAttribute("onclick", "sil("+json_data[i]["ono"]+", this)"); td5.appendChild(sbtn);
				
				tr.appendChild(td1); tr.appendChild(td2); tr.appendChild(td3); tr.appendChild(td4); tr.appendChild(td5);
				tbody.appendChild(tr);
			}
	    }
    };

	xhttp.open("POST", "server.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 	xhttp.send("q=listele_json");
}

function ekle(){
	var xhttp = new XMLHttpRequest();

	var ono = document.getElementById("ono").value;
	var adi = document.getElementById("adi").value;
	var soyadi = document.getElementById("soyadi").value;

	xhttp.onreadystatechange = function() {
	    if(this.readyState == 4 && this.status == 200) {
	    	if(this.responseText == "successful") {
	    		document.getElementById("ono").value = "";
	    		document.getElementById("adi").value = "";
	    		document.getElementById("soyadi").value = "";
	    	} else {
	    	}
	    }
    };

	xhttp.open("POST", "server.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 	xhttp.send("q=ekle&ono="+ono+"&adi="+adi+"&soyadi="+soyadi);

	let tbody = document.getElementById("tcontent");
	var gbtn = document.createElement("button");
	gbtn.setAttribute("type", "button"); gbtn.setAttribute("onclick", "guncelle(this)"); gbtn.innerHTML = "Güncelle";
	var sbtn = document.createElement("button");  sbtn.innerHTML = "Sil";

	var tr = document.createElement("tr");
	var td1 = document.createElement("td"); td1.innerHTML = ono;
	var td2 = document.createElement("td"); td2.innerHTML = adi;
	var td3 = document.createElement("td"); td3.innerHTML = soyadi;

	var td4 = document.createElement("td"); td4.appendChild(gbtn);
	var td5 = document.createElement("td"); sbtn.setAttribute("onclick", "sil("+ono+")"); td5.appendChild(sbtn);
	
	tr.appendChild(td1); tr.appendChild(td2); tr.appendChild(td3); tr.appendChild(td4); tr.appendChild(td5);
	tbody.appendChild(tr);
}

function sil(ono, btn){
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
	    if(this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);
			let tr = btn.parentElement.parentElement;
			tr.parentElement.removeChild(tr);
	    }
    };
	xhttp.open("POST", "server.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 	xhttp.send("q=sil&ono="+ono);
}

function guncelle_eski(btn){
	var xhttp = new XMLHttpRequest();
	tr = btn.parentElement.parentElement;

	ono = tr.getElementsByTagName("td")[0].innerHTML;
	adi = tr.getElementsByTagName("td")[1].innerHTML;
	soyadi = tr.getElementsByTagName("td")[2].innerHTML;
	
	console.log(""+ono+adi+soyadi)

	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			console.log(this.responseText);
			if(this.responseText == "successful"){

			} else {

			}
		}
	}

	xhttp.open("POST", "server.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("q=guncelle"+"&ono="+ono+"&adi="+adi+"&soyadi="+soyadi);

	listele();
}

function arama(){
	var xhttp = new XMLHttpRequest();

	var ono = document.getElementById("ono").value;
	var adi = document.getElementById("adi").value;
	var soyadi = document.getElementById("soyadi").value;

	xhttp.onreadystatechange = function() {
	    if(this.readyState == 4 && this.status == 200) {
	    	if(this.responseText != "successful") {
	    		document.getElementById("ono").value = "";
	    		document.getElementById("adi").value = "";
	    		document.getElementById("soyadi").value = "";
				document.getElementById("tcontent").innerHTML = this.responseText;
	    	} else {
	    		document.getElementById("message").innerHTML = "BİR HATA OLDU";
	    	}
	    }
    };

	xhttp.open("POST", "server.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 	xhttp.send("q=arama"+"&ono="+ono+"&adi="+adi+"&soyadi="+soyadi);
}
function arama_json(){
	var ono = document.getElementById("ono").value;
	var adi = document.getElementById("adi").value;
	var soyadi = document.getElementById("soyadi").value;
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if(this.readyState == 4 && this.status == 200) {
	    	if(this.responseText != "successful") {
	    		document.getElementById("ono").value = "";
	    		document.getElementById("adi").value = "";
	    		document.getElementById("soyadi").value = "";
				
				var json_data = JSON.parse(this.responseText);
				
				tbody = document.getElementById("tcontent");
				tbody.innerHTML = "";
			for(let i=0, len=json_data.length; i<len; i++){
				var gbtn = document.createElement("button");
				gbtn.setAttribute("type", "button"); gbtn.setAttribute("onclick", "guncelle(this)"); gbtn.innerHTML = "Güncelle";
				var sbtn = document.createElement("button");  sbtn.innerHTML = "Sil";

				var tr = document.createElement("tr");
				var td1 = document.createElement("td"); td1.innerHTML = json_data[i]["ono"];
				var td2 = document.createElement("td"); td2.innerHTML = json_data[i]["adi"];
				var td3 = document.createElement("td"); td3.innerHTML = json_data[i]["soyadi"];

				var td4 = document.createElement("td"); td4.appendChild(gbtn);
				var td5 = document.createElement("td"); sbtn.setAttribute("onclick", "sil("+json_data[i]["ono"]+")"); td5.appendChild(sbtn);
				
				tr.appendChild(td1); tr.appendChild(td2); tr.appendChild(td3); tr.appendChild(td4); tr.appendChild(td5);
				tbody.appendChild(tr);
			}
	    	} else {
	    		document.getElementById("message").innerHTML = "BİR HATA OLDU";
	    	}
	    }
    };

	xhttp.open("POST", "server.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 	xhttp.send("q=arama_json"+"&ono="+ono+"&adi="+adi+"&soyadi="+soyadi);
}

function header(){
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
	    if(this.readyState == 4 && this.status == 200) {
	    	document.getElementById("header").innerHTML = this.responseText;
	    }
    };

	xhttp.open("POST", "server.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 	xhttp.send("q=header");
}
function footer(){
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
	    if(this.readyState == 4 && this.status == 200) {
	    	document.getElementById("footer").innerHTML = this.responseText;
	    }
    };

	xhttp.open("POST", "server.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 	xhttp.send("q=footer");
}

function guncelle(btn){
	btn.innerHTML = "Kaydet"
	btn.setAttribute("onclick", "kaydet(this)");

	var tr = btn.parentElement.parentElement;

	var td1 = tr.getElementsByTagName("td")[1];
	var td2 = tr.getElementsByTagName("td")[2];
	var adi = td1.innerHTML;
	var soyadi = td2.innerHTML;

	var i1 = document.createElement("input");
	i1.setAttribute("type", "text");
	i1.setAttribute("name", "adi");
	i1.value = adi;

	var i2 = document.createElement("input");
	i2.setAttribute("type", "text");
	i2.setAttribute("name", "soyadi");
	i2.value = soyadi;
	td1.innerHTML = "";
	td2.innerHTML = "";
	td1.appendChild(i1);
	td2.appendChild(i2);
}

function kaydet(btn){
	tr = btn.parentElement.parentElement;
	i1 = tr.getElementsByTagName("input")[0];
	i2 = tr.getElementsByTagName("input")[1];

	
	ono = tr.getElementsByTagName("td")[0].innerHTML;
	adi = i1.value;
	soyadi = i2.value;
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			//console.log(this.responseText);
		}
	}

	xhttp.open("POST", "server.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("q=guncelle"+"&ono="+ono+"&adi="+adi+"&soyadi="+soyadi);

	var td1 = tr.getElementsByTagName("td")[1];
	var td2 = tr.getElementsByTagName("td")[2];
	td1.innerHTML = adi;
	td2.innerHTML = soyadi

	btn.setAttribute("onclick", "guncelle(this)");
	btn.innerHTML = "Güncelle";
}

function sortTable(n) {
	if(document.getElementsByTagName("span")[n].className == "fa fa-sort-up"){
		document.getElementsByTagName("span")[n].className = "fa fa-sort-down"
	} else {
		document.getElementsByTagName("span")[n].className = "fa fa-sort-up"
	}
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	table = document.getElementById("students");
	switching = true;
	dir = "asc"; 

	while (switching) {
		switching = false;
		rows = table.rows;
		for (i = 1; i < (rows.length - 1); i++) {
			shouldSwitch = false;
			x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];
			if (dir == "asc") {
				if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
					shouldSwitch= true;
					break;
				}
			} else if (dir == "desc") {
				if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			switchcount ++;      
		} else {
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
}

function sortTable_no(n) {
	if(document.getElementsByTagName("span")[n].className == "fa fa-sort-up"){
		document.getElementsByTagName("span")[n].className = "fa fa-sort-down"
	} else {
		document.getElementsByTagName("span")[n].className = "fa fa-sort-up"
	}
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	table = document.getElementById("students");
	switching = true;
	dir = "asc"; 
	while (switching) {
		switching = false;
		rows = table.rows;
		for (i = 1; i < (rows.length - 1); i++) {
			shouldSwitch = false;
			x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];
			if (dir == "asc") {
				if (Number(x.innerHTML.toLowerCase()) > Number(y.innerHTML.toLowerCase())) {
					shouldSwitch= true;
					break;
				}
			} else if (dir == "desc") {
				if (Number(x.innerHTML.toLowerCase()) < Number(y.innerHTML.toLowerCase())) {
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			switchcount ++;      
		} else {
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
}
//listele();
listele_json();

footer();
header();
