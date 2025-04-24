export const proxies = [
    'http://43.159.132.166:13001',
    'http://13.37.89.201:80',
    'http://43.153.33.238:13001',
    'http://43.130.2.77:13001',
    'http://43.153.45.4:13001',
    'http://43.135.147.75:13001',
    'http://43.130.35.202:13001',
    'http://43.130.61.237:13001',
    'http://85.99.108.47:1453',
    'http://45.140.143.77:18080',
    'http://43.153.103.58:13001',
    'http://170.106.75.98:13001',
    'http://66.201.7.151:3128',
    'http://47.251.122.81:8888',
];


export function getRandomProxy(): string {
    const index = Math.floor(Math.random() * proxies.length);
    return proxies[index];
}