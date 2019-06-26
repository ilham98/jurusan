<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RuanganTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('ruangan')->insert([ 'nama' => 'Ruangan 1' ]);
        DB::table('ruangan')->insert([ 'nama' => 'Ruangan 2' ]);
        DB::table('ruangan')->insert([ 'nama' => 'Ruangan 3' ]);
        DB::table('ruangan')->insert([ 'nama' => 'Ruangan 4' ]);
    }
}
