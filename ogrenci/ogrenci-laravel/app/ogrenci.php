<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ogrenci extends Model
{
    protected $primaryKey = "ono";
    protected $fillable = [
        "adi", "soyadi",
    ];

    //protected $table = "ogrenci";
}
