<?php

namespace App\Http\Controllers\API;

use App\Hari;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HariController extends Controller {

    public function index() {
        return Hari::with('waktu')->get();
    }
    
}
