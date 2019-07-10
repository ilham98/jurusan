<?php

namespace App\Http\Controllers\Export;

use App\Dosen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use \PhpOffice\PhpWord\Settings;

class SKPengajaran extends Controller
{

	public function __construct() {
		$this->phpWord = new \PhpOffice\PhpWord\PhpWord();
		$this->section = $this->phpWord->addSection();
		$this->section2 = $this->phpWord->addSection(array('orientation' => 'landscape'));
	}

	public function generateRomawi($num) {
		switch($num) {
			case 1:
				return 'I';
			case 2:
				return 'II';
			case 3: 
				return 'III';
			case 4:
				return 'IV';
			case 5:
				return 'V';
			case 6: 
				return 'VI';
			default:
				return 'Wrong Number';
		}
	}

	public function honorTable() {
		$this->section->addText('Basic table', ['size' => 16, 'bold' => true]);
		
		$styleTable = array('borderSize' => 6, 'borderColor' => '999999');
		$cellRowSpan = array('vMerge' => 'restart', 'valign' => 'center');
		$cellRowContinue = array('vMerge' => 'continue');
		$cellColSpan = array('gridSpan' => 2, 'valign' => 'center');
		$cellHCentered = array('align' => 'center', 'spaceBefore' => 1, 'spaceAfter' => 1);
		$cellVCentered = array('valign' => 'center');

		$this->phpWord->addTableStyle('Colspan Rowspan', $styleTable);
		$table = $this->section->addTable('Colspan Rowspan');
		$table->addRow();
		$table->addCell(2000, array('vMerge' => 'restart', 'valign' => 'center', 'gridSpan' => 2, 'valign' => 'center'))->addText('PANGKAT', null, $cellHCentered);
		$table->addCell(4000, $cellColSpan)->addText('KELAS', null, $cellHCentered);
		$table->addRow();
		$table->addCell(null, array('vMerge' => 'continue', 'gridSpan' => 2, 'valign' => 'center'));
		$table->addCell(2000, $cellVCentered)->addText('REGULER', null, $cellHCentered);
		$table->addCell(2000, $cellVCentered)->addText('NON REGULER', null, $cellHCentered);
		$table->addRow();
		$table->addCell(2000, $cellRowSpan)->addText('TEORI', null, $cellHCentered);
		$table->addCell(2000, $cellRowSpan)->addText('LEKTOR KEPALA', null, $cellHCentered);
		$table->addCell(2000, $cellVCentered)->addText('RP. 35.000, 00', null, $cellHCentered);
		$table->addCell(2000, $cellVCentered)->addText('RP. 80.000, 00', null, $cellHCentered);
		$table->addRow();
		$table->addCell(null, $cellRowContinue);
		$table->addCell(2000, $cellRowSpan)->addText('LEKTOR', null, $cellHCentered);
		$table->addCell(2000, $cellVCentered)->addText('RP. 30.000, 00', null, $cellHCentered);
		$table->addCell(2000, $cellVCentered)->addText('RP. 70.000, 00', null, $cellHCentered);
		$table->addRow();
		$table->addCell(null, $cellRowContinue);
		$table->addCell(2000, $cellRowSpan)->addText('ASISTEN AHLI', null, $cellHCentered);	
		$table->addCell(2000, $cellVCentered)->addText('RP. 25.000, 00', null, $cellHCentered);
		$table->addCell(2000, $cellVCentered)->addText('RP. 50.000, 00', null, $cellHCentered);
		$table->addRow();
		$table->addCell(2000, $cellColSpan)->addText('PRAKTIKUM', null, $cellHCentered);
		$table->addCell(2000, $cellVCentered)->addText('RP. 15.000, 00', null, $cellHCentered);
		$table->addCell(2000, $cellVCentered)->addText('RP. 30.000, 00', null, $cellHCentered);
	}

	public function getDosen() {
		$dosen = Dosen::with('jabatan_fungsional')->has('jadwal')->get();
		foreach($dosen as $d) {
			$d->mata_kuliah = collect([]);
			$mata_kuliah = Dosen::find($d->nidn)
				->select('mk.id', 'j.semester', 'mk.nama', DB::raw('GROUP_CONCAT(k.nama) as kelas'), DB::raw('count(mk.id) as sks') )
				->join('dosen_jadwal as dj', 'dosen.nidn', 'dj.nidn')
				->join('jadwal as j', 'j.id', 'dj.jadwal_id')
				->join('mata_kuliah as mk', 'mk.id', 'j.mata_kuliah_id')
				->join('kelas as k', 'k.id', 'j.kelas_id')
				->groupBy('mk.id')
				->get();
			$d->mata_kuliah = $mata_kuliah->map(function($mk) {
				return collect([
					'id' => $mk->id,
					'nama' => $mk->nama,
					'semester' => $this->generateRomawi($mk->semester),
					'kelas' => $mk->kelas,
					'sks' => $mk->sks
				]);
			});
		}

		return $dosen;
	}

