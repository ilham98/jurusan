<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ModulTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('modul')->insert([
            'judul' => 'modul 1',
        	'mata_kuliah_id' => 1,
        	'nidn' => '1000',
        	'modul_url' => 'http://this.com/modul/1'
        ]);
        DB::table('modul')->insert([
            'judul' => 'modul 2',
        	'mata_kuliah_id' => 1,
        	'nidn' => '1001',
        	'modul_url' => 'http://this.com/modul/2'
        ]);
        DB::table('modul')->insert([
            'judul' => 'modul 3',
        	'mata_kuliah_id' => 1,
        	'nidn' => '1002',
        	'modul_url' => 'http://this.com/modul/3'
        ]);
    }
}
