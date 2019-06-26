<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DosenJadwalTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('dosen_jadwal')->insert([
        	'nidn' => '1000',
        	'jadwal_id' => 1,
      	]);
      	DB::table('dosen_jadwal')->insert([
        	'nidn' => '1001',
        	'jadwal_id' => 1,
      	]);
    }
}
