let env = process.env
console.log(env, "-------------------------->Config")

const config = {
    BASE_URL: env.REACT_APP_BASE_URL,
    appId: '53252f99-c23e-419d-aa8c-d2df14a84155',
    redirectUri: 'http://localhost:3000',
    scopes: [
        'user.read'
    ],
    authority: 'https://login.microsoftonline.com/achrafchad.onmicrosoft.com'
}

export default config;