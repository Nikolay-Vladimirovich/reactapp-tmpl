import "./_init.scss";
import { v4 as uuidv4 } from "uuid";

const FldsGrid = ({ children = [], layoutPrefix, modificator }) => {
	const cname = "fldsgrid";

	return (
		<div className={`${cname}`}>
			{children.map((item) => {
				return (
					<div key={uuidv4()} className={`${cname}__item`}>
						{item}
					</div>
				);
			})}
		</div>
	);
};

export { FldsGrid };
