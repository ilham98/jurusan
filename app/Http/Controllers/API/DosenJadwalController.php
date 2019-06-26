<?php

namespace App\Http\Controllers\API;

use App\Dosen;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DosenJadwalController extends Controller
{
    public function index($nidn, Request $request) {
    	$request->validate([
    		'tahun' => 'required'
    	]);

    	$jadwal = Dosen::with('jadwal.waktu.hari', 'jadwal.kelas.prodi')->where('nidn', $nidn)->first()->jadwal;

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
	        'waktu.hari.nama',
	        function($j) {
	        	$time_start = \Carbon\Carbon::parse($j->waktu->mulai);
		    	$time_end = \Carbon\Carbon::parse($j->waktu->selesai);
		    	$start = $time_start->format('H:i');
		    	$end = $time_end->format('H:i');
		    	return $start.'-'.$end;
	        }
   		]);

   		foreach($jadwal as $k => $j) {
   			foreach($jadwal[$k] as $_k => $_j) {
   				foreach($jadwal[$k][$_k] as $__k => $__j) {
   					foreach($jadwal[$k][$_k][$__k] as $___k => $___j) {
   						$jadwal[$k][$_k][$__k][$___k] = $jadwal[$k][$_k][$__k][$___k][0];
   						$jad = $jadwal[$k][$_k][$__k][$___k];
   						$kelas = $jad['kelas'];
   						$kode_kelas = $kelas['prodi']['kode'].$jad['semester'].$kelas['nama'];
   						$jadwal[$k][$_k][$__k][$___k]['kode_kelas'] = $kode_kelas;
   					}
   				}
   			}
   		}

   		$jadwal = $jadwal->has($request->tahun) ? $jadwal[$request->tahun] : collect([]);

    	return $jadwal;
    }
}
