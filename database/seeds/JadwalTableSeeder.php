<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JadwalTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('jadwal')->insert([
        	'ruangan_id' => 1,
        	'kelas_id' => 1,
        	'waktu_id' => 1,
        	'mata_kuliah_id' => 1,
            'semester' => 1
        ]);
        DB::table('jadwal')->insert([
        	'ruangan_id' => 2,
        	'kelas_id' => 1,
        	'waktu_id' => 2,
        	'mata_kuliah_id' => 2,
            'semester' => 1
        ]);
    }
}
