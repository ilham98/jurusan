<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dosen extends Model
{
	protected $table = 'dosen';
	protected $primaryKey = 'nidn';
    protected $fillable = [ 'nidn', 'nip', 'nama', 'no_telepon', 'keahlian', 'email', 'password', 'profile_url' ];
    public $timestamps = false;
	public $incrementing = false;

    public function jabatan_fungsional() {
    	return $this->belongsTo('App\JabatanFungsional', 'jabatan_fungsional_id', 'id');
    }

    public function jadwal() {
    	return $this->belongsToMany('App\Jadwal', 'dosen_jadwal', 'nidn', 'jadwal_id');
    }
}
