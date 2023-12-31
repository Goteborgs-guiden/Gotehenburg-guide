import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTokensStore = defineStore('tokens', () => {
    const accessToken = ref('')
    const refreshToken = ref('')
    const expiresIn = ref(0)
    
    function setTokens(tokens) {
        accessToken.value = tokens.accessToken
        refreshToken.value = tokens.refreshToken
        expiresIn.value = new Date(Date.now() + 1800 * 1000);
    }
    function setRefreshToken(token) {
        refreshToken.value = token
    }
    
    function clearTokens() {
        accessToken.value = ''
        refreshToken.value = ''
        expiresIn.value = 0
    }
    
    return { accessToken, refreshToken, expiresIn, setTokens, clearTokens, setRefreshToken }
});