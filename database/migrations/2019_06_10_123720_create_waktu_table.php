<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWaktuTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('waktu', function (Blueprint $table) {
            $table->increments('id');
            $table->time('mulai');
            $table->time('selesai');

            $table->integer('hari_id')->unsigned();
            $table->foreign('hari_id')
                ->references('id')
                ->on('hari');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('waktu');
    }
}
