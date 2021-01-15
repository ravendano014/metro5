export default function isLocalhost(loc = window.location.hostname, pattern = ".local"){
    return (
        loc === "localhost" ||
        loc === "localhost.localdomain" ||
        loc === "127.0.0.1" ||
        loc === "[::1]" ||
        loc === "::1" ||
        loc === "::1/128" ||
        loc === "0:0:0:0:0:0:0:1" ||
        loc === "" ||
        /(^127\.)|(^::1$)/.test(loc) ||
        loc.includes(pattern)
    )
}