function create_row(ono, adi, soyadi, created_at, updated_at){
    let tr = jQuery("<tr></tr>");
    let gbtn = jQuery("<button></button>").attr({
        type: "button",
        onclick: "guncelle(this)",
        class: "btn btn-primary",
    }).text("Güncelle");
    let sbtn = jQuery("<button></button>").attr({
        class: "btn btn-danger",
        onclick: "sil("+ono+")",
    }).text("Sil");
    jQuery("<td></td>").attr({name: "ono"}).text(ono).appendTo(tr);
    jQuery("<td></td>").attr({name: "adi"}).text(adi).appendTo(tr);
    jQuery("<td></td>").attr({name: "soyadi"}).text(soyadi).appendTo(tr);
    jQuery("<td></td>").text(created_at).appendTo(tr);
    jQuery("<td></td>").text(updated_at).appendTo(tr);
    jQuery("<td></td>").append(gbtn).appendTo(tr);
    jQuery("<td></td>").append(sbtn).appendTo(tr);
    return tr;
}

// LİSTELEME
jQuery(document).ready(function(){
    jQuery("#ajaxListele").click(function(e){
        //e.preventDefault();

        jQuery.ajax({
            url: "/ogrenci/ajax/listele",
            method: "post",
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            },
            success: function(data){
                jQuery("#ogrContent").empty();
                data = $.parseJSON(data);
                $.each(data, function(index, e){
                    jQuery("#ogrContent").append(create_row(e.ono, e.adi, e.soyadi, e.created_at, e.updated_at));
                });
            }
        });
    });
});

// KAYIT EKLEME İŞLEMİ
jQuery(document).ready(function(){
    jQuery('#ajaxSubmit').click(function(e){
        e.preventDefault();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        });
        jQuery.ajax({
            url: "/ogrenci/ajax/post",
            method: 'post',
            data: {
                adi: jQuery('#adi').val(),
                soyadi: jQuery('#soyadi').val()
            },
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            },
            success: function(result){
                console.log(result);
            }});
    });
});

// SİLME
function sil(ono_) {
    jQuery(document).ready(function(){
        jQuery.ajax({
            url: "/ogrenci/ajax/destroy",
            method: "post",
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            },
            data: {
                ono: ono_
            },
            success: function(data){
                console.log("başarılı");
                console.log(data);
            },
            error: function(){

            }
        })
    });
}

// GÜNCELLEME
function guncelle(btn){
    var tr = btn.parentElement.parentElement;
    if(jQuery(btn).text() === "Güncelle"){
        jQuery(tr).find("td[name='adi']").attr({contenteditable: 'true'});
        jQuery(tr).find("td[name='soyadi']").attr({contenteditable: 'true'});
        jQuery(btn).text("Kaydet");
    } else {
        var ono = jQuery(tr).find("td[name='ono']").text();
        var adi = jQuery(tr).find("td[name='adi']").attr({contenteditable: 'true'}).text();
        var soyadi = jQuery(tr).find("td[name='soyadi']").attr({contenteditable: 'true'}).text();

        jQuery.ajax({
            url: "/ogrenci/ajax/update",
            method: "post",
            data: {
                ono: ono,
                adi: adi,
                soyadi: soyadi
            },
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            },
            success: function(){
                jQuery(tr).find("td[name='adi']").attr({contenteditable: 'false'});
                jQuery(tr).find("td[name='soyadi']").attr({contenteditable: 'false'});
                jQuery(btn).text("Güncelle");
                console.log("Güncelleme başarılı");
            },
            error: function(){
                console.log("Güncelleme hata");
            }
        })
    }
}

// ARAMA
function arama(){}

jQuery(document).ready(function(){
    jQuery("#ajaxSearch").click(function(){
        jQuery.ajax({
            url: "/ogrenci/ajax/search",
            method: "post",
            data: {
                keyword: jQuery("#arama").val()
            },
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            },
            success: function(data){
                jQuery("#ogrContent").empty();
                data = $.parseJSON(data);
                $.each(data, function(index, e){
                    jQuery("#ogrContent").append(create_row(e.ono, e.adi, e.soyadi, e.created_at, e.updated_at));
                });
            }
        })
    });
});
    

function siralama(){

}
