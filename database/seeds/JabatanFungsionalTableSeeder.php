<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JabatanFungsionalTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('jabatan_fungsional')->insert(['nama' => 'Jabatan Fungsional 1']);
        DB::table('jabatan_fungsional')->insert(['nama' => 'Jabatan Fungsional 2']);
        DB::table('jabatan_fungsional')->insert(['nama' => 'Jabatan Fungsional 3']);
        DB::table('jabatan_fungsional')->insert(['nama' => 'Jabatan Fungsional 4']);
    }
}
