const changeHandler = (e, setForm) => {
	const { name, value } = e.target;
	setForm(prevState => ({ ...prevState , [name]: value }));
	// setState(s => { [e.target.name]:e.target.value });
};

export default changeHandler;