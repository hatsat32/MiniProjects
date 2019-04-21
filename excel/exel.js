var TABLE_DATA = {};
var SAYFA_INFO = {sid: undefined, sad: undefined};
var tmp_td_data = undefined;

function defTabloOlustur(){};

//TAMAM
function hucreGuncelle(cell){
    if(cell.innerText === tmp_td_data)
        return;

    let xhttp = new XMLHttpRequest();
    xhttp.open("post", "exel.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            if(this.responseText == "success"){
                console.log("güncelleme başarılı");
            } else if(this.responseText == "fail"){
                console.log("güncelleme hatası");
            }
        }
    };
    xhttp.send("islem=hucre_guncelle&h_id="+cell.getAttribute("hid") + "&h_deger=" + cell.innerText);
    dosyaGoruntule(TABLE_DATA[Object.keys(TABLE_DATA)[0]][0].did);
};

//TAMAM
function dosyaSil(btn){
    let d_id = btn.getAttribute("d_id");
    if(confirm(d_id + " ID li dosyayı silmek istediğinizden eminmisiniz?") == false)
        return;
    xhttp = new XMLHttpRequest();
    xhttp.open("post", "exel.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){
            if(this.responseText != "fail"){
                console.log("dosya silme başarılı");
                dosyalariListele();
            }
        }
    }
    xhttp.send("islem=dosya_sil&dosya_id="+d_id);
}

// YAPILACAK
function silRow(row){
    if(confirm("Satırı silmek istediğinize eminmisiniz?") == false)
        return;

    let index = row.innerText;
    let tds = row.parentElement.children;
    for(let i=1, len=tds.length; i<len; i++){
        console.log(tds[i])
        let xhr = new XMLHttpRequest();
        xhr.open("post", "exel.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                if(this.responseText == "success")
                    console.log("satır silme başarılı");
                else
                    console.log("satır silme başarısız.")
            }
        };
        console.log("islem=hucre_sil&hucre_id=" + tds[i].getAttribute("hid"));
        xhr.send("islem=hucre_sil&hucre_id=" + tds[i].getAttribute("hid"));
        tds[0].parentElement.remove();
    }

    let trs = document.getElementById("t_body").children;

    for(let i=index-1, len=trs.length-1; i<len; i++){
        console.log(trs[i]);
        let tr_tds = trs[i].children;

        for(let j=1, len=tr_tds.length; j<len; j++){
            //let hid = tr_tds[j].getAttribute("hid");
            console.log(tr_tds[j]);
            console.log("ROW: "+ (i+1) + "COL: " + j);
            let xhr = new XMLHttpRequest();
            xhr.open("post", "exel.php", true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    if(this.responseText == "success")
                        console.log("satır guncelleme başarılı");
                    else
                        console.log("satır guncelleme başarısız.")
                }
            };
            console.log("islem=hucre_ss_guncelle&hucre_id=" +tr_tds[j].getAttribute("hid") + "&satir=" + (i+1) +"&sutun=" + j)
            xhr.send("islem=hucre_ss_guncelle&hucre_id=" + tr_tds[j].getAttribute("hid") + "&satir=" + (i+1) +"&sutun=" + j);
        }
    }

    let trs_ = document.getElementById("t_body").children;
    let temp_deger = 1;
    for(let i=0, len=trs_.length-1; i<len; i++){
        let span = minus_icon();
        span.setAttribute("onclick", "silRow(this.parentElement)")

        console.log(trs[i]);
        trs[i].children[0].innerText = temp_deger;
        trs[i].children[0].appendChild(span);
        temp_deger++;
        if(i == trs_.length - 1){
            trs_[i].children[0].remove();
        }
    }

    dosyaGoruntule(TABLE_DATA[Object.keys(TABLE_DATA)[0]][0].did);
}

