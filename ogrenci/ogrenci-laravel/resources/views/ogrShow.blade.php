@extends('template/master')

@section("title", "Detail")

@section('icerik')
    <a href="/ogrenci/">Geri Dön</a>
    <table border = "1">
        <tr>
            <th>ono</th>
            <th>Adı</th>
            <th>Soyadı</th>
            <th>created</th>
            <th>updated</th>
            <th>edit</th>
            <th>delet</th>
        </tr>

        @foreach ($ogrs as $ogr)
        <tr>
            <td>{{ $ogr->ono }}</td>
            <td>{{ $ogr->adi }}</td>
            <td>{{ $ogr->soyadi }}</td>
            <td>{{ $ogr->created_at }}</td>
            <td>{{ $ogr->updated_at }}</td>
            <td><a href="/ogrenci/edit/{{ $ogr->ono }}">Edit</a></td>
            <td><a href="/ogrenci/delete/{{ $ogr->ono }}">Delete</a></td>
        </tr>
        @endforeach
    </table>
@endsection