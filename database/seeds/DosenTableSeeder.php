<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DosenTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('dosen')->insert([
        	'nidn' => '1000',
        	'nip' => '1000',
            'kode_nama' => 'PD1',
        	'nama' => 'Pak Dosen 1',
        	'no_telepon' => '082254773858',
        	'keahlian' => 'Keahlian 1',
        	'email' => 'dosen1@gmail.com',
            'jabatan_fungsional_id' => 1,
        	'password' => Hash::make('dosen1')
        ]);
        DB::table('dosen')->insert([
        	'nidn' => '1001',
        	'nip' => '1001',
            'kode_nama' => 'PD2',
        	'nama' => 'Pak Dosen 2',
        	'no_telepon' => '082254773858',
        	'keahlian' => 'Keahlian 2',
        	'email' => 'dosen2@gmail.com',
            'jabatan_fungsional_id' => 2,
        	'password' => Hash::make('dosen2')
        ]);
        DB::table('dosen')->insert([
        	'nidn' => '1002',
        	'nip' => '1003',
            'kode_nama' => 'PD3',
        	'nama' => 'Pak Dosen 3',
        	'no_telepon' => '082254773858',
        	'keahlian' => 'Keahlian 3',
        	'email' => 'dosen3@gmail.com',
            'jabatan_fungsional_id' => 3,
        	'password' => Hash::make('dosen3')
        ]);
    }
}
