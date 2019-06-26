<?php

namespace App\Http\Controllers\API;

use App\Modul;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;

class ModulController extends Controller
{
    public function index(Request $request) {
        $paginate = $request->paginate ? $request->paginate : 20;
        $modul = Modul::with('dosen', 'mata_kuliah');
        if($request->filter) {
            $filter = json_decode($request->filter, true);
            if(array_key_exists('mata_kuliah_id', $filter) && $filter['mata_kuliah_id'] !== '') {
                $modul = $modul->where('mata_kuliah_id', $filter['mata_kuliah_id']);
            }
            if(array_key_exists('judul', $filter) && $filter['judul'] !== '') {
                $modul = $modul->where('judul', 'like' , '%'.$filter['judul'].'%');
            }
        }
    	return $modul->paginate($paginate);
    }

    public function store(Request $request) {
    	$request->validate([
    		'judul' => 'required',
    		'modul_file' => 'required',
    		'mata_kuliah_id' => 'required'
    	]);

        $file = $this->fileHandler($request->file('modul_file'));

        $body_extra = [ 
            'nidn' => $request->user->nidn, 
            'modul_url' => $file['path']
        ];

        $body = $request->all();
        $body = array_merge($body_extra, $body);
        $modul = Modul::create($body);

        return $modul;
    }

    public function destroy($id)
    {
        $modul = Modul::find($id);
        $url = $modul->modul_url;
        $path = substr($url, 9);
        Storage::disk('public_uploads')->delete($path);
        $modul->delete();

        return $modul;
    }

    public function fileHandler($file) {
        $originalName = $file->getClientOriginalName();
        $arrayOfName = explode('.', $originalName);
        $name = uniqid().'.'.$arrayOfName[count($arrayOfName)-1];
        $path = '/uploads/modul/'.$name;
        Storage::disk('public_uploads')->putFileAs('modul', $file, $name);
        return [ 'path' => $path,  'name' => $name];
    }
}
