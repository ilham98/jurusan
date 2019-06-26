<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RefreshToken extends Model
{
	protected $table = 'refresh_token';
    protected $fillable = ['token', 'expiration', 'revoked'];
    public $timestamps = false;
}
