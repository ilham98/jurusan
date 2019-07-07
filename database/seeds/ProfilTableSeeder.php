<?php

use Illuminate\Database\Seeder;

class ProfilTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('profil')->insert([
        	'id' => 1,
        	'visi' => 'Mantap Atuh Gan',
        	'misi' => '<li>mantap</li><li>mantap</li>'
        ]);
    }
}
