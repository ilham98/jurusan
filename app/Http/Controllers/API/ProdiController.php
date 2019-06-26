<?php

namespace App\Http\Controllers\API;

use App\Prodi;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProdiController extends Controller {

    public function index() {
        return Prodi::all();
    }
    
}