// TAMAM
function silCol(colon){
    if(confirm("Sütunu silmek istediğinize eminmisiniz?") == false)
        return;
    let index = colon.innerText;
    let _hid = undefined;
    console.log("index: " + colon.innerText);
    console.log("=============================================");

    let t_body_rows = document.getElementById("t_body").children;
    for(let i=0, len=t_body_rows.length-1; i<len; i++){
        row_tds = t_body_rows[i].children;
        
        // silme işlemini yap
        for(let j=0, len=row_tds.length; j<len; j++){
            if(j == index){
                _hid = row_tds[j].getAttribute("hid");

                let xhr = new XMLHttpRequest();
                xhr.open("post", "exel.php", true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.onreadystatechange = function(){
                    if(this.readyState == 4 && this.status == 200){
                        if(this.responseText == "success")
                            console.log("kolon silme başarılı");
                        else
                            console.log("kolon silme başarısız.")
                    }
                };
                console.log("islem=hucre_sil&hucre_id=" + _hid);
                xhr.send("islem=hucre_sil&hucre_id=" + _hid);
                
                row_tds[j].remove();
            }
        }

        // aynı satırda=> satir ve sutun degistirme
        for(let j=index, len=row_tds.length; j<len; j++){
            let _hid = row_tds[j].getAttribute("hid");

            console.log("i: " + i + " j: " + j);
            let xhr = new XMLHttpRequest();
            xhr.open("post", "exel.php", true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    if(this.responseText == "success")
                        console.log("kolon index güncelleme başarılı");
                    else
                        console.log("kolon index güncelleme başarısız.")
                }
            };
            console.log("islem=hucre_ss_guncelle&hucre_id=" +_hid + "&satir=" + (i+1) +"&sutun=" + j);
            xhr.send("islem=hucre_ss_guncelle&hucre_id=" +_hid + "&satir=" + (i+1) +"&sutun=" + j);
        }
    }


    let t_head_row = document.getElementById("t_head_row").children
    let temp_sayi = 1;
    for(let i=1, len=t_head_row.length-1; i<len; i++){
        span = minus_icon();
        span.setAttribute("onclick", "lilCol(this.parentElement")

        t_head_row[i].innerText = temp_sayi;
        t_head_row[i].appendChild(span);
        temp_sayi++;
        if(i == t_head_row.length-2)
            t_head_row[i].remove();
    }
    
    dosyaGoruntule(TABLE_DATA[Object.keys(TABLE_DATA)[0]][0].did);
}

//TAMAM
function yeniDosyaOluştur(btn){
    console.log("hell");
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

        }
    };
    xhttp.open("post", "exel.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhttp.send("islem=dosya_olustur&dosyaismi=" + btn.previousElementSibling.value);

    dosyalariListele();
}

//TODO: sayfa ekleme sonrası @TABLE_DATA güncellenecek
function yeniSayfaOlustur(elm){
    let xhttp = new XMLHttpRequest();
    sayfa_ismi = "sayfa";

    xhttp.open("post", "exel.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let yeni_sayfa_id = undefined;
            if(this.responseText != "fail"){
                yeni_sayfa_id = this.responseText;
            } else {
                console.log("sayfa oluşturma hatası")
            }
            let td = document.createElement("td");
            td.setAttribute("sid", yeni_sayfa_id);
            td.innerText = sayfa_ismi;
            elm.parentElement.insertBefore(td, elm);
        }
    };
    console.log("islem=sayfa_olustur&sayfaismi=" + sayfa_ismi + "&d_id=" + TABLE_DATA[Object.keys(TABLE_DATA)[0]][0].did)
    xhttp.send("islem=sayfa_olustur&sayfaismi=" + sayfa_ismi + "&d_id=" + TABLE_DATA[Object.keys(TABLE_DATA)[0]][0].did);
    rr = document.getElementById("ekleRow").parentElement;
    dosyaGoruntule(TABLE_DATA[Object.keys(TABLE_DATA)[0]][0].did);
}

//TAMAM
function ekleCol(elm, yeni = false){
    let body = document.getElementById("t_body");
    let head = document.getElementById("t_head");
    let c_col = head.firstElementChild.childElementCount - 1;
    let c_row = body.childElementCount - 1;

    let span = minus_icon();
    span.setAttribute("onclick", "silCol(this.parentElement)")


    th = document.createElement("th");
    th.innerText = c_col;
    th.setAttribute("onclick", "sortTable(this.innerText)");
    th.appendChild(span);
    head.firstElementChild.insertBefore(th, elm);
    
    
    for(let i=0; i<c_row; i++){
        let td = document.createElement("td");
        td.setAttribute("contenteditable", "true")
        td.setAttribute("onfocusout", "hucreGuncelle(this)");
        td.setAttribute("onfocus", "tmp_td_data=this.innerText");
        td.setAttribute("onclick", "son_konum_kaydet(this)");
        console.log("->"+c_col + "-" + (i+1));
        
        if (yeni == true) {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if(this.readyState == 4 && this.status == 200){
                    if(this.responseText != "fail"){
                        td.setAttribute("hid", this.responseText);
                        console.log("hucre kaydedildi.");
                    } else {
                        console.log("hucre eklenemedi.");
                    }
                }
            };
            xhttp.open("post", "exel.php", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("islem=hucre_ekle&satir="+(i+1)+"&sutun="+c_col+"&sayfa_id="+SAYFA_INFO.sid);
        }

        body.children[i].appendChild(td);
    }

}

