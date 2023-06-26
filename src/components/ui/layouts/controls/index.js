import { v4 as uuidv4 } from 'uuid'

import useBEM from '@hooks/useBEM'

import './_init.scss'

const CtrlsGrid = ({ children = [], position, bem = {} }) => {
	const cn = 'ctrlsgrid'
	const [cnfull] = useBEM({ cn, bem })
	return (
		<div className={cnfull}>
			{children.map(item => {
				return (
					<div key={uuidv4()} className={`${cn}__slot`}>
						{item}
					</div>
				)
			})}
		</div>
	)
}

export { CtrlsGrid }
