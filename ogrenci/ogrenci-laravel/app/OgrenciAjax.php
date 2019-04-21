<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OgrenciAjax extends Model
{
    protected $primaryKey = "ono";
    protected $fillable = [
        "adi", "soyadi",
    ];
    protected $table = "ogrencis";
}
