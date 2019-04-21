@extends("template/master")

@section("title", "Ogr Index")

@section('icerik')
    <a href="/ogrenci/create">Ekle</a>

    <table border = "1">
        <tr>
            <th>ono</th>
            <th>Adı</th>
            <th>Soyadı</th>
            <th>created</th>
            <th>updated</th>
            <th>Show</th>
            <th>edit</th>
            <th>delete</th>
        </tr>

        @foreach ($ogrs as $ogr)
        <tr>
            <td>{{ $ogr->ono }}</td>
            <td>{{ $ogr->adi }}</td>
            <td>{{ $ogr->soyadi }}</td>
            <td>{{ $ogr->created_at }}</td>
            <td>{{ $ogr->updated_at }}</td>
            <td><a href="/ogrenci/show/{{ $ogr->ono }}">Show</a></td>
            <td><a href="/ogrenci/edit/{{ $ogr->ono }}">Edit</a></td>
            <td><a href="/ogrenci/delete/{{ $ogr->ono }}">Delete</a></td>
        </tr>
        @endforeach
    </table>
    
    {{ $ogrs->links() }}

    <style>
        ul, li {
            display:inline;
            padding: 10px;
        }
        th, td{
            padding: 5px;
        }
    </style>
@endsection