import useBEM from '@hooks/useBEM'

import './_init.scss'

const FormGrid = ({
	children,
	placeHeadbar,
	placeFootbar,
	// layoutPrefix,
	// modificator,
	bem = {}
}) => {
	const cn = 'formgrid'
	const [cnfull] = useBEM({ cn, bem })

	return (
		<div className={cnfull}>
			<div className={`${cn}__headbar`}>{placeHeadbar}</div>
			<div className={`${cn}__mainbar`}>{children}</div>
			<div className={`${cn}__footbar`}>{placeFootbar}</div>
		</div>
	)
}

export { FormGrid }
