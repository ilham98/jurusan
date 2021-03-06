<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dosen extends Model
{
	protected $table = 'dosen';
	protected $primaryKey = 'nidn';
    protected $fillable = [ 'nidn', 'nip', 'kode_nama', 'nama', 'no_telepon', 'keahlian', 'email', 'password', 'profile_url', 'jabatan_fungsional_id' ];
    public $timestamps = false;
	public $incrementing = false;

    public function jabatan_fungsional() {
    	return $this->belongsTo('App\JabatanFungsional', 'jabatan_fungsional_id', 'id');
    }

    public function jadwal() {
    	return $this->belongsToMany('App\Jadwal', 'dosen_jadwal', 'nidn', 'jadwal_id');
    }
}
