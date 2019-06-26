<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDosenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dosen', function (Blueprint $table) {
            $table->string('nidn');
            $table->string('nip')->unique();
            $table->string('nama');
            $table->string('no_telepon');
            $table->string('keahlian');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('profile_url')->nullable();

            $table->primary('nidn');

            $table->integer('jabatan_fungsional_id')->unsigned();
            $table->foreign('jabatan_fungsional_id')
                ->references('id')
                ->on('jabatan_fungsional');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dosen');
    }
}
