import React, {
	ChangeEventHandler,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { getProgrammingLanguages } from '../../api/client';
import './style.css';
import { LoadingSpinner } from '../../generic/LoadingSpinner';

export function Naive() {
	const [inputValue, setInputValue] = useState<string>('');
	const [filteredLanguages, setFilteredLanguages] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSetInputValue: ChangeEventHandler<HTMLInputElement> = useCallback(
		event => {
			setInputValue(event.target.value);
		},
		[]
	);

	useEffect(
		function onInputChange() {
			setIsLoading(true);

			(async () => {
				const languages = await getProgrammingLanguages(inputValue);
				console.debug('setState', languages);
				setFilteredLanguages(languages);

				setIsLoading(false);
			})();
		},
		[inputValue]
	);

	return (
		<div className="Naive">
			<h2>Naive</h2>
			<input value={inputValue} onChange={handleSetInputValue} />
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<ul>
					{filteredLanguages.map((language, index) => (
						<li key={index}>{language}</li>
					))}
				</ul>
			)}
		</div>
	);
}
