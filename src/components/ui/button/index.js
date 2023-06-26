import { Link } from 'react-router-dom'

import useBEM from '@hooks/useBEM'

import Icon from '@components/ui/icon'

import './_init.scss'

function Button({
	link = false,
	to = '/',
	caption,
	face = 'base',
	accent = 'primary',
	theme,
	icon,
	ipos = 'start',
	clickHandler,
	preventDefault = 'true',
	stopPropagation = 'true',
	bem = {},
	...rest
}) {
	const cn = 'btn'
	const [cnfull] = useBEM({ cn, bem })
	// let ico = icon ?? accent ?? '';
	let captionHTML = caption ? (
		<span className='btn__caption'>{caption}</span>
	) : (
		''
	)
	if (!link) {
		return (
			<button
				onClick={e => {
					if (!clickHandler) return
					if (preventDefault) e.preventDefault()
					if (stopPropagation) e.stopPropagation()
					clickHandler()
				}}
				onKeyDown={e => {
					if (!clickHandler) return
					if (e.code === 'Space' || e.code === 'Enter') {
						if (preventDefault) e.preventDefault()
						if (stopPropagation) e.stopPropagation()
						clickHandler()
					}
				}}
				data-face={face}
				data-accent={accent}
				data-theme={theme}
				{...rest}
				className={cnfull}
			>
				<span className='btn__decorator'></span>
				<span className='btn__helper'>
					{ipos === 'start' ? (
						icon ? (
							<Icon icon={icon} bem={{ prefix: 'btn' }} />
						) : (
							''
						)
					) : (
						''
					)}
					{captionHTML}
					{ipos === 'end' ? (
						icon ? (
							<Icon icon={icon} bem={{ prefix: 'btn' }} />
						) : (
							''
						)
					) : (
						''
					)}
				</span>
			</button>
		)
	} else {
		return (
			<Link
				className={cnfull}
				data-face={face}
				data-accent={accent}
				data-theme={theme}
				to={to}
				// onClick={()=>{clickHandler()}}
			>
				<span className='btn__decorator'></span>
				<span className='btn__helper'>
					{ipos === 'start' ? icon ? <Icon icon={icon} /> : '' : ''}
					{captionHTML}
					{ipos === 'end' ? icon ? <Icon icon={icon} /> : '' : ''}
				</span>
			</Link>
		)
	}
}
export default Button
