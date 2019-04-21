<?php

namespace App\Http\Controllers;

use App\ogrenci;
use App\OgrenciAjax;
use Illuminate\Http\Request;
use DB;
class OgrenciAjaxController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $ogrs = ogrenci::all();

        return view("ogrAjax.index", ["ogrs" => $ogrs]);
    }

    public function listele(){
        $ogrs = ogrenci::all()->toJson();

        echo $ogrs;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $student = new ogrenci();
        $student->adi = $request->input("adi");
        $student->soyadi = $request->input("soyadi");
        echo "".$student->adi."---".$student->soyadi;
        $student->save();
        return response()->json(["success" => "Başarı ile eklendi."]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\OgrenciAjax  $ogrenciAjax
     * @return \Illuminate\Http\Response
     */
    public function show(OgrenciAjax $ogrenciAjax) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\OgrenciAjax  $ogrenciAjax
     * @return \Illuminate\Http\Response
     */
    public function edit(OgrenciAjax $ogrenciAjax) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\OgrenciAjax  $ogrenciAjax
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, OgrenciAjax $ogrenciAjax) {
        $ono = $request->input("ono");
        $adi = $request->input("adi");
        $soyadi = $request->input("soyadi");

        $ogr = ogrenci::find($ono);
        $ogr->adi = $adi;
        $ogr->soyadi = $soyadi;

        $ogr->save();
        echo "success";
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\OgrenciAjax  $ogrenciAjax
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, OgrenciAjax $ogrenciAjax) {
        $ono = $request->input("ono");
        $ogr = ogrenci::find($ono);
        $ogr->delete();
    }

    public function search(Request $request){
        $keyword = $request->input("keyword");
        //$results = ogrenci::where('adi', 'like', "%{$keyword}%")->get()->toJson();
        DB::enableQueryLog();
        //$results = ogrenci::where([
        //    ["ono", "LIKE", "%{$keyword}%"],
        //    ["adi", "LIKE", "%{$keyword}%"],
        //    ["soyadi", "LIKE", "%{$keyword}%"]
        //])->get();
        //print_r(DB::getQueryLog());
        //echo "\n\n---------------------\n\n";
        $results = ogrenci::where("ono", "LIKE", "%{$keyword}%")
                ->orWhere("adi", "LIKE", "%{$keyword}%")
                ->orWhere("soyadi", "LIKE", "%{$keyword}%")->get();
        //print_r(DB::getQueryLog());
        echo $results;
    }
}
