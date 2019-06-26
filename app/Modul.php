<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Modul extends Model
{
    protected $table = 'modul';
    protected $fillable = ['judul', 'modul_url', 'mata_kuliah_id', 'nidn'];
    public $timestamps = false;

    public function dosen() {
    	return $this->belongsTo('App\Dosen', 'nidn', 'nidn');
    }

    public function mata_kuliah() {
    	return $this->belongsTo('App\MataKuliah', 'mata_kuliah_id', 'id');
    }
}
