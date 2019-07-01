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

    public function store(Request $request) {
    	$request->validate([
    		'nama' => 'required'
    	]);

    	$body = $request->all();
    	$mata_kuliah = MataKuliah::create($body);

    	return $mata_kuliah;
    }

    public function update(Request $request, $id) {
    	$request->validate([
    		'nama' => 'required'
    	]);
    	$body = $request->all();
    	$mata_kuliah = MataKuliah::find($id);
    	$mata_kuliah->update($body);
    	return $mata_kuliah;
    }

    public function destroy($id) {
    	$mata_kuliah = MataKuliah::find($id);
    	$mata_kuliah->delete();
    	return $mata_kuliah;
    }
    
}
