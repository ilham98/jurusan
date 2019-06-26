<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDosenJadwalTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dosen_jadwal', function (Blueprint $table) {
            $table->string('nidn');
            $table->integer('jadwal_id')->unsigned();
            
            $table->foreign('nidn')
                ->references('nidn')
                    ->on('dosen')
                    ->onDelete('cascade');
            $table->foreign('jadwal_id')
                ->references('id')
                    ->on('jadwal')
                    ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dosen_jadwal');
    }
}
