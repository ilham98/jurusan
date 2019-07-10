<?php

namespace App\Http\Controllers\API;

use App\Modul;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DosenModulController extends Controller
{
    public function index(Request $request, $nidn) {
		$paginate = $request->paginate ? $request->paginate : 20;
    	return Modul::where('nidn', $nidn)->paginate($paginate);
    }
}
