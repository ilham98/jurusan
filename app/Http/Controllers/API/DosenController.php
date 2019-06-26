<?php

namespace App\Http\Controllers\API;

use App\Dosen;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DosenController extends Controller {

    public function index() {
        return Dosen::with('jabatan_fungsional')->get();
    }
    
}