	public function dosenTable() {
		$dosen = $this->getDosen();
		$styleTable = array('borderSize' => 6, 'borderColor' => '999999');
		//style
		$cellRowSpan = array('vMerge' => 'restart', 'valign' => 'center');
		$cellRowContinue = array('vMerge' => 'continue');
		$cellHCentered = array('align' => 'center', 'spaceBefore' => 1, 'spaceAfter' => 1);
		$font = array('name' => 'Times New Roman');
		$this->phpWord->addTableStyle('Dosen Table', $styleTable);
		$table = $this->section2->addTable('Dosen Table');
		$table->addRow();
		$table->addCell(500)->addText('No', $font, $cellHCentered);
		$table->addCell(1750)->addText('Nama', $font, $cellHCentered);
		$table->addCell(1750)->addText('NIP', $font, $cellHCentered);
		$table->addCell(1750)->addText('PANGKAT', $font, $cellHCentered);
		$table->addCell(4000)->addText('Mata Kuliah Teori', $font, $cellHCentered);
		$table->addCell(1750)->addText('SKS', $font, $cellHCentered);
		$table->addCell(1750)->addText('SMT', $font, $cellHCentered);
		$table->addCell(1750)->addText('KELAS', $font, $cellHCentered);
		foreach($dosen as $i => $d) { 
			$table->addRow();
		    $table->addCell(500, $cellRowSpan)->addText($i+1, $font, $cellHCentered);
		    $table->addCell(1750, $cellRowSpan)->addText($d->nama, $font, $cellHCentered);
		    $table->addCell(1750, $cellRowSpan)->addText($d->nidn, $font, $cellHCentered);
		    $table->addCell(1750, $cellRowSpan)->addText($d->jabatan_fungsional->nama, $font, $cellHCentered);
		    foreach($d->mata_kuliah as $in => $mk) {
		    	if($in !== 0) {
		    		$table->addRow();
		    		$table->addCell(null, $cellRowContinue);
		    		$table->addCell(null, $cellRowContinue);
		    		$table->addCell(null, $cellRowContinue);
		    		$table->addCell(null, $cellRowContinue);
		    	}
		    	$table->addCell(1750)->addText($mk['nama'], $font, $cellHCentered);
		    	$table->addCell(1750)->addText($mk['sks'], $font, $cellHCentered);
		    	$table->addCell(1750)->addText($mk['semester'], $font, $cellHCentered);
		    	$table->addCell(1750)->addText($mk['kelas'], $font, $cellHCentered);
		    }   
	    }
	}
	

