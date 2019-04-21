<?php

namespace App\Http\Controllers;

use App\ogrenci;
use Illuminate\Http\Request;

class OgrenciController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ogrs = ogrenci::paginate(3);

        return view("ogrIndex", ["ogrs" => $ogrs]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('ogrCreate');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $ono = $request->input("ono");
        $adi = $request->input("adi");
        $soyadi = $request->input("soyadi");

        echo "".$adi.$soyadi.$ono;

        $ogr = new ogrenci;
        $ogr->adi = $adi;
        $ogr->soyadi = $soyadi;
        $ogr->save();
        return redirect("/ogrenci/");

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ogrenci  $ogrenci
     * @return \Illuminate\Http\Response
     */                 //ogrenci $ogrenci
    public function show($id)
    {
        $ogrs = ogrenci::where("ono", $id)->get();
        return view("ogrShow", ["ogrs" => $ogrs]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ogrenci  $ogrenci
     * @return \Illuminate\Http\Response
     */                 //ogrenci $ogrenci
    public function edit($id)
    {
        $ogr = ogrenci::where("ono", $id)->get();
        return view("ogrEdit", ["ogr" => $ogr]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ogrenci  $ogrenci
     * @return \Illuminate\Http\Response
     */                     //Request $request, ogrenci $ogrenci
    public function update(Request $request, $id)
    {
        //$ono = $request->input("ono");
        $adi = $request->input("adi");
        $soyadi = $request->input("soyadi");

        $ogr = ogrenci::find($id);
        $ogr->adi = $adi;
        $ogr->soyadi = $soyadi;

        $ogr->save();
        return redirect("/ogrenci/");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ogrenci  $ogrenci
     * @return \Illuminate\Http\Response
     */                     //ogrenci $ogrenci
    public function destroy($id)
    {

        $ogr = ogrenci::find($id);
        $ogr->delete();
        return redirect("/ogrenci/");
    }
}
