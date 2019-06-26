<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProdiTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('prodi')->insert([ 
        	'kode' => 'TI', 
        	'nama' => 'Teknik Informatika',
            'jenjang' => 'D3'
        ]);
        DB::table('prodi')->insert([ 
        	'kode' => 'TK', 
        	'nama' => 'Teknik Komputer',
            'jenjang' => 'D3'
        ]);
        DB::table('prodi')->insert([ 
        	'kode' => 'TIM', 
        	'nama' => 'Teknik Informatika Multimedia',
            'jenjang' => 'D4'
        ]);
    }
}
