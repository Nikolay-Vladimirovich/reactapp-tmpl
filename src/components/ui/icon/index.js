import useBEM from '@hooks/useBEM'

import './_init.scss'

function Icon({ icon, bem = {} }) {
	const cn = 'icon'
	const [cnfull] = useBEM({ cn, bem })

	return <span className={cnfull} data-icon={icon}></span>
}

export default Icon
