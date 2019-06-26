<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
	protected $table = 'admin';
	protected $primaryKey = 'nidn';
    protected $fillable = ['password'];
    public $timestamps = false;
	public $incrementing = false;
}
