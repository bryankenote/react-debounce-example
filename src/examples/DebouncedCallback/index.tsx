import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { Dropdown } from '../../generic/Dropdown';
import './style.css';

export function DebouncedCallback() {
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

	const dropDownItems = useMemo(
		() => [
			{
				display: 'Golang',
				href: 'https://go.dev',
			},
			{
				display: 'Rust',
				href: 'https://www.rust-lang.org/',
			},
			{
				display: 'Typescript',
				href: 'https://typescriptlang.org',
			},
			{
				display: '💩',
				href: 'https://nodejs.org/en',
			},
		],
		[]
	);

	const isMounted = useRef(false);
	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);

	// In the event the dropdown is open & the button is clicked, both the
	// click button handler and click outside of dropdown handler will be called.
	// We can debounce this callback to ensure that two invocations of the callback
	// back to back will not work against each other.
	const toggleCount = useRef(0);

	const handleToggleDropdown = useCallback(() => {
		toggleCount.current++;
		setTimeout(function debounce() {
			toggleCount.current--;
			if (toggleCount.current > 0) {
				return;
			}

			setIsDropdownOpen(isDropdownOpen => !isDropdownOpen);
		}, 100);
	}, []);

	return (
		<div className="DebouncedCallback">
			<h2>Debounced Callback</h2>
			<button onClick={handleToggleDropdown}>{'open dropdown'}</button>
			<Dropdown
				isOpen={isDropdownOpen}
				items={dropDownItems}
				onClickOutside={handleToggleDropdown}
			/>
		</div>
	);
}
