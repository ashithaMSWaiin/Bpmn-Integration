const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack"); // only add this if you don't have yet
const { ModuleFederationPlugin } = webpack.container;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const devdeps = require("../../package.json").devDependencies;
const deps = require("../../package.json").dependencies;
require("dotenv").config({ path: "./.env" });

const buildDate = new Date().toLocaleString();
const path = require("path");
const fs = require("fs");
const mfeFilePath = path.join(__dirname, "../", "mfe-config.ts");
let mfeConfig = fs.readFileSync(mfeFilePath).toString();
let mfeConfigJSON = mfeConfig.substring(
    mfeConfig.indexOf("{"),
    mfeConfig.lastIndexOf("}") + 1
);
mfeConfigJSON = JSON.parse(mfeConfigJSON);

module.exports = (env, argv) => {
    const isProduction = argv.mode === "production";
    return {
        entry: "./src/index.ts",
        mode: argv.mode || "development",
        devtool: isProduction ? false : "source-map",
        performance: {
            hints: false
        },
        devServer: {
            port: 8080,
            open: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            hot: true,
            historyApiFallback: true,
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".ttf"],
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif|mp4)$/i,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[name].[ext]",
                                outputPath: "assets/",
                                publicPath: "assets/",
                            },
                        },
                    ],
                },
                {
                    test: /\.svg$/,
                    use: ["@svgr/webpack"],
                },

                { test: /\.(config)$/, loader: "file-loader" },
                {
                    test: /\.(scss|css)$/,
                    use: ["style-loader", "css-loader", "sass-loader"],
                    exclude: "/node_modules/",
                },
                {
                    test: /\.(js|jsx|tsx|ts)$/,
                    loader: "babel-loader",
                    exclude: /node_modules/,
                    options: {
                        cacheDirectory: true,
                        babelrc: false,
                        presets: [
                            [
                                "@babel/preset-env",
                                { targets: { browsers: "last 2 versions" } },
                            ],
                            "@babel/preset-typescript",
                            "@babel/preset-react",
                        ],
                        plugins: [
                            "react-hot-loader/babel",
                            ["@babel/plugin-proposal-class-properties", { loose: true }],
                            ["@babel/plugin-proposal-private-methods", { loose: true }],
                            ["@babel/plugin-transform-private-property-in-object", { loose: true }]
                        ],
                    },
                },
            ],
        },
        optimization: {
            minimize: false,
            minimizer: [
                new TerserPlugin({
                    // Additional options for TerserPlugin
                    // For example, you can set cache to true for faster builds
                    parallel: true, terserOptions: {
                        sourceMap: true, // Enable source maps
                        // ... other terser options ...
                    },  // Use multiple CPU cores for minification
                }),
            ],
            splitChunks: {
                chunks: 'all', // Split code into separate chunks
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
            usedExports: true, // Enable tree shaking by recognizing used exports
            concatenateModules: true, // Enable scope hoisting for better performance
        },

        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: "src/assets",
                        to: "assets",
                    },
                ],
            }),
            new webpack.EnvironmentPlugin({ BUILD_DATE: buildDate }),
            new webpack.DefinePlugin({
                "process.env": JSON.stringify(process.env),
            }),
            new ModuleFederationPlugin({
                name: "host",
                remotes: {
                    Dashboard: mfeConfigJSON["dashboard"].url,
                    Login: mfeConfigJSON["login"].url,
                    ForgotPassword: mfeConfigJSON["forgot-password"].url,
                    Tenant: mfeConfigJSON["tenant"].url,
                    Maintainance: mfeConfigJSON["maintainance"].url,
                    Edition: mfeConfigJSON["edition"].url,
                    Settings: mfeConfigJSON["settings"].url,
                    AuditLogs: mfeConfigJSON["audit-logs"].url,
                    Users: mfeConfigJSON["users"].url,
                    Roles: mfeConfigJSON["roles"].url,
                    OrganizationUnits: mfeConfigJSON["organization-units"].url,
                    Language: mfeConfigJSON["language"].url,
                    IconList: mfeConfigJSON["icon-list"].url,
                    LanguageText: mfeConfigJSON["language-text"].url,
                    ClaimTypes: mfeConfigJSON["claim-types"].url,
                    TextTemplate: mfeConfigJSON["text-template"].url,
                    Applications: mfeConfigJSON["applications"].url,
                    ApiScope: mfeConfigJSON["api-scope"].url,
                    SecurityLogs: mfeConfigJSON["security-logs"].url,
                    Chats: mfeConfigJSON["chats"].url,
                    FileManagement: mfeConfigJSON["file-management"].url,
                    Forms: mfeConfigJSON["forms"].url,
                    FormsView: mfeConfigJSON["forms-view"].url,
                    FormsPreview: mfeConfigJSON["forms-preview"].url,
                    Blogger: mfeConfigJSON["blogger"].url,
                    Client: mfeConfigJSON["client"].url,
                    Polls: mfeConfigJSON["polls"].url,
                    UrlForwarding: mfeConfigJSON["url-forwarding"].url,
                    PaymentPlans: mfeConfigJSON["payment-plans"].url,
                    Blogs: mfeConfigJSON["blogs"].url,
                    Comments: mfeConfigJSON["comments"].url,
                    Tags: mfeConfigJSON["tags"].url,
                    Elements: mfeConfigJSON["elements"].url,
                    PersonalData: mfeConfigJSON["personal-data"].url,
                    MyAccount: mfeConfigJSON["my-account"].url,
                    PaymentRequests: mfeConfigJSON["payment-requests"].url,
                    Menus: mfeConfigJSON["menus"].url,
                    Components: mfeConfigJSON["components"].url,
                    Pages: mfeConfigJSON["pages"].url,
                    BlogPost: mfeConfigJSON["blog-post"].url,
                    GlobalResources: mfeConfigJSON["global-resources"].url,
                    Newsletters: mfeConfigJSON["news-letters"].url,
                    Chart: mfeConfigJSON["chart"].url,
                    ChangePassword: mfeConfigJSON["change-password"].url,
                    Register: mfeConfigJSON["register"].url,
                    Home: mfeConfigJSON["home"].url,
                    PageNotFound: mfeConfigJSON["page-not-found"].url,
                    FormsResponse: mfeConfigJSON["forms-response"].url,
                    LinkedAccounts: mfeConfigJSON["linked-accounts"].url,
                    AuthorityDelegation: mfeConfigJSON["authority-delegation"].url,
     ProcessModeler: mfeConfigJSON["processmodeler"].url,
     Modeler: mfeConfigJSON["modeler"].url,
     ColorModeler: mfeConfigJSON["colormodeler"].url,
     CommentModeler: mfeConfigJSON["commentmodeler"].url,
     TransactionBoundaryModeler: mfeConfigJSON["transactionboundarymodeler"].url,
     PropertyPanelModeler: mfeConfigJSON["propertypanelmodeler"].url,
     PropertyPanelExtensionModeler: mfeConfigJSON["propertypanelextensionmodeler"].url,
     OverlayModeler: mfeConfigJSON["overlaymodeler"].url,
     BpmnModeler: mfeConfigJSON["bpmnmodeler"].url,
     Minimapmodeler: mfeConfigJSON["minimapmodeler"].url,
     TranslateBpmnModeler: mfeConfigJSON["translatebpmnmodeler"].url,
     ExampleBpmnModeler: mfeConfigJSON["examplebpmnmodeler"].url,
     DynamicExampleBpmnModeler: mfeConfigJSON["dynamicexamplebpmnmodeler"].url,
     BpmnExampleModeler: mfeConfigJSON["bpmnexamplemodeler"].url,
},
                shared: {
                    ...devdeps,
                    ...deps,
                    react: { singleton: true, eager: true, requiredVersion: deps.react },
                    "react-dom": {
                        singleton: true,
                        eager: true,
                        requiredVersion: deps["react-dom"],
                    },
                },
            }),
            // new CopyWebpackPlugin([{ from: "./public/images", to: "./assests" }]),
            new HtmlWebpackPlugin({
                template: "./public/index.html",
            }),
            // new ForkTsCheckerWebpackPlugin(),
        ],
    };
};