import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import './style.css';

interface IDropdown {
	isOpen: boolean;
	items: { display: string; href: string }[];
	onClickOutside?: () => void;
}

export function Dropdown({ isOpen, items, onClickOutside }: IDropdown) {
	const ref = useRef<HTMLDivElement>(null);

	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (
				isOpen &&
				ref.current &&
				!ref.current.contains(event.target as Node)
			) {
				onClickOutside?.();
			}
		},
		[isOpen, onClickOutside]
	);

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, [handleClickOutside]);

	const renderedItems = useMemo(
		() =>
			items.map(({ display, href }, index) => (
				<a key={index} href={href}>
					{display}
				</a>
			)),
		[items]
	);

	return (
		<div ref={ref} className={`dropdown${isOpen ? '' : ' hidden'}`}>
			{renderedItems}
		</div>
	);
}
