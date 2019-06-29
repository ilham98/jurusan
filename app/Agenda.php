<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Agenda extends Model
{
    protected $table = 'agenda';
    protected $fillable = ['nama', 'deskripsi', 'tanggal'];
    public $timestamps = false;
}
