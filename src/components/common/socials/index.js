import { v4 as uuidv4 } from 'uuid'

import useBEM from '@hooks/useBEM'

import SocialsList from '@components/dataOutput/socialsList'

import './_init.scss'

function Socials({ icon, bem = {} }) {
	const cn = 'socials'
	const [cnfull, prefix, suffix] = useBEM({ cn, bem })

	return (
		<div className={cnfull}>
			<SocialsList bem={{ prefix: bem?.prefix }} />
		</div>
	)
}

export default Socials
