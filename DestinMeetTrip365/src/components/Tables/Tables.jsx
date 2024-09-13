import './Table.css';

export default function Tables() {
    return (
        <div>
        <table className="table-tours">
            <thead>
            <tr>
                <th>Nome do Passeio</th>
                <th>Descrição</th>
                <th>Local</th>
                <th>Preço</th>
                <th>Data</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Passeio de Barco</td>
                <td>Passeio de barco pela costa de sergipe</td>
                <td>Destin, FL</td>
                <td>$50</td>
                <td>10/10/2021</td>
            </tr>
            <tr>
                <td>Passeio de Bicicleta</td>
                <td>Passeio de bicicleta pela cidade de Destin</td>
                <td>Destin, FL</td>
                <td>$25</td>
                <td>10/15/2021</td>
            </tr>
            <tr>
                <td>Passeio de Caiaque</td>
                <td>Passeio de caiaque pela baía de Destin</td>
                <td>Destin, FL</td>
                <td>$35</td>
                <td>10/20/2021</td>
            </tr>
            </tbody>
        </table>
        </div>
    );
    }