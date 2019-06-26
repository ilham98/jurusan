<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model
{
	protected $table = 'jadwal';
    protected $fillable = [ 'ruangan_id', 'kelas_id', 'waktu_id', 'mata_kuliah_id', 'tahun', 'semester' ];
    public $timestamps = false;

    public function kelas() {
    	return $this->belongsTo('App\Kelas', 'kelas_id', 'id');
    }

    public function mata_kuliah() {
    	return $this->belongsTo('App\MataKuliah', 'mata_kuliah_id', 'id');
    }

    public function waktu() {
    	return $this->belongsTo('App\Waktu', 'waktu_id', 'id');
    }

    public function dosen() {
        return $this->belongsToMany('App\Dosen', 'dosen_jadwal', 'jadwal_id', 'nidn');
    }
}
