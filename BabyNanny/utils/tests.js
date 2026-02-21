    const events = {
                '2026-01-26': {
            dots: [
                { key: 'urgente', color: 'black' }
            ]
        },
        '2026-02-25': {
            dots: [
                { key: 'trabajo;20:30', color: '#2ecc71', selectedDotColor: 'white' },
                { key: 'personal;19:30', color: '#e74c3c' },
                { key: 'pago;18:30', color: 'orange' }
            ],
        },
        '2026-02-26': {
            dots: [
                { key: 'urgente', color: 'black' }
            ]
        }
    }

const todayDate = new Date().toISOString().split('T')[0];
let dates = [];
let dates2 = [];
 dates = (Object.entries(events).filter(([fecha, info]) => fecha >= todayDate));

(dates.forEach(([fecha,dots]) =>dots.dots.forEach(elem => dates2.push({evento:elem.key,fecha:fecha}))))
return (dates2.slice(0,3))