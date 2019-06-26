<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('event')->insert([
        	'judul' => 'event 1',
        	'isi' => 'event 1 adalah bla bla bla',
        	'tanggal' => '2019-06-10'
        ]);
        DB::table('event')->insert([
        	'judul' => 'event 1',
        	'isi' => 'event 1 adalah bla bla bla',
        	'tanggal' => '2019-06-10'
        ]);
        DB::table('event')->insert([
        	'judul' => 'event 1',
        	'isi' => 'event 1 adalah bla bla bla',
        	'tanggal' => '2019-06-10'
        ]);
    }
}
