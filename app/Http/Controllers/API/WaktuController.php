<?php

namespace App\Http\Controllers\API;

use App\Waktu;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class WaktuController extends Controller
{
    public function index() {
    	return Waktu::with('hari')->orderBy('hari_id', 'asc')->orderBy('mulai', 'asc')->get();
    }

    public function store(Request $request) {
    	$request->validate([
    		'mulai' => 'required',
    		'selesai' => 'required',
    		'hari_id' => 'required'
    	]);

    	$body = $request->all();

    	return Waktu::create($body);
    }

    public function update(Request $request, $id) {
    	$request->validate([
    		'mulai' => 'required',
    		'selesai' => 'required',
    		'hari_id' => 'required'
    	]);

    	$body = $request->all();
    	$waktu =  Waktu::find($id);
    	$waktu->update($body);

    	return $waktu;
    }

    public function destroy($id) {
    	$waktu =  Waktu::find($id);
    	$waktu->delete();
    	return $waktu;
    }
}