//TAMAM
function ekleRow(elm, yeni=false){
    let body = document.getElementById("t_body");
    let head = document.getElementById("t_head");
    let c_row = body.childElementCount - 1;
    let c_col = head.firstElementChild.childElementCount - 1;

    let span = minus_icon();
    span.setAttribute("onclick", "silRow(this.parentElement)")

    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.innerText = c_row + 1;
    td.appendChild(span)
    tr.appendChild(td);
    for(let i=0; i<c_col-1; i++){
        let td = document.createElement("td");
        td.setAttribute("contenteditable", "true");
        td.setAttribute("onfocusout", "hucreGuncelle(this)");
        td.setAttribute("onfocus", "tmp_td_data=this.innerText");
        td.setAttribute("onclick", "son_konum_kaydet(this)");
        tr.appendChild(td);

        if(yeni == true){
            let xhttp = new XMLHttpRequest();
            xhttp.open("post", "exel.php", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    if(this.responseText != "fail"){
                        td.setAttribute("hid", this.responseText);
                    }
                }
            };
            xhttp.send("islem=hucre_ekle&satir="+(c_row+1)+"&sutun="+(i+1)+"&sayfa_id="+SAYFA_INFO.sid);
        }
    }
    body.insertBefore(tr, elm.parentElement);
}

//TAMAM
function dosyalariListele(){
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            let json_data = JSON.parse(this.responseText);
            let dtable_body =  document.getElementById("dosyatable").children[1];
            dtable_body.innerHTML = "";

            for(let i=0, len=json_data.length; i<len; i++){
                let tr = document.createElement("tr")
                let td_id = document.createElement("td");
                let td_ad = document.createElement("td");
                let td_is = document.createElement("td");
                let td_sil = document.createElement("td");

                let btn = document.createElement("button");
                btn.setAttribute("type", "button");
                btn.setAttribute("onclick", "dosyaGoruntule(this.parentElement.parentElement.getElementsByTagName('td')[0].textContent); goster();");
                
                let btn_sil = document.createElement("button");
                btn_sil.setAttribute("type", "button");
                btn_sil.setAttribute("onclick", "dosyaSil(this)");
                btn_sil.setAttribute("d_id", json_data[i]["id"]);

                td_id.innerText = json_data[i]["id"];
                td_ad.innerText = json_data[i]["ad"];
                td_ad.setAttribute("ondblclick", "dosya_isim_degistir(this)");
                btn.innerText = "Görüntüle";
                btn_sil.innerText = "Sil";
                td_is.appendChild(btn);
                td_sil.appendChild(btn_sil);

                tr.appendChild(td_id);
                tr.appendChild(td_ad);
                tr.appendChild(td_is);
                tr.appendChild(td_sil);

                dtable_body.appendChild(tr);
            }
        }
    };
    xmlhttp.open("POST", "exel.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("islem=dosya_listele");
}

//TAMAM
function dosyaGoruntule(d_id){
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            TABLE_DATA = {};
            let dt = document.getElementById("dosyatable");
            let json_data = JSON.parse(this.responseText);
            console.log(json_data);

            let tmp_arr = [];
            let _sid = json_data[0].sid;
            let i = 1;
            json_data.forEach(row => {
                if(row.sid == _sid){
                    tmp_arr.push(row);
                } else if (row.sid != _sid || json_data){
                    TABLE_DATA[tmp_arr[0].sid] = tmp_arr;
                    tmp_arr = [];
                    _sid = row.sid;
                    i++;
                    tmp_arr.push(row);
                }
                if(json_data.lastIndexOf(row) == json_data.length-1) {
                    TABLE_DATA[tmp_arr[0].sid] = tmp_arr;
                }
            });
            console.log(TABLE_DATA);

            sayfa_count = Object.keys(TABLE_DATA).length;

            for(let i=0, len=document.getElementById("ekleRow").parentElement.children.length-1; i<len; i++){
                document.getElementById("ekleRow").parentElement.children[1].remove();
            }

            for(let elm in TABLE_DATA){
                let span = minus_icon();
                span.setAttribute("onclick", "sayfa_sil(this.parentElement)")

                elm = parseInt(elm);
                let td = document.createElement("td");
                td.innerText = TABLE_DATA[elm][0].sad;
                td.setAttribute("onclick", "sayfaGoster(this)");
                td.setAttribute("sid", TABLE_DATA[elm][0].sid);
                td.setAttribute("name", TABLE_DATA[elm][0].sad);
                td.setAttribute("ondblclick", "sayfa_ismi_degistir(this)")
                td.appendChild(span);
                document.getElementById("ekleRow").parentElement.appendChild(td);
            }
            let td = document.createElement("td");
            td.setAttribute("onclick", "yeniSayfaOlustur(this)");
            td.innerText = "SAYFA EKLE";
            document.getElementById("ekleRow").parentElement.appendChild(td);

            son_konum_yukle();
        }
    };
    xhttp.open("post", "exel.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("islem=dosya_oku&d_id="+d_id);
}

