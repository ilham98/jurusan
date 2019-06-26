import React, { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Loading from '@/components/Loading';
import InputSelect from '@/components/forms/InputSelect';
import FormGroup from '@/components/forms/FormGroup';
import useAxios from '@/hooks/useAxios';
import FetchedData from '@/components/FetchedData';

function Jadwal() {
	const [ tahun, setTahun ] = useState(2016);
	const [ semester, setSemester ] = useState(1);
	const [ kodeProdi, setKodeProdi ] = useState('');
	const isInitialMount = useRef(true);
	const { data:prodi } = useAxios({ 'url': 'prodi' });
	const  { 
		data: jadwal, 
		loading, 
		refetch,
		error
	} = useAxios({ url: `jadwal?tahun=${tahun}`});

	useEffect(s => {
		if(isInitialMount.current)
			isInitialMount.current = false;
		else {
			refetch()
		}
	}, [tahun]);

	function loopWaktu(waktu) {
		return Object.keys(waktu).map(function(key, index) {
			return (
				<div key={ key } className='py-3 px-10'>
					<div className='whitespace-no-wrap text-sm text-center'>{ key }</div>
					<div>{ waktu[key].mata_kuliah.nama }</div>
				</div>
			);
		});
	}

	function loopHari(hari, semester) {
		return Object.keys(hari).map(function(key, index) {
			return (
				<div key={ key } className='rounded-lg shadow bg-white p-1 mx-2 animated fadeInDown faster flex-init my-3'>
					<div className={`rounded-lg p-5 border-b-2  ${ semester === 1 ?  'border-blue-500 text-blue-500' :  'border-orange-500 text-orange-500'  } font-bold text-center`}>{ key }</div>
					<div className='text-center text-sm'>{ loopWaktu(hari[key]) }</div>
				</div>
			);
		});
	}

	function Kelas({kelas, semester}) {
		const [show, setShow] = useState(false);
		return Object.keys(kelas).map(function(key, index) {
			return (
				<div key={ key }>
					<div className="my-3">
						<div className="font-bold text-white">
							<div className={`text-white inline-block px-3 py-1 rounded ${ semester === 1 ?  'bg-blue-600' :  'bg-orange-500'  } mx-2 `}>{ key }</div>
						</div>
						<div className="flex flex-wrap">{ loopHari(kelas[key], semester) }</div>
					</div>
				</div>
			);
		});
	}

	function loopJadwal(semester) {
		if(jadwal[semester]) {
				if(jadwal[semester][kodeProdi]) {
					return (
							<div className="mt-5 rounded animated fadeIn faster flex flex-col justify-start items-start p-5 lg:p-10 bg-gray-100 shadow-lg">
								<div className="text-lg my-5 font-bold text-gray-800"> Semester { semester === 1 ? 'Ganjil' : 'Genap'}</div>
								<div className="">
									<Kelas kelas={jadwal[semester][kodeProdi]} semester={semester}/>
								</div>
							</div>
						);
				}
				return <div className='h-24 flex justify-center items-center text-bold'><div className='bg-white p-3 shadow rounded'>Tidak Ditemukan Jadwal</div></div>;
			}
		return (<div className='h-24 flex justify-center items-center text-bold'><div className='bg-white p-3 shadow rounded'>Tidak Ditemukan Jadwal</div></div>);
	}

    return (
    	<div>
			<Navbar />
			<div className="p-3 mt-20 lg:p-10">
				<div className='flex flex-wrap'>
					<FormGroup flex={1}>
						<InputSelect value={ tahun } onChange={ e => { 
							setTahun(parseInt(e.target.value)); console.log('aaa'); 
						} }>
							<option value={2016}>2016</option>
							<option value={2017}>2017</option>
							<option value={2018}>2018</option>
							<option value={2019}>2019</option>
						</InputSelect>
					</FormGroup>
					<FormGroup flex={1}>
						<InputSelect value={ semester } onChange={ e => setSemester(parseInt(e.target.value)) }>
							<option value={1}>Ganjil</option>
							<option value={2}>Genap</option>
						</InputSelect>
					</FormGroup>
					<FormGroup>
						<InputSelect width='full' value={ kodeProdi } onChange={ e => setKodeProdi(e.target.value) }>
							<option value=''>Pilih Prodi</option>
							{
								prodi.map(p => (
									<option key={p.kode} value={p.kode}>{ p.nama }</option>
								))
							}
						</InputSelect>
					</FormGroup>
				</div>
				<div>
					<FetchedData loading={ loading } error={ error }>
						{ loopJadwal(semester) }
					</FetchedData>
				</div>
			</div>
      	</div>
    );
}

export default Jadwal;
