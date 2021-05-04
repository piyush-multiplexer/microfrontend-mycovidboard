const StandaloneSingleSpaPlugin = require('standalone-single-spa-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    configureWebpack: {
        devServer: {
            // Not required, but it's often useful to run webpack-dev-server in SPA mode
            historyApiFallback: true
        },
        plugins: [
            // the standalone plugin works in conjunction with HtmlWebpackPlugin
            new HtmlWebpackPlugin(),

            new StandaloneSingleSpaPlugin({
                // required
                appOrParcelName: "my-microfrontend-name",

                // optional - strongly encouraged for single-spa applications
                activeWhen: ['/route-prefix'],

                // optional - useful for enabling cross-microfrontend imports
                importMapUrl: new URL("https://my-cdn.com/importmap.json"),

                // optional - useful for adding an additional, local-only import map
                importMap: {
                    imports: {
                        "other-module": "/other-module.js"
                    }
                },

                // optional - defaults to false. This determines whether to mount
                // your microfrontend as an application or a parcel
                isParcel: false,

                // optional - you can disable the plugin by passing in this boolean
                disabled: false,

                // optional - the standalone plugin relies on optionalDependencies in the
                // package.json. If this doesn't work for you, pass in your HtmlWebpackPlugin
                // to ensure the correct one is being referenced
                HtmlWebpackPlugin,

                // optional - defaults to true - turns on or off import-map-overrides.
                importMapOverrides: true,

                // optional - defaults to null. This allows you to hide the import-map-overrides UI
                // unless a local storage key is set. See more info at https://github.com/joeldenning/import-map-overrides/blob/master/docs/ui.md#enabling-the-ui
                importMapOverridesLocalStorageKey: null
            })
        ]
    }
}