function dosya_isim_degistir(dosya){
    let yeni_isim = prompt("Lütfen yani ismi giriniz:");

    if(yeni_isim == null){
        console.log("dosya isim değiştirme iptal edildi")
        return;
    } else if(yeni_isim == ""){
        console.log("dosya isim değiştirme-> isim girilmedi")
        return;
    } else if(dosya.innerText == yeni_isim){
        console.log("dosya isim değiştirme->isim aynı")
    } else {
        let xhttp = new XMLHttpRequest();
        xhttp.open("post", "exel.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                if(this.responseText == "success")
                    console.log("dosya isimlendirme başarılı");
                else
                    console.log("dosya isimlendirme başarısız.")
            }
        };
        let did = dosya.previousElementSibling.innerText;
        console.log("islem=dosya_isim_degistir&did=" + did + "&dosya_yeni_isim=" + yeni_isim);
        xhttp.send("islem=dosya_isim_degistir&did=" + did + "&dosya_yeni_isim=" + yeni_isim);
        dosya.innerText = yeni_isim;
    }
}
//TAMAM
function sayfaGoster(obj){
    let sayfa_veri = TABLE_DATA[obj.getAttribute("sid")];
    console.log(sayfa_veri);
    SAYFA_INFO.sid = sayfa_veri[0].sid;
    SAYFA_INFO.sad = sayfa_veri[0].sad;
    let t_body_rows = document.getElementById("t_body").children;
    console.log(t_body_rows);
    max_col = getMax(sayfa_veri, "sutun");
    max_row = getMax(sayfa_veri, "satir");

    // satırları temizle
    for(let i=0, len=t_body_rows.length-1; i<len; i++){
        t_body_rows[0].remove();
    }
    // kolonları temizle
    for(let i=0, len=document.getElementById("ekleCol").parentElement.children.length-2; i<len; i++){
        document.getElementById("ekleCol").parentElement.children[1].remove(); // ilk sutunu silmemeli (çıkış)
    }


    let last_row = document.getElementById("ekleRow").parentElement;
    let last_col = document.getElementById("ekleCol").parentElement;

    for(let i=0; i<max_col; i++){
        ekleCol(document.getElementById("ekleCol"));
    }
    for(let i=0; i<max_row; i++){
        ekleRow(document.getElementById("ekleRow"));
    }

    for(let row=0, tmp_hucre=undefined; row<max_row; row++){
        for(let col=1; col<=max_col; col++){
            tmp_hucre = sayfa_veri.find(function(elm){
                return elm.satir == row+1 && elm.sutun == col;
            });
            t_body_rows[row].children[col].innerText = tmp_hucre.deger;
            t_body_rows[row].children[col].setAttribute("hid", tmp_hucre.hid);
            t_body_rows[row].children[col].setAttribute("satir", tmp_hucre.satir);
            t_body_rows[row].children[col].setAttribute("sutun", tmp_hucre.sutun);
        }
    }

    let tds = obj.parentElement.children;
    for(let i=1, len=tds.length-1; i<len; i++){
        tds[i].bgColor = "";
    }
    obj.bgColor = "DodgerBlue"
}

