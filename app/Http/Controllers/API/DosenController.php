<?php

namespace App\Http\Controllers\API;

use App\Dosen;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DosenController extends Controller {

    public function index(Request $request) {
    	$dosen = Dosen::with('jabatan_fungsional');
    	if($request->paginate)
    		return $dosen->paginate($request->paginate);
    	return $dosen->get();
    }

    public function store(Request $request) {
	  	$request->validate([
	  		'nidn' => 'required',
	  		'nip' => 'required',
	  		'nama' => 'required',
	  		'no_telepon' => 'required',
	  		'keahlian' => 'required',
	  		'email' => 'required',
	  		'jabatan_fungsional_id' => 'required'
	  	]);
	  	$body = $request->all();
	  	$dosen = Dosen::create($body);
	  	return $dosen;
    }
    
    public function update(Request $request, $id) {
    	$request->validate([
	  		'nidn' => 'required',
	  		'nip' => 'required',
	  		'nama' => 'required',
	  		'no_telepon' => 'required',
	  		'keahlian' => 'required',
	  		'email' => 'required',
	  		'jabatan_fungsional_id' => 'required'
	  	]);
	  	$body = $request->all();
	  	$dosen = Dosen::find($id);
	  	$dosen->update($body);
	  	return $dosen;
    }

    public function destroy($id) {
    	$dosen = Dosen::find($id);
    	$dosen->delete();
    	return $dosen;
    }

}
