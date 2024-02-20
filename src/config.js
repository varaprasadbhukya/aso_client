let env = process.env
console.log(env, "-------------------------->Config")

const config = {
    BASE_URL: env.REACT_APP_BASE_URL,
}

export default config;