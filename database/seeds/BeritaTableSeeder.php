<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BeritaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('berita')->insert([
        	'judul' => 'Berita 1',
        	'isi' => 'isi berita 1'
        ]);
        DB::table('berita')->insert([
        	'judul' => 'Berita 2',
        	'isi' => 'isi berita 2'
        ]);
        DB::table('berita')->insert([
        	'judul' => 'Berita 3',
        	'isi' => 'isi berita 3'
        ]);
        DB::table('berita')->insert([
        	'judul' => 'Berita 4',
        	'isi' => 'isi berita 4'
        ]);
        DB::table('berita')->insert([
        	'judul' => 'Berita 5',
        	'isi' => 'isi berita 5'
        ]);
        DB::table('berita')->insert([
        	'judul' => 'Berita 6',
        	'isi' => 'isi berita 6'
        ]);
        DB::table('berita')->insert([
        	'judul' => 'Berita 7',
        	'isi' => 'isi berita 7'
        ]);
    }
}
