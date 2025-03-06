import './styles.css'

export function Table({ readingPlan, month }) {
    return (
        month.name !== 'Janeiro' && month.name !== 'Fevereiro' ? (
            <div>
                <h2 className='month-title'>{month.name}</h2>
                <table className='table table-hover border rounded-3 table'>
                    <thead>
                        <tr className='table-dark'>
                            <th className='th-head'>Dia</th>
                            <th>Capítulos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {readingPlan
                            .filter(item => item.month === month.name)
                            .map((item, index) => (
                                <tr key={index} className='table-ligth'>
                                    <td>{item.day}</td>
                                    <td>{item.chapters}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        ) : null
    )
}