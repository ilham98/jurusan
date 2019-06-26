<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class JabatanFungsional extends Model
{
	protected $table = 'jabatan_fungsional';
    protected $fillable = [ 'nama' ];
    public $timestamps = false;
}
