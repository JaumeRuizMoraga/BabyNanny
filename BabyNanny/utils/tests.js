let dias = {
        '2026-02-25': {
            dots: [
                { key: 'trabajo', color: '#2ecc71', selectedDotColor: 'white' },
                { key: 'personal', color: '#e74c3c' },
                { key: 'pago', color: 'orange' }
            ],
        },
        '2026-02-26': {
            dots: [
                { key: 'urgente', color: 'black' }
            ]
        }
    }
let newDias = dias
console.log(newDias['2026-02-25'].dots.filter(elem => elem.key != 'pago'))
