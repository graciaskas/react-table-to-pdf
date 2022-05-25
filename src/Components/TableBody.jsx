//TableBody Components
export default function TableBody ({data}) { 
    if (!data.length) return null;
    return (
        <tbody>
            {
                data.map((a, index) => (
                <tr key={index}>
                    <td>{a.name}</td>
                    <td>{a.email}</td>
                    <td>{a.phone}</td>
                    <td>{a.address}</td>
                    <td>{a.education}</td>
                    <td>{a.dob}</td>
                    <td>{a.select}</td>
                    <td>{a.selectSec}</td>
                </tr>
                ))
            }
        </tbody>
    )
    return null
}