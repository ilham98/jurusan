<?php

namespace App\Http\Controllers\API;

use App\Kelas;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class KelasController extends Controller {

    public function index(Request $request) {
        $kelas = Kelas::with('prodi')->get();

        return $kelas;
    }
 
}
