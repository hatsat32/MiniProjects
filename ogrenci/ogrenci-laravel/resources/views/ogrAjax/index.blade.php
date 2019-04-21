<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>

        <title>Ogrenci Ajax</title>
        <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css"/>
        <link href="{{ asset('css/style.css') }}" rel="stylesheet" type="text/css"/>
        <script src="{{ asset('js/script.js') }}" defer></script>
        <meta name="_token" content="{{csrf_token()}}" />
    </head>
    <body>

        <div class="container">
            <div class="alert alert-success" style="display:none"></div>
            
            <form id="ogrForm">
                <div class="form-group row">
                    <label for="adi">Adi:</label>
                    <input type="text" class="form-control" id="adi" name="adi">
                </div>
                <div class="form-group row">
                    <label for="soyadi">Soyadi:</label>
                    <input type="text" class="form-control" id="soyadi" name="soyadi">
                </div>
                <button type="button" id="ajaxSubmit" class="btn btn-primary">Gönder</button>
                <button type="button" id="ajaxListele" class="btn btn-primary">Listele</button>
            </form>

            <form>
                    <div class="form-group row">
                        <label for="adi">Arama:</label>
                        <input type="text" class="form-control" id="arama" name="adi">
                    </div>
                    <button type="button" id="ajaxSearch" class="btn btn-primary">Ara</button>
            </form>

            <table class="table table-bordered">
                <thead>
                        <tr>
                            <th>ono</th>
                            <th>Adı</th>
                            <th>Soyadı</th>
                            <th>created</th>
                            <th>updated</th>
                            <!--<th>Show</th>-->
                            <th>edit</th>
                            <th>delete</th>
                        </tr>
                </thead>

                <tbody id="ogrContent">
                    <!--
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
                -->
                </tbody>
            </table>
        </div>

        <script src="http://code.jquery.com/jquery-3.3.1.min.js"
                integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
                crossorigin="anonymous">
        </script>
    </body>
</html>
