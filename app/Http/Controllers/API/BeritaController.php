<?php

namespace App\Http\Controllers\API;

use App\Berita;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Cookie;

class BeritaController extends Controller {

    public function index(Request $request) {
        $berita = new Berita;

        // if($request->limit > 0)
            // $berita = $berita->take($request->limit);

        $berita =  $berita->orderBy('created_at', 'desc')->paginate($request->paginate);
        return response($berita);
    }

    public function store(Request $request) {

    	$this->validate($request, [
    		'judul' => 'required',
    		'isi' => 'required'
    	]);

    	$body = $request->all();
    	return Berita::create($body);
    }

    public function destroy($id) {
        $berita = Berita::find($id);
        $berita->delete();
        return $berita;
    }
    
}
