export const proxies = [
    'shegzfs:gukwiHj66dtnrsdb@46.8.15.16:5500',
    '6NeZMV:iSxcP9mEj0@46.8.157.251:5500',
    'sunlana13q0WIsa:rr6pMwzjkG@82.22.65.152:59100',

].map((proxy) => {
    const [auth, hostPort] = proxy.split('@');
    const [username, password] = auth.split(':');
    const [host, portStr] = hostPort.split(':');

    return {
        host,
        port: parseInt(portStr),
        username,
        password,
    };
});


// console.log(proxies)



export function getRandomProxy() {
    return proxies[Math.floor(Math.random() * proxies.length)];
}