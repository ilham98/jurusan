<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Hari extends Model
{
	protected $table = 'hari';
    protected $fillable = [ 'nama' ];
    public $timestamps = false;

    public function waktu() {
    	return $this->hasMany('App\Waktu', 'hari_id', 'id');
    }
}
