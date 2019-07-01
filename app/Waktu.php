<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Waktu extends Model
{
	protected $table = 'waktu';
    protected $fillable = [ 'mulai', 'selesai', 'hari_id' ];
    public $timestamps = false;

    public function jadwal() {
    	return $this->hasMany('App\Jadwal', 'waktu_id', 'id');
    }

    public function hari() {
    	return $this->belongsTo('App\Hari', 'hari_id', 'id');
    }
}
