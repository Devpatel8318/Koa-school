import React from 'react'

function TableHeader({ titles }) {
    return (
        <thead className="font-medium border-b">
            <tr>

                {titles.map(title => (
                    <th scope="col" className="px-6 py-4">{title}</th>
                ))}
            </tr>
        </thead>
    )
}

export default TableHeader