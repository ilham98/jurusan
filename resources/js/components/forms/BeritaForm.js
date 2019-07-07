import React, { useState, useEffect } from "react"
import Button from '@/components/Button';
import axios from 'axios';
import generateUrl from '@/helper/generateUrl';
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from "draftail";
import { InputText, Label, FormGroup, ErrorMessage } from '@/components/forms';
import { withRouter } from 'react-router-dom';
import { toHTML, fromHTML } from '@/helper/textEditorConverter';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

function BeritaForm(props) {

	const { editMode, berita } = props;

	const init = {
		judul: '',
		isi: ''
	}

	const defaultContent = editMode ? fromHTML(berita.isi) : JSON.parse(sessionStorage.getItem("draftail:content"));
	const [ form, setForm ] = useState(init);
	const [ errors, setErrors ] = useState({});
	const [ content, setContent ] = useState(defaultContent);

	function changeHandler(e) {
		e.persist();
		setForm(f => ({ ...f, [e.target.name]: e.target.value }) );
	}

	const onSave = (c) => {
		setContent(c);
		sessionStorage.setItem("draftail:content", JSON.stringify(c))
	}

	useEffect(() => {
		if(editMode === true) {
			setForm(berita);
			sessionStorage.setItem("draftail:content", JSON.stringify(fromHTML(berita.isi)));
		}
	}, []);

	function submitHandler(e) {
		e.preventDefault();
		const isi = toHTML(content);
		const f = { ...form, isi };
		console.log(f);
		const ax = editMode ? axios.put(generateUrl('berita/'+berita.id), f) : axios.post(generateUrl('berita'), f);
			ax.then(() => {
				Swal.fire(
				  'Berhasil!',
				  'Data berhasil diinput!',
				  'success'
				);
				sessionStorage.setItem("draftail:content", null);
				props.history.push('/a/berita');
			}).catch(err => {
				console.log(err);
				setErrors(err.response.data.errors);
			});
	}

	return (
		<form onSubmit={ submitHandler }>
		  <FormGroup>
		  	<Label>Judul</Label>
		  	<InputText value={ form.judul } name='judul' onChange={ changeHandler } />
		  	<ErrorMessage>{ errors.judul && errors.judul[0]  }</ErrorMessage>
		  </FormGroup>
		  <FormGroup>
		  	<Label>Isi</Label>
			  <DraftailEditor
			    rawContentState={content || null}
			    onSave={onSave}
			    blockTypes={[
					{ type: BLOCK_TYPE.HEADER_ONE },
					{ type: BLOCK_TYPE.HEADER_TWO },
					{ type: BLOCK_TYPE.HEADER_THREE },
					{ type: BLOCK_TYPE.HEADER_FOUR },
					{ type: BLOCK_TYPE.HEADER_FIVE },
					{ type: BLOCK_TYPE.HEADER_SIX },
					{ type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
					{ type: BLOCK_TYPE.ORDERED_LIST_ITEM },
			    ]}
			    inlineStyles={[{ type: INLINE_STYLE.BOLD }, { type: INLINE_STYLE.ITALIC }]}
			  />
			  <ErrorMessage>{ errors.isi && errors.isi[0]  }</ErrorMessage>
		  </FormGroup>
		  <FormGroup align='right'>
			  <Button text='Submit' type='submit' />
		  </FormGroup>
		</form>
	)
}

BeritaForm.propTypes = {
	editMode: PropTypes.bool,
	berita: PropTypes.object,
	history: PropTypes.object
}

export default withRouter(BeritaForm);
