<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WaktuTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('waktu')->insert([ 
        	'mulai' => '09:00', 
        	'selesai' => '10:00', 
        	'hari_id' => 1 
        ]);
        DB::table('waktu')->insert([ 
        	'mulai' => '09:00', 
        	'selesai' => '10:00', 
        	'hari_id' => 2
        ]);
        DB::table('waktu')->insert([ 
        	'mulai' => '09:00', 
        	'selesai' => '10:00', 
        	'hari_id' => 3 
        ]);
        DB::table('waktu')->insert([ 
        	'mulai' => '09:00', 
        	'selesai' => '10:00', 
        	'hari_id' => 4 
        ]);
        DB::table('waktu')->insert([ 
        	'mulai' => '09:00', 
        	'selesai' => '10:00', 
        	'hari_id' => 5 
        ]);
        DB::table('waktu')->insert([ 
        	'mulai' => '09:00', 
        	'selesai' => '10:00', 
        	'hari_id' => 6 
        ]);
    }
}
