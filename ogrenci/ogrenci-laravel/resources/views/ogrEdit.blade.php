<form action="" method="POST">
    @csrf
    Adi: <input type="text" name="adi" id="adi" value="{{ $ogr[0]->adi}}">
    Soyadi: <input type="text" name="soyadi" id="soyadi" value="{{ $ogr[0]->soyadi }}">
    <button type="submit">Guncelle</button>
</form>