// https://stackoverflow.com/questions/74987006/tailwindcss-not-working-with-vite-react
// tailwind 官方文件沒提到這點，我傻眼
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
