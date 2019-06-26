<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StafTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('staf')->insert([
        	'nidn' => '121',
        	'nama' => 'Staf 1'
        ]);
        DB::table('staf')->insert([
        	'nidn' => '122',
        	'nama' => 'Staf 2'
        ]);
        DB::table('staf')->insert([
        	'nidn' => '123',
        	'nama' => 'Staf 3'
        ]);
    }
}
