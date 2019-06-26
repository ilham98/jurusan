<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KelasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('kelas')->insert([
        	'nama' => 'A',
        	'tahun_angkatan' => '2016',
        	'prodi_id' => 1
        ]);
        DB::table('kelas')->insert([
        	'nama' => 'B',
        	'tahun_angkatan' => '2016',
        	'prodi_id' => 1
        ]);
    }
}
