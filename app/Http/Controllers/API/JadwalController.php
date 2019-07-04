<?php

namespace App\Http\Controllers\API;

use App\Jadwal;
use App\Kelas;
use App\Hari;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Exports\JadwalExport;
use Maatwebsite\Excel\Facades\Excel;


class JadwalController extends Controller {

    public function index(Request $request) {
    	$this->validate($request, [
    		'tahun' => 'required'
    	]);

 		$jadwal = Jadwal::select(
                        'jadwal.id', 
                        'hari.id as hari_id', 
                        'waktu.mulai as mulai',
                        'kelas_id',
                        'mata_kuliah_id',
                        'waktu_id',
                        'semester',
                        'ruangan_id'
                    )->with('kelas.prodi', 'mata_kuliah', 'dosen', 'waktu.hari', 'ruangan')
                    ->join('waktu', 'jadwal.waktu_id', '=', 'waktu.id')
                    ->join('hari', 'waktu.hari_id', '=', 'hari.id')
                    ->orderBy('hari_id')
                    ->orderBy('mulai')
                    ->get();

        $jadwal = $jadwal->groupBy([
        	function($j) {
	        	if($j->semester == 1 || $j->semester == 2)
		        	return $j->kelas->tahun_angkatan;
		        elseif($j->semester == 3 || $j->semester == 4)
		        	return $j->kelas->tahun_angkatan+1;
                elseif($j->semester == 5 || $j->semester == 6)
    	        	return $j->kelas->tahun_angkatan+2;
                else
                    return $j->kelas->tahun_angkatan+3;
	        },
		    function($j) {
		    	if($j->semester % 2 !== 0)
		        	return 1;
		        return 2;
		    },
            function($j) {
                return $j->kelas->prodi->kode;
            },
		    function($j) {
		    	return $j->kelas->prodi->kode.$j->semester.$j->kelas->nama;
		    },
		    function($j) {
		    	return $j->waktu->hari->nama;
		    },
		    function($j) {
		    	$time_start = \Carbon\Carbon::parse($j->waktu->mulai);
		    	$time_end = \Carbon\Carbon::parse($j->waktu->selesai);
		    	$start = $time_start->format('H:i');
		    	$end = $time_end->format('H:i');
		    	return $start.'-'.$end;
		    },
	    ]);

        foreach($jadwal as $k => $j) {
        	foreach($j as $_k => $_j) {
        		foreach($j[$_k] as $__k => $__j) {
	        		foreach($j[$_k][$__k] as $___k => $___j) {
	        			foreach($j[$_k][$__k][$___k] as $____k => $____j) {
                            foreach($j[$_k][$__k][$___k][$____k] as $_____k => $_____j) {
	        				$j[$_k][$__k][$___k][$____k][$_____k] = $j[$_k][$__k][$___k][$____k][$_____k][0];
                            }
	        			}
	        		}
        		}
        	}
        }

        $jadwal = $jadwal->has($request->tahun) ? $jadwal[$request->tahun] : collect([]);

        return $jadwal;
    }

    public function store(Request $request) {
    	$request->validate([
    		'ruangan_id' => 'required',
    		'kelas_id' => 'required',
    		'waktu_id' => 'required',
    		'mata_kuliah_id' => 'required',
    		'semester' => 'required',
            'dosenIds' => 'required'
    	]);

    	$jadwal = Jadwal::where([ 
    		'kelas_id' => $request->kelas_id,
    		'waktu_id' => $request->waktu_id,
            'semester' => $request->semester
    	])->first();

    	if($jadwal)
    		return response(['messages' => 'Jadwal pada hari dan waktu yang sama telah diisi'], 500);

        // $jadwal = Jadwal::where([ 
        //     'waktu_id' => $request->waktu_id,
        //     'ruangan_id' => $request->ruangan_id,
        //     'semester' => $request->semester
        // ])->first();

        // if($jadwal)
        //     return response(['messages' => 'Jadwal pada waktu dan ruangan yang sama telah diisi'], 500);

    	$body = $request->all();
    	$jadwal =  Jadwal::create($body);

        $jadwal->dosen()->attach($request->dosenIds);
        
    	return $jadwal;
    }
    
    public function destroy($id) {
        $jadwal = Jadwal::find($id);
        $jadwal->delete();

        return $jadwal;
    }

    public function export() 
    {
        return Excel::download(new JadwalExport, 'users.xlsx');
    }
}
