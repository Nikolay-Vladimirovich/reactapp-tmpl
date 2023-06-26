import { FooterContent, HeaderContent, MainContent } from '@template/contents'
import { Footer, Header, Main, Template } from '@template/template'

import Copyright from '@components/common/copyright'
import Socials from '@components/common/socials'

// import { ControlAuth } from "@components/controls";
// import ShopcartBox from "@components/boxes/shopcartbox";
// import ProductsList from "@components/dataOutput/productsList";

const HomePage = ({ title }) => {
	document.title = title + (global.siteName ? ' | ' + global.siteName : '')

	return (
		<Template modificator='homepage'>
			<Header>
				<HeaderContent titleText={'Главная'}>HeaderContent</HeaderContent>
			</Header>
			<Main>
				<MainContent></MainContent>
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

export default HomePage