//TAMAM
function sayfa_ismi_degistir(sayfa){
    let yeni_isim = prompt("Lütfen yani ismi giriniz:");

    if(yeni_isim == null){
        console.log("sayfa isim değiştirme iptal edildi")
        return;
    } else if(yeni_isim == ""){
        console.log("sayfa isim değiştirme-> isim girilmedi")
        return;
    } else if(sayfa.innerText == yeni_isim){
        console.log("sayfa isim değiştirme->isim aynı")
    } else {
        let xhttp = new XMLHttpRequest();
        xhttp.open("post", "exel.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                if(this.responseText == "success"){
                    console.log("sayfa isimlendirme başarılı");
                    let span = minus_icon();
                    span.setAttribute("onclick", "sayfa_sil(this.parentElement)");
                    sayfa.innerText = yeni_isim;
                    sayfa.appendChild(span);
                }
                else
                    console.log("sayfa isimlendirme başarısız.")
            }
        };
        //console.log("islem=sayfa_ismi_degistir&sid=" + sayfa.getAttribute("sid") + "&yeni_isim=" + yeni_isim);
        xhttp.send("islem=sayfa_ismi_degistir&sid=" + sayfa.getAttribute("sid") + "&yeni_isim=" + yeni_isim);
    }
}

//TAMAM
function getMax(arr, prop) {
    let max;
    for (let i=0, len=arr.length; i<len ; i++) {
        if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max[prop];
}

// TAMAM
function cikis(){
    document.getElementById("dosyaekleform").style.display = "";
    document.getElementById("dosyatable").style.display = "";
    document.getElementById("d_table").style.display = "none";
    SAYFA_INFO = {sid: undefined, sad: undefined};
    let t_body_rows = document.getElementById("t_body").children;
    // satırları temizle
    for(let i=0, len=t_body_rows.length-1; i<len; i++){
        t_body_rows[0].remove();
    }
    // kolonları temizle
    for(let i=0, len=document.getElementById("ekleCol").parentElement.children.length-2; i<len; i++){
        document.getElementById("ekleCol").parentElement.children[1].remove(); // ilk sutunu silmemeli (çıkış)
    }
}

// TAMAM
function goster(){
    document.getElementById("dosyaekleform").style.display = "none";
    document.getElementById("dosyatable").style.display = "none";
    document.getElementById("d_table").style.display = "";
}

function sortTable(n) {
	//if(document.getElementsByTagName("span")[n].className == "fa fa-sort-up"){
	//	document.getElementsByTagName("span")[n].className = "fa fa-sort-down"
	//} else {
	//	document.getElementsByTagName("span")[n].className = "fa fa-sort-up"
	//}
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	table = document.getElementById("d_table");
	switching = true;
	dir = "asc"; 

	while (switching) {
		switching = false;
		rows = table.rows;
		for (i = 1; i < (rows.length - 2); i++) {
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

function sayfa_sil(sayfa){
    let s_id = sayfa.getAttribute("sid");
    if(confirm("Sayfayı silmek istediğinizden eminmisiniz?") == false)
        return;
    xhttp = new XMLHttpRequest();
    xhttp.open("post", "exel.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){
            if(this.responseText != "fail"){
                console.log("sayfa silme başarılı");
                sayfa.remove();
                dosyaGoruntule(TABLE_DATA[Object.keys(TABLE_DATA)[0]][0].did);
            }
        }
    }
    xhttp.send("islem=sayfa_sil&sayfa_id="+s_id);

}


function minus_icon(){
    let span = document.createElement("span")
    let icon = document.createElement("i");
    icon.setAttribute("class", "far fa-minus-square");
    icon.setAttribute("style", "color: red;")
    span.appendChild(icon);
    return span;
}

function son_konum_kaydet(elm){
    let dosya_id = TABLE_DATA[Object.keys(TABLE_DATA)[0]][0].did;
    let sayfa_id = SAYFA_INFO.sid;
    let xhr = new XMLHttpRequest();
    let hucre_id = elm.getAttribute("hid");
    let satir = elm.getAttribute("satir");
    let sutun = elm.getAttribute("sutun");

    xhr.open("post", "exel.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

        }
    };
    console.log("islem=son_konum_kaydet&dosya_id=" + dosya_id + "&sayfa_id=" + sayfa_id + "&hucre_id=" + hucre_id + "&satir=" + satir + "&sutun=" + sutun);
    xhr.send("islem=son_konum_kaydet&dosya_id=" + dosya_id + "&sayfa_id=" + sayfa_id + "&hucre_id=" + hucre_id + "&satir=" + satir + "&sutun=" + sutun);
}

function son_konum_yukle(){
    let son_sayfa = TABLE_DATA[Object.keys(TABLE_DATA)[0]][0].son_sayfa;
    let son_hucre = TABLE_DATA[Object.keys(TABLE_DATA)[0]][0].son_hucre;
    document.querySelector("[sid='" + son_sayfa +"']").click();
    document.querySelector("[hid='" + son_hucre +"']").focus();
}

dosyalariListele();
//