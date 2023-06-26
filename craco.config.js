const path = require('path')

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
	webpack: {
		alias: {
			'@package.json': resolvePath('./package.json'),
			'@config': resolvePath('./src/config'),
			'@pages': resolvePath('./src/Pages'),
			'@template': resolvePath('./src/template'),
			'@hoc': resolvePath('./src/hoc'),
			'@hooks': resolvePath('./src/hooks'),
			'@services': resolvePath('./src/services'),
			'@store': resolvePath('./src/store'),
			'@js': resolvePath('./src/js'),
			'@components': resolvePath('./src/components'),
			'@components/*': resolvePath('./src/components/*'),
			'@data': resolvePath('./src/data')
		}
	},
	style: {
		sass: {
			loaderOptions: {
				additionalData: `
			  @use "sass:math";
			  @import "src/template/common/functions.scss";
			  @import "src/template/common/mixins.core.scss";
			  @import "src/template/common/mixins.rpr.scss";
			  @import "src/template/config/layout.config.scss";
			  @import "src/template/common/mixins.composite/_mixins.typography.scss";
			  @import "src/template/common/mixins.composite/_mixins.marg.scss";
			  @import "src/template/common/mixins.composite/_mixins.padd.scss";
			`
			}
		}
	}
}
