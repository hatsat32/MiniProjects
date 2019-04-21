<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get("/ogrenci", "OgrenciController@index");
Route::get("/ogrenci/create", "OgrenciController@create");
Route::post("/ogrenci/create", "OgrenciController@store");
Route::get("/ogrenci/delete/{id}", "OgrenciController@destroy");
Route::get("/ogrenci/edit/{id}", "OgrenciController@edit");
Route::post("/ogrenci/edit/{id}", "OgrenciController@update");
Route::get("/ogrenci/show/{id}", "OgrenciController@show");
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get("ogrenci/ajax", "OgrenciAjaxController@index");
Route::post("/ogrenci/ajax/post", "OgrenciAjaxController@store");
Route::post("/ogrenci/ajax/listele", "OgrenciAjaxController@listele");
Route::post("/ogrenci/ajax/destroy", "OgrenciAjaxController@destroy");
Route::post("/ogrenci/ajax/update", "OgrenciAjaxController@update");
Route::post("/ogrenci/ajax/search", "OgrenciAjaxController@search");

Route::get("ogrenci/f7", "OgrenciController@index");