<table border="1">
	<thead>
		<tr>
			<th>Hari</th>
			<th>Waktu</th>
		</tr>
	</thead>
	<tbody>
		@foreach($waktu as $w)
			<tr>
				<td>{{ $w->hari->nama }}</td>
				<td>{{ $w->mulai }}</td>
			</tr>
		@endforeach
	</tbody>
</table>