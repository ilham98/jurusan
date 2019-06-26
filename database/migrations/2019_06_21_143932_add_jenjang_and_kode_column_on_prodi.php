<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddJenjangAndKodeColumnOnProdi extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('prodi', function (Blueprint $table) {
            $table->char('jenjang', 2);
            $table->string('kode', 5);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('prodi', function (Blueprint $table) {
            $table->dropColumn('jenjang');
            $table->dropColumn('kode');
        });
    }
}
