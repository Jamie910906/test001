const correctHash = "6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090"

// 计算 SHA-256 哈希值的异步函数
async function calculateHash(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}

// 验证函数
async function verifyCode() {
    const inputCode = document.getElementById("code").value;

    // 计算用户输入的哈希值
    const inputHash = await calculateHash(inputCode);

    // 对比用户输入的哈希值和预设哈希值
    if (inputHash === correctHash) {
        // 验证通过，跳转到 index.html
        window.location.href = "main.html";
    } else {
        // 验证失败
        alert("验证码错误，请重新输入！");
    }
}