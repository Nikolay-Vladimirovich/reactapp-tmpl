import { Template, Header, Main, Footer } from "@template/template";
import { HeaderContent, MainContent, FooterContent } from "@template/contents";
import { ControlAuth } from "@components/controls";
// import ShopcartBox from "@components/boxes/shopcartbox";
// import ProductsList from "@components/dataOutput/productsList";
const HomePage = ({ title }) => {
	document.title = title + (global.siteName ? " | " + global.siteName : "");

	return (
		<Template modificator="Homepage">
			<Header>
				<HeaderContent titleText={"Главная"} placeEnd={<ControlAuth />}>
					HeaderContent
				</HeaderContent>
			</Header>
			<Main>
				<MainContent>MainContent</MainContent>
			</Main>
			<Footer>
				<FooterContent></FooterContent>
			</Footer>
		</Template>
	);
};

export default HomePage;
