import { Template, Header, Main, Footer } from "@template/template";
import { HeaderContent, MainContent, FooterContent } from "@template/contents";
import { ControlNavigateBack, ControlAuth, ControlShopcartCheckout } from "@components/controls";
import OrderSum from "@components/elements/ordersum";
import ShopcartList from "@components/dataOutput/shopcartList";

const ShopcartPage = ({ title }) => {
	document.title = title + (global.siteName ? " | " + global.siteName : "");

	return (
		<Template modificator="shopcart">
			<Header>
				<HeaderContent
					placeStart={<ControlNavigateBack />}
					titleText={"Корзина с выбранными товарами"}
					placeEnd={<ControlAuth />}
				></HeaderContent>
			</Header>
			<Main>
				<MainContent>
					<ShopcartList />
				</MainContent>
			</Main>
			<Footer>
				<FooterContent placeSummary={<OrderSum />} placeCtrls={<ControlShopcartCheckout />} />
			</Footer>
		</Template>
	);
};

export default ShopcartPage;
