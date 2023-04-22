import React, {
	ChangeEventHandler,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { LoadingSpinner } from '../../generic/LoadingSpinner';
import { getProgrammingLanguages } from '../../api/client';
import './style.css';

export function DebouncedEffect() {
	const [inputValue, setInputValue] = useState<string>('');
	const [filteredLanguages, setFilteredLanguages] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSetInputValue: ChangeEventHandler<HTMLInputElement> = useCallback(
		event => {
			setInputValue(event.target.value);
		},
		[]
	);

	// setTimeout
	// useEffect(
	//     function onInputChange() {
	//         setIsLoading(true);

	//         setTimeout(async () => {
	//             const languages = await getProgrammingLanguages(inputValue);

	//             console.debug("setState", languages);
	//             setFilteredLanguages(languages);
	//             setIsLoading(false);
	//         }, 500);
	//     },
	//     [inputValue]
	// );

	// isStale
	// useEffect(
	//     function onInputChange() {
	//         let isStale = false;

	//         setIsLoading(true);

	//         (async () => {
	//             const languages = await getProgrammingLanguages(inputValue);
	//             if (!isStale) {
	//                 console.debug("setState", languages);
	//                 setFilteredLanguages(languages);
	//             }

	//             setIsLoading(false);
	//         })();

	//         return () => {
	//             isStale = true;
	//         };
	//     },
	//     [inputValue]
	// );

	// combine setTimeout and stale check to accomplish debouncing
	useEffect(
		function onInputChange() {
			let isStale = false;

			setIsLoading(true);

			setTimeout(async function debounce() {
				if (isStale) {
					return;
				}

				const languages = await getProgrammingLanguages(inputValue);

				if (isStale) {
					return;
				}

				console.debug('setState', languages);
				setFilteredLanguages(languages);
				setIsLoading(false);
			}, 500);

			return () => {
				isStale = true;
			};
		},
		[inputValue]
	);

	return (
		<div className="DebouncedEffect">
			<h2>Debounced Effect</h2>
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
