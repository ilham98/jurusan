<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJadwalTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jadwal', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('ruangan_id')->unsigned();
            $table->integer('kelas_id')->unsigned();
            $table->integer('waktu_id')->unsigned();
            $table->integer('mata_kuliah_id')->unsigned();
            $table->tinyInteger('semester');

            $table->foreign('ruangan_id')
                ->references('id')
                    ->on('ruangan');
            $table->foreign('kelas_id')
                ->references('id')
                    ->on('kelas');
            $table->foreign('waktu_id')
                ->references('id')
                    ->on('waktu');
            $table->foreign('mata_kuliah_id')
                ->references('id')
                    ->on('mata_kuliah');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jadwal');
    }
}
