<?php

namespace App\Http\Controllers\API;

use App\MataKuliah;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class MataKuliahController extends Controller {

    public function index(Request $request) {
        $mata_kuliah = MataKuliah::all();

        return $mata_kuliah;
    }
    
}
