import { Template, Header, Main } from "@template/template";
import { HeaderContent, MainContent } from "@template/contents";
import { ControlAuth } from "@components/controls";
import ShopcartBox from "@components/boxes/shopcartbox";
import ProductsList from "@components/dataOutput/productsList";
const ProductsPage = ({ title }) => {
	document.title = title + (global.siteName ? " | " + global.siteName : "");

	return (
		<Template modificator="products">
			<Header>
				<HeaderContent titleText={"Наша продукция"} placeEnd={<ControlAuth />}>
					<ShopcartBox />
				</HeaderContent>
			</Header>
			<Main>
				<MainContent>
					<ProductsList />
				</MainContent>
			</Main>
		</Template>
	);
};

export default ProductsPage;
