<?php

namespace App\Http\Controllers\API;

use App\Ruangan;
use App\Http\Controllers\Controller;

class RuanganController extends Controller {

    public function index() {
        return Ruangan::all();
    }
    
}
