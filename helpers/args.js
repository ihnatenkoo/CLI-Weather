const getArgs = (args) => {
	const res = {};
	const [executer, file, ...rest] = args;

	rest.forEach((value, index, arr) => {
		const key = value.slice(1);

		if (value.charAt(0) === '-') {
			if (index === arr.length - 1) {
				res[key] = true;
			} else if (arr[index + 1].charAt(0) !== '-') {
				res[key] = arr[index + 1];
			} else {
				res[key] = true;
			}
		}
	});

	return res;
};

export { getArgs };
