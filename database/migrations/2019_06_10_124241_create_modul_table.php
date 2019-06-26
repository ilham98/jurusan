<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateModulTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('modul', function (Blueprint $table) {
            $table->increments('id');
            $table->string('judul');
            $table->string('modul_url');

            $table->integer('mata_kuliah_id')->unsigned();
            $table->string('nidn');

            $table->foreign('mata_kuliah_id')->references('id')->on('mata_kuliah');
            $table->foreign('nidn')->references('nidn')->on('dosen');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('modul');
    }
}
