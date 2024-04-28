import reactRefresh from "@vitejs/plugin-react-refresh";
import { viteMockServe } from "vite-plugin-mock";
import { resolve } from "path";
import svgr from "vite-plugin-svgr";
import eslintPlugin from "vite-plugin-eslint";

function pathResolve(dir: string) {
  return resolve(__dirname, ".", dir);
}

// https://vitejs.dev/config/
export default ({ command }: { command: string }) => {
  return {
    resolve: {
      alias: [
        {
          find: /^~/,
          replacement: pathResolve("node_modules") + "/",
        },
        {
          find: /@\//,
          replacement: pathResolve("src") + "/",
        },
      ],
    },
    optimizeDeps: {
      include: ["@ant-design/colors", "@ant-design/icons"],
    },
    server: {
      port: 3005,
      proxy: {
        "/api": {
          target: "https://www.perfects.ai",
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, "/api"),
        },
      },
    },
    plugins: [
      reactRefresh(),
      svgr(),
      viteMockServe({
        mockPath: "mock",
        supportTs: true,
        watchFiles: true,
        localEnabled: command === "serve",
        logger: true,
      }),
      eslintPlugin({
        include: ["src/**/*.ts", "src/**/*.tsx", "src/*.ts", "src/*.tsx"],
      }),
    ],
    css: {
      modules: {
        localsConvention: "camelCaseOnly",
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            "@primary-color": "#1890ff",
          },
        },
      },
    },
  };
};