	public function generate() {
		$objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($this->phpWord, 'Word2007');
		
		$font = array('name' => 'Times New Roman', 'bold' => true);
		$oneSpace = array('spaceBefore' => 1, 'spaceAfter' => 1);
		$textCenter = array('alignment' => 'center', 'indent' => 1.2);
		$fontBig = array('size' => 20);
		$fontMedium = array('size' => 12);
		$header = $this->section->addHeader();
		$textrun = $header->addTextRun(array_merge($oneSpace, $textCenter));
		// array('width' => 535, 'height' => 535,'marginTop' => round(\PhpOffice\PhpWord\Shared\Converter::cmToPixel(5.25)),'posHorizontal' => 'absolute','posVertical' => 'absolute')
		$textrun->addImage(public_path('logo-polnes.png'), array(
			'width' => 54.54,
			'height' => 77.58,
			'marginTop' => round(\PhpOffice\PhpWord\Shared\Converter::cmToPixel(0)),
			'marginLeft' => round(\PhpOffice\PhpWord\Shared\Converter::cmToPixel(-1.6)), 'posHorizontal' => 'absolute','posVertical' => 'absolute',
			'wrappingStyle' => 'behind'
		), array('wrappingStyle' => 'behind', 'marginTop' => -100,
			'marginLeft' => -100));
		$textrun->addText('KEMENTRIAN RISET, TEKNOLOGI, DAN PENDIDIKAN TINGGI', array_merge($font, $fontMedium));
		// $header->addImage(public_path('logo-polnes.png'), array(
		// 	'width' => 54.54,
		// 	'height' => 77.58,
		// 	'wrappingStyle' => 'behind',
		// 	'lineHeight' => 0.06,
		// ), array(
		// 	'wrappingStyle' => 'behind', 
		// 	'marginTop' => 100,
		// 	'marginLeft' => -1,
		// 	'lineHeight' => 0.06,
		// ));
		// $header->addText('KEMENTRIAN RISET, TEKNOLOGI, DAN PENDIDIKAN TINGGI', array_merge($font, $fontMedium), array_merge($oneSpace, $textCenter));
		$header->addText('POLITEKNIK NEGERI SAMARINDA', array_merge($font, $fontBig), array_merge($oneSpace, $textCenter));
		$header->addText('Jalan Dr. Cipto Mangunkusumo Kampus Gunung Panjang Samarinda 75131', $font, array_merge($oneSpace, $textCenter));
		$header->addText('Telepon: PABX (0501) 260588 - 260553 - 262018 FAX. (0541) 260355', $font, array_merge($oneSpace, $textCenter));
		$header->addText('Website: www.polnes.ac.id E-mail : polnes@polnes.ac.id', $font,array_merge($oneSpace, $textCenter, array('spaceAfter' => 3)));
		$header->addText(null, null, array(
				'borderTopColor' => '#000',
				'borderTopSize' => 30,
				'borderBottomColor' => '#000',
				'borderBottomSize' => 10,
				'lineHeight' => 0.06,
				'spaceBefore' => 160
			));

		$font = array('bold' => true, 'name' => 'Times New Roman');
		$textCenter = array('alignment' => 'center');
		$thinSpace = array('spaceBefore' => 1, 'spaceAfter' => 1);

		$head = array_merge($textCenter, $thinSpace);

		$this->section->addText('KEPUTUSAN', $font, $textCenter);
		$this->section->addText('DIREKTUR POLITEKNIK NEGERI SAMARINDA', $font,$head);
		$this->section->addText('NOMOR SURAT YANG DINAMIS', $font,$head);
		$this->section->addText('TENTANG', $font,$head);
		$this->section->addText('TENAGA PENGAJAR MATA KULIAH TEORI DAN PRAKTIKUM PADA SEMESTER GASAL', $font);
		$this->section->addText('PROGRAM STUDI D3 TEKNIK INFORMATIKA', $font,$head);
		$this->section->addText('TAHUN AKADEMIK 2018/2019', $font,$head);

		$this->phpWord->addParagraphStyle('multipleTabAtasan', array(
			'tabs' => array(
				new \PhpOffice\PhpWord\Style\Tab('left', 1250),
				new \PhpOffice\PhpWord\Style\Tab('left', 1500),
				new \PhpOffice\PhpWord\Style\Tab('left', 1750)
			),
			'spaceBefore' => 1, 
			'spaceAfter' => 1
		));
		
		$this->section->addText("Menimbang\t:\ta.\t bahwa dalam rangka penjamin kelancaran kegiatan pengajaran mata kuliah teori dan praktikum pada", null, 'multipleTabAtasan');
		$this->section->addText("\t\t\tprogram studi D3 Teknik Informatika dalam semester gasal tahun akademik 2018/2019 perlu", null, 'multipleTabAtasan');
		$this->section->addText("\t\t\tmenunjuk pengajar tetap;", null, 'multipleTabAtasan');

		$this->section->addText("\t:\tb.\t bahwa berdasarkan pertimbangan sebagaimana dimaksud pada huruf a perlu menetapkan", null, 'multipleTabAtasan');
		$this->section->addText("\t\t\tKeputusan Direktur Politeknik Negeri Samarinda", null, 'multipleTabAtasan');

		$this->honorTable();
		$this->section->addPageBreak();
		$this->section2->addHeader();

		
		$this->phpWord->addParagraphStyle('multipleTab', array(
			'tabs' => array(
				new \PhpOffice\PhpWord\Style\Tab('left', 1000),
				new \PhpOffice\PhpWord\Style\Tab('left', 1250)
			),
			'spaceBefore' => 1, 
			'spaceAfter' => 1
		));
		$textrun = $this->section2->addTextRun('multipleTab');
		$textrun->addText("Lampiran\t", null);
		$textrun->addText(":\t");
		$textrun->addText("Surat Keputusan Direktur Politeknik Negeri Samarinda");

		$textrun = $this->section2->addTextRun('multipleTab');
		$textrun->addText("Nomor\t");
		$textrun->addText(":\t");
		$textrun->addText("12345");

		$textrun = $this->section2->addTextRun('multipleTab');
		$textrun->addText("Tentang\t");
		$textrun->addText(":\t");
		$textrun->addText("Daftar Namam Tenaga Pengajar Mata Kuliah dan Praktikum Pada Semester Gasal");

		$textrun = $this->section2->addTextRun('multipleTab');
		$textrun->addText("\t");
		$textrun->addText("\t");
		$textrun->addText("Program Studi D3 Teknik Informatika Tahun Akademik 2018/2019");
		 
		$rows = 10;
		$cols = 5;

		$this->dosenTable();

		$objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($this->phpWord, 'Word2007');
		$objWriter->save('MyDocument.docx');
		return response()->download('MyDocument.docx');
	}
}
