<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call('RuanganTableSeeder');
        $this->call('ProdiTableSeeder');
        $this->call('KelasTableSeeder');
        $this->call('HariTableSeeder');
        $this->call('WaktuTableSeeder');
        $this->call('MataKuliahTableSeeder');
        $this->call('JabatanFungsionalTableSeeder');
        $this->call('DosenTableSeeder');
        $this->call('AdminTableSeeder');
        $this->call('StafTableSeeder');
        $this->call('ModulTableSeeder');
        $this->call('JadwalTableSeeder');
        $this->call('DosenJadwalTableSeeder');
        $this->call('EventTableSeeder');
        $this->call('BeritaTableSeeder');
    }
}
