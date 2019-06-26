<?php

namespace App\Http\Controllers\API;

use App\Modul;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DosenModulController extends Controller
{
    public function index($nidn) {
    	return Modul::where('nidn', $nidn)->get();
    }
}
