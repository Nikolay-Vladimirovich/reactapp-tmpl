import socialsList from '@data/socialsListDB'

export const socialsService = {
	getAll() {
		const result = socialsList
		const genArr = result.map(item => {
			const iconField = { iconName: `soc-${item.name}` }
			return { ...item, ...iconField }
		})
		return genArr
	}
}
