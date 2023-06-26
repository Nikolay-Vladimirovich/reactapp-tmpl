import { FooterContent, HeaderContent, MainContent } from '@template/contents'
import { Footer, Header, Main, Template } from '@template/template'

// import { useEffect } from 'react'
import Copyright from '@components/common/copyright'
import Socials from '@components/common/socials'
import Button from '@components/ui/button'
import XSelect from '@components/ui/form-controls/select'

const UIButtonsPage = ({ title }) => {
	document.title = title + (global.siteName ? ' | ' + global.siteName : '')

	return (
		<Template modificator='UIButtons'>
			<Header>
				<HeaderContent titleText={'Главная'}>HeaderContent</HeaderContent>
			</Header>
			<Main>
				<MainContent>
					<div className='fldstest'>
						<Button caption='Base Primary' />
						<Button caption='Base Primary Disabled' disabled />
						<Button caption='Base Secondary' accent='secondary' />
						<Button caption='Base Secondary Disabled' accent='secondary' disabled />
						<Button caption='Pure Primary' face='pure' />
						<Button caption='Pure Primary Disabled' face='pure' disabled />
						<Button caption='Pure Secondary' face='pure' accent='secondary' />
						<Button caption='Pure Secondary Disabled' face='pure' accent='secondary' disabled />
					</div>
					<hr />
					<XSelect />
				</MainContent>
			</Main>
			<Footer>
				<FooterContent
					placeA={<Socials bem={{ prefix: 'footer' }} />}
					placeB={<Copyright bem={{ prefix: 'footer' }} />}
				></FooterContent>
			</Footer>
		</Template>
	)
}

export default UIButtonsPage
