import { socialsService } from '@services/socials.service'
import { memo, useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import useBEM from '@hooks/useBEM'

import Button from '@components/ui/button'
import Preloader from '@components/ui/preloader'

import './_init.scss'

const SocialsList = memo(({ bem = {} }) => {
	const cn = 'socialslist'
	const [cnfull, prefix, suffix] = useBEM({ cn, bem })

	const [socialsListLoaded, setSocialsListLoaded] = useState([])
	const [preloader, setPreloader] = useState(Preloader)
	useEffect(() => {
		const allData = socialsService.getAll()
		setPreloader(null)
		setSocialsListLoaded(allData)
	}, [])
	// const dispatch = useDispatch()

	return (
		<div className={cnfull}>
			{preloader}
			{socialsListLoaded.length !== 0 ? (
				<div className={`${cn}__body`}>
					{socialsListLoaded.map(item => {
						return <Button key={uuidv4()} icon={item.iconName} face='social' />
					})}
				</div>
			) : !preloader ? (
				<div className={`${cn}__notifybar`}>
					<span className={`${cn}__notify`}>Ничего не найдено</span>
				</div>
			) : (
				''
			)}
		</div>
	)
})

export default SocialsList
