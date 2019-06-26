<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
	protected $table = 'kelas';
    protected $fillable = [ 'nama', 'tahun_angkatan', 'prodi_id' ];
    public $timestamps = false;

    public function prodi() {
    	return $this->belongsTo('App\Prodi', 'prodi_id', 'id');
    }
}
