<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MataKuliah extends Model
{
	protected $table = 'mata_kuliah';
    protected $fillable = [ 'nama' ];
    public $timestamps = false;
}
