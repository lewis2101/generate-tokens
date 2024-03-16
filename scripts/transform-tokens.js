//Изменение значении dimension - пиксели в rem
export default {
    type: 'value',
    matcher: (token) => {
        return token.type === 'dimension'
    },
    transformer: ({ value }) => {
        if(value === 0) {
            return '0'
        }
        return (value / 16).toFixed(3) + 'rem'
    }
}