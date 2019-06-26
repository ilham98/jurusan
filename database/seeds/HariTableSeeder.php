<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HariTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('hari')->insert([ 'id' => 1, 'nama' => 'Senin' ]);
        DB::table('hari')->insert([ 'id' => 2, 'nama' => 'Selasa' ]);
        DB::table('hari')->insert([ 'id' => 3, 'nama' => 'Rabu' ]);
        DB::table('hari')->insert([ 'id' => 4, 'nama' => 'Kamis' ]);
        DB::table('hari')->insert([ 'id' => 5, 'nama' => "Jum'at" ]);
        DB::table('hari')->insert([ 'id' => 6, 'nama' => 'Sabtu' ]);
        DB::table('hari')->insert([ 'id' => 7, 'nama' => 'Minggu' ]);
    }
}
