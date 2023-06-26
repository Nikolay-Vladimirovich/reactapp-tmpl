import { Template, Header, Main } from "@template/template";
import { HeaderContent, MainContent } from "@template/contents";
import ProductDetailed from "@components/dataOutput/productDetailed";
import { ControlNavigateBack, ControlAuth } from "@components/controls";
import ShopcartBox from "@components/boxes/shopcartbox";

const ProductDetailPage = ({ title }) => {
	document.title = title + (global.siteName ? " | " + global.siteName : "");

	return (
		<Template modificator="productdetailed">
			<Header>
				<HeaderContent
					placeStart={<ControlNavigateBack />}
					titleText={""}
					placeEnd={<ControlAuth />}
				>
					<ShopcartBox />
				</HeaderContent>
			</Header>
			<Main>
				<MainContent>
					<ProductDetailed />
				</MainContent>
			</Main>
		</Template>
	);
};

export default ProductDetailPage;
