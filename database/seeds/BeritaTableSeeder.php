<?php

use Illuminate\Database\Seeder;
use App\Berita;

class BeritaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Berita::create([
        	'judul' => 'Berita 1',
        	'isi' => 'isi berita 1'
        ]);
        Berita::create([
        	'judul' => 'Berita 2',
        	'isi' => 'isi berita 2'
        ]);
        Berita::create([
        	'judul' => 'Berita 3',
        	'isi' => 'isi berita 3'
        ]);
        Berita::create([
        	'judul' => 'Berita 4',
        	'isi' => 'isi berita 4'
        ]);
        Berita::create([
        	'judul' => 'Berita 5',
        	'isi' => 'isi berita 5'
        ]);
        Berita::create([
        	'judul' => 'Berita 6',
        	'isi' => 'isi berita 6'
        ]);
        Berita::create([
        	'judul' => 'Berita 7',
        	'isi' => 'isi berita 7'
        ]);
    }
}
