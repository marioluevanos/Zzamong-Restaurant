/**
 * Returns a U.S. style formatted phone number
 * 
 * @param {String} phone
 * @returns {String}
 */
export default function formatPhoneNumber (phone) {
    const match = normalizePhone(phone)
    if(match) {
        const intlCode = (match[1] ? '+1 ' : '')
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    return null
}

export function normalizePhone (phone) {
    const cleaned = ('' + phone).replace(/\D/g, '')
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    return match
}