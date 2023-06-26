import './contents.core.scss'
import './headercontent.scss'
import './maincontent.scss'
import './footercontent.scss'

const HeaderContent = ({
	placeStart,
	placeTitle,
	titleText,
	placeEnd,
	children,
	modificator
}) => {
	const cname = 'headercontent'
	const modificatorPrepared = modificator ? ` ${cname}--${modificator}` : ''
	return (
		<div className={`${cname}${modificatorPrepared}`}>
			{placeStart ? (
				<div className={`${cname}__place ${cname}__place--start`}>
					{placeStart}
				</div>
			) : (
				''
			)}

			<div className={`${cname}__place ${cname}__place--title`}>
				{placeTitle ? (
					placeTitle
				) : titleText ? (
					<h1 className='title'>{titleText}</h1>
				) : (
					''
				)}
			</div>

			{children ? (
				<div className={`${cname}__place ${cname}__place--children`}>
					{/* <ShopCartBox /> */}
					{children}
				</div>
			) : (
				''
			)}
			{placeEnd ? (
				<div className={`${cname}__place ${cname}__place--end`}>{placeEnd}</div>
			) : (
				''
			)}
		</div>
	)
}

const MainContent = ({ children, modificator }) => {
	const cname = 'maincontent'
	const modificatorPrepared = modificator ? ` ${cname}--${modificator}` : ''
	return <div className={`${cname}${modificatorPrepared}`}>{children}</div>
}

const FooterContent = ({ placeA, placeB, children, bem = {} }) => {
	const cname = 'footercontent'
	const prefix = bem?.prefix ? ` ${bem?.prefix}__${cname}` : ''
	const suffix = bem?.suffix ? ` ${cname}--${bem?.suffix}` : ''
	return (
		<div className={`${cname}${suffix}`}>
			<div className={`${cname}__place ${cname}__place--a`}>{placeA}</div>
			<div className={`${cname}__place ${cname}__place--b`}>{placeB}</div>
		</div>
	)
}

export { HeaderContent, MainContent, FooterContent }
