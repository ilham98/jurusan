<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MataKuliahTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('mata_kuliah')->insert(['nama' => 'Bahasa Indonesia']);
        DB::table('mata_kuliah')->insert(['nama' => 'Matematika']);
        DB::table('mata_kuliah')->insert(['nama' => 'Bahasa Inggris']);
        DB::table('mata_kuliah')->insert(['nama' => 'Pemrograman Dasar']);
    }
}
