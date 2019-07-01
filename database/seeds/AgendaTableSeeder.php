<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AgendaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	for($x = 0; $x < 50; $x++) {
    		DB::table('agenda')->insert([
    			'nama' => 'agenda '.$x,
    			'tanggal' => '2019-06-29',
    			'deskripsi' => 'mantap'
	        ]);
    	}
    }
}
