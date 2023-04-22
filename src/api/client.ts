const RESPONSE_TIME = 1000;

const data = {
	programmingLanguages: [
		'Golang',
		'Rust',
		'Typescript',
		'C',
		'C++',
		'C#',
		'F#',
		'Basic',
		'Java',
		'Python',
		'Javascript',
		'PHP',
		'Ruby',
		'Haskel',
	] as const,
} as const;

export const getProgrammingLanguages = async (
	query: string
): Promise<string[]> => {
	console.debug('getProgrammingLanguages request');
	return new Promise(resolve => {
		setTimeout(() => {
			const { programmingLanguages: languages } = data;
			console.debug('getProgrammingLanguages response');
			resolve(
				languages.filter(language =>
					language.toLowerCase().includes(query.toLowerCase())
				)
			);
		}, RESPONSE_TIME);
	});
};
