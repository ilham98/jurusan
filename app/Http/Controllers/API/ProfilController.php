<?php

namespace App\Http\Controllers\API;

use App\Profil;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProfilController extends Controller
{
    public function index() {
    	return Profil::first();
    }

    public function update(Request $request) {
    	$request->validate([
    		'visi' => 'required',
    		'misi' => 'required'
    	]);

    	$misi = explode(',', $request->misi);

    	foreach($misi as $i => $m) {
            $misi[$i] = '<li>'.$m.'</li>';
        }

        $misi = implode($misi);
        $profil = Profil::first();
        $profil->update([
            'visi' => $request->visi,
            'misi' => $misi
        ]);
        
        return $profil;
    }
}
